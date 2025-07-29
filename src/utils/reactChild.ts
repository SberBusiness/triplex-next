import React from "react";

/**
 *  Проверяет, что реакт-нода является текстовой.
 *
 * @param {React.ReactNode} child Дочерний элемент для проверки.
 */
export const isReactText = (child: React.ReactNode): child is React.ReactText =>
    typeof child === "string" || typeof child === "number";

/**
 *  Проверяет, что реакт-нода является реакт-элементом.
 *
 * @param {React.ReactNode} child Дочерний элемент для проверки.
 */
export const isReactElement = (child: React.ReactNode): child is React.ReactElement<any> =>
    typeof child === "object" && child !== null && Object.prototype.hasOwnProperty.call(child, "type");

/**
 * Эта странная функция нужна для простого сквозного проброса чилдов без клонирования с помощью React.Children.map.
 *
 * @param {React.ReactNode} child Дочерний элемент для проброса.
 */
export const returnElement = (child: React.ReactChild): React.ReactElement<any> | null => {
    if (isReactElement(child)) {
        return child;
    }
    if (isReactText(child)) {
        return React.createElement("span", {}, child);
    }
    return null;
};

/**
 * Проверяет, что аргумент является полноценным типом компонента React, а не типом простого HTML-элемента.
 *
 * @param {string | React.ComponentClass<any> | React.FC<any>} type Тип элемент для проверки.
 */
export const isComponentType = (
    type: string | React.ComponentClass<any> | React.FC<any>,
): type is React.ComponentType<any> => typeof type === "function";
