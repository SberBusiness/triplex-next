import React from "react";
import { ConfirmClose } from "./components/ConfirmClose";
import { ConfirmContent } from "./components/ConfirmContent";
import { ConfirmControls } from "./components/ConfirmControls";
import clsx from "clsx";
import { EIslandType, IIslandProps, Island } from "../Island";
import { EConfirmParentComponent } from "./enums";
import styles from "./styles/Confirm.module.less";

/** Свойства компонента Confirm. */
export interface IConfirmProps extends IIslandProps {
    /** Компонент, в котором используется Confirm.
     *  От этого зависит максимальная ширина контента Confirm.
     */
    parentComponent?: EConfirmParentComponent;
}

export interface IConfirmFC extends React.FC<IConfirmProps> {
    Close: typeof ConfirmClose;
    Content: typeof ConfirmContent;
    Controls: typeof ConfirmControls;
}

const parentComponentToClassNameMap = {
    [EConfirmParentComponent.LIGHTBOX]: styles.isInLightBox,
    [EConfirmParentComponent.SIDE_OVERLAY_SM]: styles.isInSideOverlaySM,
    [EConfirmParentComponent.SIDE_OVERLAY_MD]: styles.isInSideOverlayMD,
    [EConfirmParentComponent.SIDE_OVERLAY_LG]: styles.isInSideOverlayLG,
};

/** Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса. */
export const Confirm: IConfirmFC = ({
    children,
    className,
    parentComponent = EConfirmParentComponent.LIGHTBOX,
    ...htmlDivAttributes
}) => (
    <Island
        type={EIslandType.TYPE_1}
        className={clsx(className, styles.confirm, parentComponentToClassNameMap[parentComponent])}
        role="dialog"
        aria-modal="true"
        {...htmlDivAttributes}
    >
        <Island.Body>{children}</Island.Body>
    </Island>
);

Confirm.displayName = "Confirm";
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
