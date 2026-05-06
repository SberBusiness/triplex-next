import clsx from "clsx";
import React from "react";
import { LoaderScreen } from "../../LoaderScreen/LoaderScreen";
import styles from "../styles/ModalWindow.module.less";
import { Page } from "../../Page/Page";

/** Свойства компонента ModalWindowContent. */
export interface IModalWindowContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое — `ModalWindowHeader`, `ModalWindowBody`, `ModalWindowFooter`. */
    children?: React.ReactNode;
    /** Если `true`, поверх контента показывается `LoaderScreen`. */
    isLoading?: boolean;
    /** Текст под спиннером в режиме загрузки. */
    loadingTitle?: React.ReactNode;
}

/**
 * Контент модального окна. Оборачивает дочерние секции в `Page` и при
 * `isLoading` показывает `LoaderScreen` поверх контента.
 */
export const ModalWindowContent: React.FC<IModalWindowContentProps> = ({
    isLoading,
    className,
    loadingTitle,
    children,
    ...rest
}) => (
    <div className={clsx(styles.modalWindowContent, className, { [styles.isLoading]: isLoading })} {...rest}>
        <Page className={styles.modalWindowContentPage}>{children}</Page>

        {isLoading && (
            <LoaderScreen className={styles.modalWindowLoaderScreen} type="middle">
                {loadingTitle}
            </LoaderScreen>
        )}
    </div>
);

ModalWindowContent.displayName = "ModalWindowContent";
