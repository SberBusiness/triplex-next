import React, { useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { ILightBoxSideOverlayCloseButtonProps, LightBoxSideOverlayCloseButton } from "./LightBoxSideOverlayCloseButton";

export interface ILightBoxSideOverlayCloseProps extends ILightBoxSideOverlayCloseButtonProps {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

/**
 * Компонент закрытия SideOverlay.
 */
export const LightBoxSideOverlayClose: React.FC<ILightBoxSideOverlayCloseProps> = ({ clickByEsc, ...buttonProps }) => {
    const ref = useRef<HTMLButtonElement>(null);

    if (clickByEsc) {
        return (
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                <LightBoxSideOverlayCloseButton {...buttonProps} ref={ref} />
            </TriggerClickOnKeyDownEvent>
        );
    }
    return <LightBoxSideOverlayCloseButton {...buttonProps} />;
};

LightBoxSideOverlayClose.displayName = "LightBoxSideOverlayClose";
