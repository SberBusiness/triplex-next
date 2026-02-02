# Общие правила дизайн-системы Triplex

## Архитектура и структура

- Каждый компонент должен иметь собственный каталог с файлами: ComponentName.tsx, styles/ComponentName.module.less, index.ts, __tests__/ComponentName.test.tsx
- Обязательный файл index.ts для каждого компонента для поддержки генерации exports в package.json
- Все компоненты должны экспортироваться через src/index.ts
- Используй модульную структуру: один компонент = одна папка со всеми зависимостями

## TypeScript

- Все props должны иметь явную типизацию через interface или type
- Не использовать any, использовать unknown для неопределённых типов
- Props интерфейсы должны быть экспортированы для переиспользования
- Используй строгую типизацию: strict mode включен
- Обязательны JSDoc комментарии для всех публичных props и методов

## React паттерны

- Используй функциональные компоненты с hooks
- Compound components для сложных компонентов (например, Tab.Group, Tab.Item)
- Forwarded refs для всех UI компонентов через React.forwardRef
- Мемоизация через React.memo только при необходимости (не по умолчанию)

## Стилизация

- Все стили в LESS модулях (*.module.less)
- Не использовать inline styles или hardcoded значения цветов/размеров
- Обязательное использование design tokens из системы (токены должны быть в отдельном файле)
- CSS классы в camelCase
- Поддержка темизации через CSS переменные

## Accessibility

- Все интерактивные элементы должны иметь корректные ARIA атрибуты
- Поддержка keyboard navigation (Tab, Enter, Escape, стрелки)
- Семантические HTML теги (button вместо div с onClick)
- aria-label или aria-labelledby для элементов без видимого текста
- role атрибуты где необходимо

## Storybook

- Каждый компонент должен иметь минимум 2 stories:
  * Default - базовое состояние
  * Playground - все интерактивные варианты
- Stories должны полностью покрывать все возможные комбинации props
- Используй Controls (args) для интерактивности
- Добавляй документацию в stories через JSDoc
- Stories файлы: ComponentName.stories.tsx

## Тестирование

- Unit тесты через Vitest для всей логики
- React Testing Library для компонентов
- Минимальное покрытие: 80% (рекомендуется 90%)
- Тестируй accessibility (toBeAccessible)
- E2E тесты через Playwright для критичных флоу
- Visual regression тесты через Chromatic

## Breaking Changes

- Breaking changes должны быть явно задокументированы в PR description
- Следуй семантическому версионированию
- Deprecated API должны иметь комментарии с альтернативами

## Naming Conventions

- Компоненты: PascalCase (Button, DatePicker)
- Файлы компонентов: PascalCase (Button.tsx)
- Утилиты и хуки: camelCase (useClickOutside, formatDate)
- Константы: UPPER_SNAKE_CASE
- CSS классы: camelCase
- Types/Interfaces: PascalCase с префиксом по контексту (IButtonProps, TSize)

## Производительность

- Избегай ненужных ре-рендеров
- Code splitting где уместно
- Оптимизация bundle size (проверяй через npm run build)

## Документация

- README для сложных компонентов
- JSDoc комментарии на русском языке
- Примеры использования в комментариях
