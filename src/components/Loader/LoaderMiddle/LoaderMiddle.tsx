import React from "react";
import clsx from "clsx";
import styles from "./styles/LoaderMiddle.module.less";

/**
 * Квадратный загрузчик с анимированными точками и обегающей их линией.
 * Не имеет настраиваемых props, используется как индикатор загрузки области или страницы.
 */
export const LoaderMiddle: React.FC = () => {
    return (
        <div role="status" aria-label="loading" className={styles.loaderMiddle}>
            <div className={styles.loaderMiddleDots}>
                <span className={styles.line} />
                <span className={clsx(styles.dot, styles.dot1)} />
                <span className={clsx(styles.dot, styles.dot2)} />
                <span className={clsx(styles.dot, styles.dot3)} />
                <span className={clsx(styles.dot, styles.dot4)} />
            </div>
        </div>
    );
};

LoaderMiddle.displayName = "LoaderMiddle";
