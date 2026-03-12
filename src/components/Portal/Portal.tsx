import React from "react";
import ReactDOM from "react-dom";

/** Свойства компонента Portal. */
export interface IPortalProps {
    children: React.ReactNode;
    container: Element | DocumentFragment;
}

/** Компонент портал, для рендера элемента во внешний DOM узел. */
export const Portal: React.FC<IPortalProps> = ({ children, container }) => ReactDOM.createPortal(children, container);
