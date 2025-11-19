import React, { useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import clsx from "clsx";
import { CrossStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { MobileView } from "../../MobileView";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { Button } from "../../Button/Button";
import styles from "./styles/LightBoxSideOverlayClose.module.less";

export interface ILightBoxSideOverlayCloseDesktopProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

const LightBoxSideOverlayCloseDesktopInner: React.FC<ILightBoxSideOverlayCloseDesktopProps> = ({
    className,
    clickByEsc,
    ...htmlButtonAttributes
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const renderButton = () => (
        <Button
            data-exclude-modal-focus
            className={clsx(className, styles.lightBoxSideOverlayCloseDesktop)}
            title="Закрыть"
            {...htmlButtonAttributes}
            ref={ref}
            icon={<CrossStrokeSrvIcon32 paletteIndex={0} />}
            size={EComponentSize.LG}
            theme={EButtonTheme.SECONDARY_LIGHT}
        />
    );

    if (clickByEsc) {
        return (
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                {renderButton()}
            </TriggerClickOnKeyDownEvent>
        );
    }
    return renderButton();
};

/**
 * Компонент закрытия SideOverlay для десктопа.
 * Отображается только на десктопе, справа от заголовка SideOverlay.
 */
export const LightBoxSideOverlayCloseDesktop: React.FC<ILightBoxSideOverlayCloseDesktopProps> = (props) => (
    <MobileView fallback={<LightBoxSideOverlayCloseDesktopInner {...props} />}>{null}</MobileView>
);

LightBoxSideOverlayCloseDesktop.displayName = "LightBoxSideOverlayCloseDesktop";
