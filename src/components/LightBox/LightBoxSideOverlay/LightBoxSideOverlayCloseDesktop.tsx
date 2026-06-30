import React, { useContext, useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import clsx from "clsx";
import { CrossStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { Button } from "../../Button/Button";
import { LightBoxOverlayContext } from "../LightBoxOverlayContext";
import styles from "./styles/LightBoxSideOverlayClose.module.less";

export interface ILightBoxSideOverlayCloseDesktopProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Триггер click по нажатию Esc. По умолчанию true.
     * Пока на экране есть TopOverlay (открыт или закрывается), Esc-триггер
     * отключается автоматически — задавать это вручную не требуется.
     */
    clickByEsc?: boolean;
}

/**
 * Компонент закрытия SideOverlay для десктопа.
 * Отображается только на десктопе, справа от заголовка SideOverlay.
 */
export const LightBoxSideOverlayCloseDesktop: React.FC<ILightBoxSideOverlayCloseDesktopProps> = ({
    className,
    clickByEsc = true,
    ...htmlButtonAttributes
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    // Пока на экране есть TopOverlay, он сам перехватывает Esc — отключаем свой триггер,
    // иначе быстрые Esc будут закрывать TopOverlay и тут же открывать его заново.
    const { escCapturingOverlayActive } = useContext(LightBoxOverlayContext);
    const escEnabled = clickByEsc && !escCapturingOverlayActive;

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

    const renderContent = () => {
        if (escEnabled) {
            return (
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                    {renderButton()}
                </TriggerClickOnKeyDownEvent>
            );
        }
        return renderButton();
    };

    return <div className={styles.lightBoxSideOverlayCloseDesktopContainer}>{renderContent()}</div>;
};

LightBoxSideOverlayCloseDesktop.displayName = "LightBoxSideOverlayCloseDesktop";
