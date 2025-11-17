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
