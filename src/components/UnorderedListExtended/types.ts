import { TTextProps } from "../Typography/Text";

/**
 * Свойства компонента UnorderedListExtended.
 * Собственных props нет — компонент принимает стандартные атрибуты <ul>.
 */
export interface IUnorderedListExtendedProps extends React.HTMLAttributes<HTMLUListElement> {}

/**
 * Свойства компонента UnorderedListExtendedItem.
 * Собственных props нет — элемент принимает типографику Text (кроме tag) и стандартные атрибуты <li>.
 * Размер текста по умолчанию — ETextSize.B3.
 */
export interface IUnorderedListExtendedItemProps extends Partial<Omit<TTextProps<"li">, "tag">> {}

/**
 * Свойства компонента UnorderedListExtendedItemMarker.
 * Собственных props нет — обёртка принимает стандартные атрибуты <span>.
 * Без children рендерится маркер-точка.
 */
export interface IUnorderedListExtendedItemMarkerProps extends React.HTMLAttributes<HTMLSpanElement> {}
