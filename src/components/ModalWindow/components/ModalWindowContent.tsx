import clsx from "clsx";
import React from "react";
import { LoaderScreen, ILoaderScreenMiddleProps } from "../../LoaderScreen/LoaderScreen";
import styles from "../styles/ModalWindow.module.less";
import { Page } from "../../Page/Page";

/** Свойства компонента ModalWindowContent. */
export interface IModalWindowContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое — `ModalWindowHeader`, `ModalWindowBody`, `ModalWindowFooter`. */
    children?: React.ReactNode;
    /** Если `true`, поверх контента показывается `LoaderScreen`. */
    isLoading?: boolean;
    /** Свойства компонента LoaderScreen. */
    loaderScreenProps?: ILoaderScreenMiddleProps;
}

/**
 * Контент модального окна. Оборачивает дочерние секции в `Page` и при
 * `isLoading` показывает `LoaderScreen` поверх контента.
 */
export const ModalWindowContent = React.forwardRef<HTMLDivElement, IModalWindowContentProps>(
    ({ isLoading, className, loaderScreenProps, children, ...rest }, ref) => (
        <div
            ref={ref}
            className={clsx(styles.modalWindowContent, className, { [styles.isLoading]: isLoading })}
            {...rest}
        >
            <Page className={styles.modalWindowContentPage}>{children}</Page>

            {isLoading && (
                <LoaderScreen
                    {...loaderScreenProps}
                    className={clsx(styles.modalWindowLoaderScreen, loaderScreenProps?.className)}
                    type="middle"
                />
            )}
        </div>
    ),
);

ModalWindowContent.displayName = "ModalWindowContent";
