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
     *  По умолчанию EConfirmParentComponent.LIGHTBOX.
     */
    parentComponent?: EConfirmParentComponent;
}

/**
 * Тип компонента "Предупреждение" со статическими субкомпонентами.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
export interface IConfirmFC extends React.ForwardRefExoticComponent<
    IConfirmProps & React.RefAttributes<HTMLDivElement>
> {
    /** Кнопка закрытия предупреждения. */
    Close: typeof ConfirmClose;
    /** Текстовое содержимое предупреждения — заголовок и подзаголовок. */
    Content: typeof ConfirmContent;
    /** Контейнер кнопок действий. */
    Controls: typeof ConfirmControls;
}

/** Соответствие родительского компонента имени класса, ограничивающего максимальную ширину. */
const PARENT_COMPONENT_TO_CLASS_NAME_MAP: Record<EConfirmParentComponent, string> = {
    [EConfirmParentComponent.LIGHTBOX]: styles.isInLightBox,
    [EConfirmParentComponent.SIDE_OVERLAY_SM]: styles.isInSideOverlaySM,
    [EConfirmParentComponent.SIDE_OVERLAY_MD]: styles.isInSideOverlayMD,
    [EConfirmParentComponent.SIDE_OVERLAY_LG]: styles.isInSideOverlayLG,
};

/**
 * Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса.
 * Рендерится как Island типа TYPE_1 с ролью dialog; содержимое собирается из
 * Confirm.Content, Confirm.Controls и Confirm.Close.
 */
export const Confirm: IConfirmFC = Object.assign(
    React.forwardRef<HTMLDivElement, IConfirmProps>(
        ({ children, className, parentComponent = EConfirmParentComponent.LIGHTBOX, ...htmlDivAttributes }, ref) => (
            <Island
                type={EIslandType.TYPE_1}
                className={clsx(styles.confirm, PARENT_COMPONENT_TO_CLASS_NAME_MAP[parentComponent], className)}
                role="dialog"
                aria-modal="true"
                {...htmlDivAttributes}
                ref={ref}
            >
                <Island.Body>{children}</Island.Body>
            </Island>
        ),
    ),
    {
        Close: ConfirmClose,
        Content: ConfirmContent,
        Controls: ConfirmControls,
    },
);

Confirm.displayName = "Confirm";
