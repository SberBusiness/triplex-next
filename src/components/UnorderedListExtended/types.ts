import { TTextProps } from "../Typography/Text";

/** Свойства компонента UnorderedListExtended. */
export interface IUnorderedListExtendedProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Свойства компонента UnorderedListExtendedItem. */
export interface IUnorderedListExtendedItemProps extends Partial<Omit<TTextProps<"li">, "tag">> {}

/** Свойства компонента UnorderedListExtendedItemMarker. */
export interface IUnorderedListExtendedItemMarkerProps extends React.HTMLAttributes<HTMLSpanElement> {}
