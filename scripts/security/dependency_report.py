"""Summarize npm inputs in two git trees without installing PR dependencies."""
import html
import json
import subprocess
import sys


SCOPES = {
    'dependencies': 'runtime',
    'devDependencies': 'dev',
    'peerDependencies': 'peer',
    'optionalDependencies': 'optional',
}


def read_tree(ref):
    def read_json(name):
        return json.loads(subprocess.check_output(['git', 'show', f'{ref}:{name}']))

    # npm gives a shrinkwrap precedence over package-lock.json when both exist.
    shrinkwrap = 'npm-shrinkwrap.json'
    names = subprocess.check_output(['git', 'ls-tree', '--name-only', ref, '--', shrinkwrap])
    lock = read_json(shrinkwrap if names else 'package-lock.json')
    if lock.get('lockfileVersion') not in (2, 3):
        raise ValueError('Для отчёта требуется lock-файл npm v2 или v3')
    return read_json('package.json'), lock['packages']


def changes(before, after):
    for key in sorted(before.keys() | after.keys()):
        if before.get(key) != after.get(key):
            yield key, before.get(key), after.get(key)


def describe_package(path, package, manifest):
    if package is None:
        return '—'
    name = path.removeprefix('node_modules/')
    scopes = [scope for field, scope in SCOPES.items() if name in manifest.get(field, {})]
    if scopes:
        usage = 'прямая ' + '/'.join(scopes)
    else:
        usage = 'транзитивная ' + ('dev' if package.get('dev') else 'runtime')
        if package.get('optional') or package.get('devOptional'):
            usage += '/optional'
        if package.get('peer'):
            usage += '/peer'
    source = package.get('resolved') or 'источник из конфигурации npm'
    flags = []
    if package.get('link'):
        flags.append('ссылка')
    if package.get('hasInstallScript'):
        flags.append('install-скрипт')
    return ', '.join([package.get('name', path.rsplit('node_modules/', 1)[-1]),
                      package.get('version', '—'), usage, source, *flags])


def report(base, head, npmrc_changed=False):
    old_manifest, old_packages = base
    manifest, packages = head
    lines = []
    review = []
    if npmrc_changed:
        review.append('.npmrc: проверьте реестр, настройки установки и источник пакетов без resolved')
    for field in (*SCOPES, 'scripts', 'overrides'):
        for name, old, new in changes(old_manifest.get(field, {}), manifest.get(field, {})):
            lines.append(f'{field}.{name}: {old if old is not None else "—"} → {new if new is not None else "—"}')
            if field in SCOPES and old is None:
                review.append(f'{name}: новая прямая зависимость ({SCOPES[field]})')
            if field == 'scripts' and new is not None:
                review.append(f'scripts.{name}: изменена исполняемая команда проекта')

    for path, old, new in changes(old_packages, packages):
        if not path:  # Root manifest is reported above.
            continue
        previous = describe_package(path, old, old_manifest)
        current = describe_package(path, new, manifest)
        if new:
            source = new.get('resolved', '')
            if (source and not source.startswith('https://registry.npmjs.org/')
                    and (not old or old.get('resolved') != source)):
                review.append(f'{path}: сторонний источник {source}')
            if new.get('hasInstallScript') and (not old or not old.get('hasInstallScript')
                                                or old.get('version') != new.get('version')):
                review.append(f'{path}: проверьте install-скрипт версии {new.get("version", "—")}')
        if previous != current:
            lines.append(f'{path}: {previous} → {current}')
        if old is not None and new is not None:
            for key, before, after in changes(old, new):
                if key in SCOPES:
                    for name, old_spec, new_spec in changes(before or {}, after or {}):
                        lines.append(f'{path} {key}.{name}: {old_spec or "—"} → {new_spec or "—"}')
                elif previous == current:
                    lines.append(f'{path}: изменилось поле {key}')
    if not lines and not review:
        return '### npm-зависимости\n\nИзменений для ревью нет.'
    # Package metadata and script bodies are untrusted text in a Markdown summary.
    def block(rows):
        return '<pre>\n' + '\n'.join(html.escape(' '.join(row.splitlines())) for row in rows) + '\n</pre>'

    sections = ['### npm-зависимости']
    if review:
        sections.extend(['**Требуется обоснование в PR и проверка владельца кода**', block(review)])
    if lines:
        sections.extend(['**Изменения в package.json и lock-файле**', block(lines)])
    return '\n\n'.join(sections)


if __name__ == '__main__':
    base_ref, head_ref = sys.argv[1:]
    npmrc_diff = subprocess.check_output(['git', 'diff', '--name-only', base_ref, head_ref, '--', '.npmrc'])
    print(report(read_tree(base_ref), read_tree(head_ref), bool(npmrc_diff)))
