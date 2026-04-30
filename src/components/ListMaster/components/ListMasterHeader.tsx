import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "../styles/ListMasterHeader.module.less";

/** Свойства компонента ListMasterHeader. */
export interface IListMasterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Sticky-позиционирование (`top: 0`, `z-index: 1`). По умолчанию `true`. */
    sticky?: boolean;
}

/**
 * Хедер ListMaster. При монтировании компенсирует свою высоту через `window.scrollTo`,
 * чтобы появление selection-controls не сдвигало содержимое визуально вниз. При
 * размонтировании — откатывает скролл.
 */
export const ListMasterHeader = React.forwardRef<HTMLDivElement, IListMasterHeaderProps>(
    ({ children, className, sticky = true, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        const containerHeightRef = useRef(0);

        useEffect(() => {
            if (!containerRef.current) {
                return;
            }

            containerHeightRef.current = containerRef.current.getBoundingClientRect().height;

            // Компенсация высоты ListMasterHeader: иначе при появлении хедера
            // содержимое сдвигается вниз на его высоту.
            window.scrollTo({ top: window.scrollY + containerHeightRef.current });

            return () => {
                window.scrollTo({ top: Math.max(window.scrollY - containerHeightRef.current, 0) });
            };
        }, []);

        const setRef = (instance: HTMLDivElement | null) => {
            containerRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <div
                className={clsx(
                    styles.listMasterHeader,
                    {
                        [styles.sticky]: sticky,
                    },
                    className,
                )}
                {...rest}
                ref={setRef}
            >
                {children}
            </div>
        );
    },
);

ListMasterHeader.displayName = "ListMasterHeader";
