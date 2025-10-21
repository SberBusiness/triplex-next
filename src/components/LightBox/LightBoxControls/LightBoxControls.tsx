import React from "react";
import { LightBoxClose } from "@sber-business/triplex/components/LightBox/LightBoxControls/LightBoxClose";
import { LightBoxNext } from "@sber-business/triplex/components/LightBox/LightBoxControls/LightBoxNext";
import { LightBoxPrev } from "@sber-business/triplex/components/LightBox/LightBoxControls/LightBoxPrev";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента LightBoxControls. */
interface ILightBoxControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ILightBoxControlsFC extends React.FC<ILightBoxControlsProps> {
    Close: typeof LightBoxClose;
    Next: typeof LightBoxNext;
    Prev: typeof LightBoxPrev;
}

/** Контейнер кнопок-действий (закрыть/вперед/назад). */
export const LightBoxControls: ILightBoxControlsFC = ({ children, className, ...htmlDivAttributes }) => (
    <div
        className={classnames(className, "cssClass[lightBoxControls]")}
        {...htmlDivAttributes}
        data-lightbox-component="controls"
    >
        {children}
    </div>
);

LightBoxControls.displayName = "LightBoxControls";
LightBoxControls.Close = LightBoxClose;
LightBoxControls.Next = LightBoxNext;
LightBoxControls.Prev = LightBoxPrev;
