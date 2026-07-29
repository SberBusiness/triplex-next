import React from "react";
import ReactDOM from "react-dom";

/** Свойства компонента Portal. */
export interface IPortalProps {
    /** Содержимое, рендерящееся в container. */
    children: React.ReactNode;
    /** DOM-узел, в который рендерится содержимое. */
    container: Element | DocumentFragment;
}

/** Портал для рендера содержимого во внешний DOM-узел (обёртка над ReactDOM.createPortal). */
export const Portal: React.FC<IPortalProps> = ({ children, container }) => ReactDOM.createPortal(children, container);
