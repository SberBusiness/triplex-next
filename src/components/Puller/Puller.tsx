import React, { useEffect } from "react";
import { lockBodyScroll } from "../../utils/scroll/bodyScrollLock";
import { EOverlayDirection, IOverlayChildrenProvideProps, OverlayBase } from "../Overlay/OverlayBase";
import { PullerInner } from "./PullerInner";
import styles from "./styles/Puller.module.less";

/** Свойства компонента Puller. */
export interface IPullerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
}

/**
 * Нижняя шторка (bottom sheet). Пока открыта, блокирует скролл body.
 * В Portal себя не выносит: при прямом использовании оберните в Portal.
 */
export const Puller = React.forwardRef<HTMLDivElement, IPullerProps>(
    ({ children, opened, setOpened, ...restProps }, ref) => {
        useEffect(() => {
            if (opened) {
                return lockBodyScroll(styles.pullerScrollLock);
            }
        }, [opened]);

        return (
            <OverlayBase setOpened={setOpened} opened={opened} direction={EOverlayDirection.BOTTOM}>
                {(props: IOverlayChildrenProvideProps) => (
                    <PullerInner {...props} {...restProps} ref={ref} data-tx={process.env.npm_package_version}>
                        {children}
                    </PullerInner>
                )}
            </OverlayBase>
        );
    },
);

Puller.displayName = "Puller";
