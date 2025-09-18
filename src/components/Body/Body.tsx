import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { EBodyBackgroundColor } from "@sber-business/triplex/components/Body/enums";

/** Свойства компонента Body. */
export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Цвет фона. */
    backgroundColor?: EBodyBackgroundColor;
}

// Соответствие цвета фона имени класса.
const backgroundColorToClassNameMap = {
    [EBodyBackgroundColor.WHITE]: "cssClass[withWhiteBackground]",
    [EBodyBackgroundColor.GRAY]: "cssClass[withGrayBackground]",
    [EBodyBackgroundColor.DARKGRAY]: "cssClass[withDarkGrayBackground]",
};

/**
 * Компонент Body, используется как один из детей(Header, Body и Footer) компонента Page.
 * Используется как контейнер для контента страницы. Имеет дефолтные отступы со всех сторон.
 */
export const Body = React.forwardRef<HTMLDivElement, IBodyProps>(
    ({ children, className, backgroundColor = EBodyBackgroundColor.WHITE, ...rest }, ref) => (
        <div
            className={classnames("cssClass[body]", backgroundColorToClassNameMap[backgroundColor], className)}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            <div className="cssClass[bodyInner]">{children}</div>
        </div>
    ),
);

Body.displayName = "Body";
