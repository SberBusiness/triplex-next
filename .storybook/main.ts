import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { version } from '../package.json';
import generateScopedName from '../scripts/generate-scoped-name';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.@(ts|tsx|mdx)', '../stories/**/*.mdx'],
    addons: ['@storybook/addon-themes', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    staticDirs: ['../public'],
    viteFinal: async (viteConfig) => {
        // Настройка CSS модулей для стабильных classNames
        viteConfig.css = {
            modules: {
                generateScopedName,
            },
        };

        // Алиас для разрешения импортов из исходников библиотеки
        viteConfig.resolve = {
            ...viteConfig.resolve,
            alias: {
                ...(viteConfig.resolve?.alias as Record<string, string> | undefined),
                '@sberbusiness/triplex-next': resolve(projectRoot, 'src'),
            },
        };

        // Версия пакета для доков/демо
        viteConfig.define = {
            ...(viteConfig.define ?? {}),
            'process.env.npm_package_version': JSON.stringify(version),
        };

        return viteConfig;
    },
};

export default config;
