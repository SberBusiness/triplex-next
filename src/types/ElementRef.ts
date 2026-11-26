/** Объектная ссылка на DOM-элемент. До монтажа и после отсоединения current равен null. */
export type TElementRef<T extends HTMLElement> = { readonly current: T | null };
