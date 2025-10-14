import React from "react";
import clsx from "clsx";
import { EIslandType } from "@sberbusiness/triplex-next/components/Island/enums";
import styles from "./styles/Island.module.less";

export interface IIslandProps extends React.HTMLProps<HTMLDivElement> {
    type?: EIslandType;
}

export const Island = React.forwardRef<HTMLDivElement, IIslandProps>(({ type, ...rest }, ref) => {
    return (
        <div className={clsx(styles.island)} ref={ref} {...rest}>
            Island
        </div>
    );
});
