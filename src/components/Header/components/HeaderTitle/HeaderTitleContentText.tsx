import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { FocusTrapUtils } from "@sber-business/triplex/utils/focus/FocusTrapUtils";

/** Свойства компонента HeaderTitleContentText. */
export interface IHeaderTitleContentTextProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/** Основной заголовок. */
export const HeaderTitleContentText = React.forwardRef<HTMLHeadingElement, IHeaderTitleContentTextProps>(
    ({ children, className, ...rest }, ref) => (
        <h1
            className={classnames("cssClass[globalHeaderTitleContentText]", className)}
            //* При открытии LightBox/ModalWindow - заголовок будет зачитываться VoiceOver-ом.
            {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
            tabIndex={-1}
            {...rest}
            ref={ref}
        >
            {children}
        </h1>
    ),
);

HeaderTitleContentText.displayName = "HeaderTitleContentText";
