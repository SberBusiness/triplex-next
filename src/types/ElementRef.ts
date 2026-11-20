import type React from "react";

/** Объектный ref на DOM-элемент. React 18 и 19 по-разному включают null в тип createRef. */
export type TElementRef<T extends HTMLElement> = ReturnType<typeof React.createRef<T>>;
