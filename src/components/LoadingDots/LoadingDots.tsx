import React from "react";
import clsx from "clsx";
import styles from "./styles/LoadingDots.module.less";

export type TLoadingDotsSize = "sm" | "md" | "lg";

export interface ILoadingDotsProps {
    color: string;
    size: TLoadingDotsSize;
}

export const LoadingDots: React.FC<ILoadingDotsProps> = ({ color, size }) => {
    return (
        <span className={clsx(styles.loadingDots, styles[size])}>
            <span className={clsx(styles.dot, styles.dot1)} style={{ backgroundColor: color }} />
            <span className={clsx(styles.dot, styles.dot2)} style={{ backgroundColor: color }} />
            <span className={clsx(styles.dot, styles.dot3)} style={{ backgroundColor: color }} />
        </span>
    );
};

LoadingDots.displayName = "LoadingDots";
