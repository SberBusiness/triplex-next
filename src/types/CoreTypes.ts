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
type BuiltIn = Function | Date | RegExp | Map<any, any> | Set<any> | Promise<any> | symbol;

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

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

export type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;

export type ExtendableProps<ExtendedProps extends object, OverrideProps extends object> = OverrideProps &
    Omit<ExtendedProps, keyof OverrideProps>;

export type InheritableElementProps<T extends React.ElementType, P extends object> = ExtendableProps<PropsOf<T>, P>;

export type PolymorphicComponentPropsWithoutRef<
    T extends React.ElementType,
    P extends object,
> = InheritableElementProps<
    T,
    P & {
        tag?: T;
    }
>;

export type PolymorphicComponentPropsWithRef<
    T extends React.ElementType,
    P extends object,
> = PolymorphicComponentPropsWithoutRef<T, P> & {
    ref?: PolymorphicRef<T>;
};
