import React from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import styles from "./styles/LightBoxSideOverlayClose.module.less";
import { MobileView } from "../../MobileView";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { Button } from "../../Button/Button";

export interface ILightBoxSideOverlayCloseMobileProps extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * Компонент закрытия SideOverlay для мобильного устройства.
 * Отображается только на мобильном устройстве, внутри заголовка SideOverlay.
 */
export const LightBoxSideOverlayCloseMobile: React.FC<ILightBoxSideOverlayCloseMobileProps> = ({
    className,
    ...htmlButtonAttributes
}) => (
    <MobileView fallback={null}>
        <Button
            data-exclude-modal-focus
            className={clsx(className, styles.lightBoxSideOverlayCloseMobile)}
            title="Закрыть"
            {...htmlButtonAttributes}
            icon={<CrossStrokeSrvIcon20 paletteIndex={0} />}
            size={EComponentSize.MD}
            theme={EButtonTheme.SECONDARY}
        />
    </MobileView>
);

LightBoxSideOverlayCloseMobile.displayName = "LightBoxSideOverlayCloseMobile";
