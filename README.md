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
| `npm run test-visual` | Визуальные регрессионные тесты (Storybook должен быть запущен) |
| `npm run test-visual:update` | Обновить baseline-скриншоты |
| `npm run test-visual:ci` | Запустить Storybook + визуальные тесты (для CI) |

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

> **Важно:** baseline-скриншоты создаются и обновляются **только через CI** (Linux). Локальные скриншоты на macOS несовместимы из-за разного рендеринга шрифтов.

#### CI воркфлоу

| Воркфлоу | Триггер | Что делает |
|---|---|---|
| `visual-test.yml` | Каждый PR | Прогоняет тесты, загружает диффы как артефакты при падении |
| `visual-update.yml` | Ручной запуск (`workflow_dispatch`) | Пересоздаёт baselines и коммитит их в ветку |

#### Как обновить baseline-скриншоты

1. Запушить ветку с изменениями
2. В GitHub → Actions → **Update Visual Snapshots** → Run workflow → выбрать ветку
3. Воркфлоу пересоздаст скриншоты и сделает коммит в ту же ветку

#### Как отлаживать локально

Для отладки конкретного компонента — временно сузить glob в `.storybook/main.ts`:

```ts
// Временно, только для отладки:
stories: ["../stories/Badge/**/*.stories.@(ts|tsx|mdx)"],

// Вернуть обратно после отладки:
stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
```

Затем запустить:
```bash
npm run storybook         # в одном терминале
npm run test-visual       # в другом
```

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
npm run test-e2e              # Запуск e2e тестов
npm run test-unit             # Запуск unit тестов
npm run test-unit:watch       # Запуск unit тестов в режиме наблюдения
npm run test-unit:coverage    # Запуск unit тестов с отчётом о покрытии
npm run test-visual:update    # Создать/обновить baseline визуальных тестов
npm run test-visual           # Запуск визуальных регрессионных тестов
```
