/** Data-аттрибуты. */
export type DataAttributes = Record<`data-${string}`, string>;

/**
 * Интерфейс для пропсов компонент с тестовым атрибутом.
 * @prop {string} [data-test-id] Тестовый атрибут.
 * @deprecated используйте {@link DataAttributes}
 */
export interface TestProps {
    "data-test-id"?: string;
}

// Определяем типы, которые должны обрабатываться как единое целое (атомарные объекты)
type BuiltIn = Function | Date | RegExp | Map<any, any> | Set<any> | Promise<any> | Symbol;

/** Утилита типов, которая делает все свойства объекта (и его вложенные свойства) необязательными. */
export type DeepPartial<T> = T extends BuiltIn
    ? T // Останавливаем рекурсию здесь; возвращаем тип как есть
    : T extends object
      ? {
            [P in keyof T]?: T[P] extends Array<infer U>
                ? Array<DeepPartial<U>> // Рекурсивно обрабатываем массивы
                : T[P] extends object
                  ? DeepPartial<T[P]> // Рекурсивно обрабатываем другие простые объекты
                  : T[P];
        }
      : T; // Обрабатываем примитивы (string, number, boolean, null, undefined)
