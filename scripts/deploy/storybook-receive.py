#!/usr/bin/python3
"""Receive a Storybook tarball through a restricted SSH key, then publish atomically."""
import fcntl
import os
from pathlib import Path, PurePosixPath
import re
import shlex
import shutil
import sys
import tarfile
import tempfile

BASE = Path('/srv/triplex/storybook')
PUBLIC = Path('/var/www/storybook/data')
SHARED = Path('/var/www/storybook/shared')
CHANNEL = re.compile(r'(?:main|release-[A-Za-z0-9._-]+|pr-[1-9][0-9]*|releases/v?[0-9]+\.[0-9]+\.[0-9]+(?:-[A-Za-z0-9.-]+)?)')


def unpack(stream, destination):
    total = count = 0
    seen = set()
    with tarfile.open(fileobj=stream, mode='r|gz') as archive:
        for member in archive:
            path = PurePosixPath(member.name)
            if path.is_absolute() or '..' in path.parts or not (member.isfile() or member.isdir()):
                raise ValueError('Unsafe archive member')
            if str(path) == '.':
                if not member.isdir():
                    raise ValueError('Invalid archive root')
                continue
            if path in seen:
                raise ValueError('Duplicate archive member')
            seen.add(path)
            total += member.size
            count += 1
            if total > 300 * 1024 * 1024 or count > 20000:
                raise ValueError('Archive exceeds deployment limit')
            target = destination.joinpath(*path.parts)
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.extractfile(member) as source, target.open('xb') as output:
                    shutil.copyfileobj(source, output)
                target.chmod(0o644)
    for required in ('index.html', 'iframe.html', 'index.json'):
        if not (destination / required).is_file():
            raise ValueError('Incomplete Storybook build: ' + required)


def main():
    args = shlex.split(os.environ.get('SSH_ORIGINAL_COMMAND', ''))
    if len(args) == 2 and args[0] == 'remove' and re.fullmatch(r'pr-[1-9][0-9]*', args[1]):
        action, channel = args
    elif len(args) == 3 and args[0] == 'deploy' and CHANNEL.fullmatch(args[1]) and '..' not in args[1] and re.fullmatch(r'[0-9a-f]{40}', args[2]):
        action, channel, revision = args
    else:
        raise ValueError('Only deploy CHANNEL SHA and remove pr-N are permitted')
    os.umask(0o022)
    with (BASE / 'deploy.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        public = PUBLIC / channel
        releases = BASE / 'channels' / channel
        if action == 'remove':
            public.unlink(missing_ok=True)
            if releases.exists():
                shutil.rmtree(releases)
            if (SHARED / channel).exists():
                shutil.rmtree(SHARED / channel)
            print('Removed ' + channel)
            return
        releases.mkdir(parents=True, exist_ok=True)
        stage = Path(tempfile.mkdtemp(prefix=revision + '-', dir=releases))
        try:
            unpack(sys.stdin.buffer, stage)
            stage.chmod(0o755)
            (stage / 'deployment.json').write_text('{"revision":"' + revision + '"}\n')
            shared = SHARED / channel
            shared.mkdir(parents=True, exist_ok=True)
            # Keep content-hashed chunks used by browsers with the previous HTML.
            if (stage / 'assets').exists():
                shutil.copytree(stage / 'assets', shared, dirs_exist_ok=True)
            public.parent.mkdir(parents=True, exist_ok=True)
            link = public.with_name(public.name + '.next')
            link.unlink(missing_ok=True)
            link.symlink_to(stage)
            os.replace(link, public)
        except BaseException:
            shutil.rmtree(stage)
            raise
        # Keep the current and two preceding complete builds for manual rollback.
        builds = sorted((p for p in releases.iterdir() if p.is_dir()), key=lambda p: p.stat().st_mtime, reverse=True)
        for old in builds[3:]:
            if old != stage:
                shutil.rmtree(old)
        print('Published ' + channel + ' at ' + revision)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
