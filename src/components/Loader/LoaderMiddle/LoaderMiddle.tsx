import React from "react";
import styles from "./styles/LoaderMiddle.module.less";
import clsx from "clsx";

export const LoaderMiddle: React.FC = () => {
    return (
        <div role="status" aria-label="loading" className={styles.loaderMiddle}>
            <span className={styles.line} />
            <span className={clsx(styles.dot, styles.dot1)} />
            <span className={clsx(styles.dot, styles.dot2)} />
            <span className={clsx(styles.dot, styles.dot3)} />
            <span className={clsx(styles.dot, styles.dot4)} />
        </div>
    );
};

LoaderMiddle.displayName = "LoaderMiddle";
