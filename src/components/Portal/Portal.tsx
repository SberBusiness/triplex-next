import React from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
    children: React.ReactElement;
    container: Element;
}

/**
 * Компонент портал, для рендера элемента во внешний DOM узел.
 */
export const Portal: React.FC<IPortalProps> = ({children, container}) => ReactDOM.createPortal(children, container);
