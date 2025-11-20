import React from "react";
import { LightBoxClose } from "./LightBoxClose";
import { LightBoxNext } from "./LightBoxNext";
import { LightBoxPrev } from "./LightBoxPrev";
import clsx from "clsx";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства компонента LightBoxControls. */
interface ILightBoxControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ILightBoxControlsFC extends React.FC<ILightBoxControlsProps> {
    Close: typeof LightBoxClose;
    Next: typeof LightBoxNext;
    Prev: typeof LightBoxPrev;
}

/** Контейнер кнопок-действий (закрыть/вперед/назад). */
export const LightBoxControls: ILightBoxControlsFC = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(className, styles.lightBoxControls)} {...htmlDivAttributes} data-lightbox-component="controls">
        {children}
    </div>
);

LightBoxControls.displayName = "LightBoxControls";
LightBoxControls.Close = LightBoxClose;
LightBoxControls.Next = LightBoxNext;
LightBoxControls.Prev = LightBoxPrev;
