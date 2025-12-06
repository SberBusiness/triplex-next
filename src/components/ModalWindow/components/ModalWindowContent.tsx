import clsx from "clsx";
import React from "react";
import { LoaderScreen } from "../../LoaderScreen/LoaderScreen";
import styles from "../styles/ModalWindow.module.less";
import { Page } from "../../Page/Page";

/** Свойства компонента ModalWindowContent. */
interface IModalWindowContentProps {
    children?: React.ReactNode;
    /** Состояние загрузки.*/
    isLoading?: boolean;
    /** Текст под спиннером.*/
    loadingTitle?: React.ReactNode;
}

/** Компонент контента модального окна. */
export const ModalWindowContent: React.FC<IModalWindowContentProps> = ({ isLoading, loadingTitle, children }) => {
    return (
        <div className={clsx(styles.modalWindowContent, { [styles.isLoading]: !!isLoading })}>
            <Page className={styles.modalWindowContentPage}>{children}</Page>

            {isLoading && (
                <LoaderScreen className={styles.modalWindowLoaderScreen} type="middle">
                    {loadingTitle}
                </LoaderScreen>
            )}
        </div>
    );
};
