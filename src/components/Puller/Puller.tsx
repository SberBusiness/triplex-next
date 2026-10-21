import React, { useEffect } from "react";
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
 * Нижняя всплывающая шторка (bottom sheet) на базе OverlayBase (controlled).
 * Выезжает снизу поверх подложки, закрывается по тапу на подложку; пока открыта, блокирует скролл body.
 * Разметка собирается из PullerHeader, PullerBody и PullerFooter.
 * role="dialog" и aria-label / aria-labelledby передаёт потребитель; Escape и focus trap не реализованы.
 */
export const Puller = React.forwardRef<HTMLDivElement, IPullerProps>(
    ({ children, opened, setOpened, ...restProps }, ref) => {
        useEffect(() => {
            if (!opened) {
                return;
            }

            // Класс снимает только cleanup: закрытый Puller body не трогает, иначе снял бы блокировку другой, открытой шторки.
            document.body.classList.add(styles.pullerScrollLock);

            return () => document.body.classList.remove(styles.pullerScrollLock);
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
