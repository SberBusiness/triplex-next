# Triplex-next

### Версионирование

- Разработка версии для React 18 ведется в ветке main. Релизы с версии 1.0.0 до 2.0.0(не включительно).
- Разработка версии для React 17 ведется в ветке release-0. Релизы с версии 0.10.0 до 1.0.0(не включительно).


## 🚀 Установка

```bash
npm install @sberbusiness/triplex-next @sberbusiness/icons-next
```

## Импортировать стили
```ts
import '@sberbusiness/triplex-next/styles/triplex-next.css';
import '@sberbusiness/icons-next/styles/icons.css';
```

## 🔤 Шрифты

Компоненты Typography используют шрифты SBSansDisplay и SBSansText. Для корректного отображения необходимо подключить шрифты в вашем проекте:

```css
@font-face {
    font-family: 'SBSansDisplay';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansDisplay-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplayMedium';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansDisplay-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplaySemibold';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansDisplay-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplayBold';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansDisplay-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansText';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansText-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansTextSemibold';
    src: url('node_modules/@sberbusiness/triplex-next/assets/fonts/SBSansText-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
}
```


---

## 📁 Структура

```
src/
  components/
    ComponentName/
      index.ts
      ComponentName.tsx
      styles/ComponentName.module.less
      __tests__/ComponentName.test.tsx
```

> Каждый компонент должен иметь собственный `index.ts`, чтобы поддерживать генерацию `exports` в `package.json`.

---

## 📜 Скрипты

| Скрипт | Назначение |
|-------|------------|
| `npm run build` | Сборка компонентов и `style.css` в `dist/` |
| `npm run storybook` | Локальный просмотр компонентов |
| `npm run storybook:build` | Сборка Storybook в `storybook-static/` |
| `npm run test-visual:docker` | Визуальные тесты в Docker-контейнере (сборка + запуск) |
| `npm run test-visual:docker:update` | Обновить baseline-скриншоты в Docker-контейнере |
| `npm run test-visual:debug` | Отладка визуальных тестов локально (Storybook должен быть запущен) |
| `npm run test-visual:ci` | Визуальные тесты — используется в CI и Docker |
| `npm run test-visual:ci:update` | Обновление baseline — используется в CI и Docker |

---

## 🧱 Добавление нового компонента

1. Создать каталог:

```bash
src/components/Alert/
```

2. Добавить файлы:

```
Alert.tsx
styles/Alert.module.less
index.ts         ← обязательный!
```

3. Указать экспорт в `src/index.ts`:

```ts
export * from './components/Alert';
```

---
## 🧪 Тестирование

Проект использует [Vitest](https://vitest.dev/) для unit-тестирования и [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) для тестирования компонентов.

### Визуальное регрессионное тестирование

Для визуального тестирования используется [`@storybook/test-runner`](https://github.com/storybookjs/test-runner) + [`jest-image-snapshot`](https://github.com/americanexpress/jest-image-snapshot).

Скриншоты снимаются на двух viewport'ах: **XS** (575px) и **XL** (1200px). Baseline-скриншоты хранятся в папке `__screenshots__/` и коммитятся в git. Diff-изображения при падении сохраняются в `__screenshots__/__diff__/` и игнорируются git'ом.

> **Важно:** baseline-скриншоты создаются и обновляются **только через Docker или CI** (Linux). Локальные скриншоты на macOS несовместимы из-за разного рендеринга шрифтов.

#### Как обновить baseline-скриншоты

**Через Docker (рекомендуется):**
```bash
npm run test-visual:docker:update
```

**Через CI:**
1. Запушить ветку с изменениями
2. В GitHub → Actions → **Update Visual Snapshots** → Run workflow → выбрать ветку
3. Воркфлоу пересоздаст скриншоты и сделает коммит в ту же ветку

#### Как запустить визуальные тесты

```bash
npm run test-visual:docker           # Проверка через Docker
npm run test-visual:docker:update    # Обновление baseline через Docker
```

#### Как запустить тесты только для одного компонента

`test-storybook` не поддерживает фильтрацию по имени стори. Единственный способ — временно сузить glob в `.storybook/main.ts`:

```ts
// Временно, только для одного компонента:
stories: ["../stories/Link/**/*.stories.@(ts|tsx|mdx)"],

// Вернуть обратно после:
stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
```

Затем запустить тесты, как обычно:

```bash
npm run test-visual:docker           # через Docker
npm run test-visual:debug            # локально (Storybook должен быть запущен)
```

> **Не забудьте вернуть glob обратно** перед коммитом.

#### CI воркфлоу

Визуальные тесты в CI работают на собранной (build) версии Storybook, а не на dev-сервере — это исключает race conditions при загрузке модулей.

| Воркфлоу | Триггер | Что делает |
|---|---|---|
| `visual-test.yml` | Каждый PR | Прогоняет тесты, загружает диффы как артефакты при падении |
| `visual-update.yml` | Ручной запуск (`workflow_dispatch`) | Пересоздаёт baselines и коммитит их в ветку |

#### Как отлаживать локально

```bash
npm run storybook             # в одном терминале
npm run test-visual:debug     # в другом (с PWDEBUG=1)
```

Для отладки одного компонента — сузить glob как описано выше.

#### Как исключить story из тестирования

```ts
// Конкретную story
export const MyStory: Story = {
    parameters: {
        testRunner: { skip: true },
    },
};

// Все stories компонента (в default export / meta)
const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        testRunner: { skip: true },
    },
};
```

### Как запустить тесты локально

```bash
npm run test-e2e                     # Запуск e2e тестов
npm run test-unit                    # Запуск unit тестов
npm run test-unit:watch              # Запуск unit тестов в режиме наблюдения
npm run test-unit:coverage           # Запуск unit тестов с отчётом о покрытии
npm run test-visual:docker           # Визуальные регрессионные тесты (Docker)
npm run test-visual:docker:update    # Обновить baseline-скриншоты (Docker)
```