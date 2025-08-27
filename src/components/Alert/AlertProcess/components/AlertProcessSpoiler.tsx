import React from "react";
import styles from "../styles/AlertProcess.module.less";
import clsx from "clsx";

/** Свойства компонента AlertProcessSpoiler. */
export interface IAlertProcessSpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Флаг открытия или закрытия спойлера. */
    expandableContentOpen?: boolean;
}

/** Спойлер компонента AlertProcess. */
export const AlertProcessSpoiler: React.FC<IAlertProcessSpoilerProps> = ({
    children,
    expandableContentOpen,
    ...rest
}) => (
    <div className={clsx(styles.expandableContent, { [styles.expanded]: expandableContentOpen })} {...rest}>
        {children}
    </div>
);

AlertProcessSpoiler.displayName = "AlertProcessSpoiler";
