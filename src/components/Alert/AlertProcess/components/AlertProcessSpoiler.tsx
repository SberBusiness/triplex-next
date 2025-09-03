import React from "react";
import { CaretdownSrvxIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../../Button/ButtonIcon";
import styles from "../styles/AlertProcess.module.less";
import clsx from "clsx";

/** Свойства компонента AlertProcessSpoiler. */
export interface IAlertProcessSpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытия спойлера. */
    open?: boolean;
    /** Обработчик изменения состояния открытия спойлера. */
    onOpen?: (open: boolean) => void;
}

/** Спойлер компонента AlertProcess. */
export const AlertProcessSpoiler: React.FC<IAlertProcessSpoilerProps> = ({ children, open, onOpen, ...rest }) => {
    const handleToggle = () => {
        onOpen?.(!open);
    };

    return (
        <div className={styles.spoiler}>
            <div className={clsx(styles.expandableContent, { [styles.expanded]: open })} {...rest}>
                {children}
            </div>

            <div className={clsx(styles.expandButton, { [styles.active]: open })}>
                <ButtonIcon onClick={handleToggle}>
                    <CaretdownSrvxIcon16 />
                </ButtonIcon>
            </div>
        </div>
    );
};

AlertProcessSpoiler.displayName = "AlertProcessSpoiler";
