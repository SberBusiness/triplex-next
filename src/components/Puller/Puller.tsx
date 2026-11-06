import React, { useEffect } from "react";
import { lockBodyScroll } from "../../utils/scroll/bodyScrollLock";
import { EOverlayDirection, IOverlayChildrenProvideProps, OverlayBase } from "../Overlay/OverlayBase";
import { IPortalProps, Portal } from "../Portal/Portal";
import { PullerInner } from "./PullerInner";
import styles from "./styles/Puller.module.less";

/** Свойства компонента Puller. */
export interface IPullerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
    /** DOM-узел, в который рендерится шторка. По умолчанию document.body. */
    renderContainer?: IPortalProps["container"];
}

/**
 * Нижняя шторка (bottom sheet). Пока открыта, блокирует скролл body.
 * Рендерится через Portal в renderContainer.
 */
export const Puller = React.forwardRef<HTMLDivElement, IPullerProps>(
    ({ children, opened, setOpened, renderContainer = document.body, ...restProps }, ref) => {
        useEffect(() => {
            if (opened) {
                return lockBodyScroll(styles.pullerScrollLock);
            }
        }, [opened]);

        return (
            <Portal container={renderContainer}>
                <OverlayBase setOpened={setOpened} opened={opened} direction={EOverlayDirection.BOTTOM}>
                    {(props: IOverlayChildrenProvideProps) => (
                        <PullerInner {...props} {...restProps} ref={ref} data-tx={process.env.npm_package_version}>
                            {children}
                        </PullerInner>
                    )}
                </OverlayBase>
            </Portal>
        );
    },
);

Puller.displayName = "Puller";
