import unittest

from dependency_report import report


class DependencyReportTests(unittest.TestCase):
    def test_version_bump_and_unchanged_dependencies(self):
        self.assertIn('Изменений для ревью нет', report(({'version': '1'}, {}), ({'version': '2'}, {})))

    def test_manifest_scopes_and_root_scripts(self):
        manifest = {'devDependencies': {'react': '18'}, 'peerDependencies': {'react': '^18'},
                    'scripts': {'postinstall': 'echo "</pre>"'}}
        text = report(({}, {}), (manifest, {'node_modules/react': {'version': '18'}}))
        for expected in ['devDependencies.react', 'peerDependencies.react', 'прямая dev/peer',
                         'react: новая прямая зависимость (peer)', 'scripts.postinstall', '&lt;/pre&gt;']:
            self.assertIn(expected, text)

    def test_lock_only_nested_package_source_and_install_script(self):
        path = 'node_modules/app/node_modules/helper'
        old = {'version': '1.0.0', 'dev': True}
        new = dict(old, resolved='https://packages.example/helper.tgz', hasInstallScript=True)
        text = report(({}, {path: old}), ({}, {path: new}))
        for expected in [path, 'транзитивная dev', 'сторонний источник https://packages.example',
                         'проверьте install-скрипт версии 1.0.0']:
            self.assertIn(expected, text)

    def test_npmrc_only_change_requires_review(self):
        self.assertIn('.npmrc: проверьте реестр', report(({}, {}), ({}, {}), npmrc_changed=True))

    def test_existing_package_changes_dependency_edge(self):
        path = 'node_modules/helper'
        old = {'version': '1', 'dependencies': {'leaf': '^1'}}
        for version in ('1', '2'):
            with self.subTest(version=version):
                new = dict(old, version=version, dependencies={'leaf': '^2'})
                text = report(({}, {path: old}), ({}, {path: new}))
                self.assertIn(f'{path} dependencies.leaf: ^1 → ^2', text)

    def test_integrity_change_and_removal(self):
        path = 'node_modules/helper'
        base = ({}, {path: {'version': '1', 'integrity': 'old'}})
        self.assertIn('integrity', report(base, ({}, {path: {'version': '1', 'integrity': 'new'}})))
        self.assertIn('→ —', report(base, ({}, {})))
