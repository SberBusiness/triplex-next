import React from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon32, CaretleftStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { LightBoxArrow } from "./LightBoxArrow";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства LightBoxPrev. */
export interface ILightBoxPrevProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кликнуть по кнопке при нажатии стрелки влево на клавиатуре. */
    clickByArrowLeft?: boolean;
    /** Обработчик клика по кнопке. */
    onClick: () => void;
    /** Идентификатор для обучающего тура. */
    dataTutorialId?: string;
}

/** Стрелка лайтбокса "Назад". */
export const LightBoxPrev: React.FC<ILightBoxPrevProps> = ({ className, clickByArrowLeft, ...rest }) => (
    <LightBoxArrow
        {...rest}
        buttonClassName={styles.lightBoxPrevButton}
        className={clsx(className, styles.lightBoxPrev)}
        clickByArrowKey={clickByArrowLeft}
        dataTestId="lightBox-prev"
        eventKeyCode={EVENT_KEY_CODES.ARROW_LEFT}
        iconDesktop={<CaretleftStrokeSrvIcon32 paletteIndex={0} />}
        iconMobile={<CaretleftStrokeSrvIcon20 paletteIndex={0} />}
    />
);

LightBoxPrev.displayName = "LightBoxPrev";
