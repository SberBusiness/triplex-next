import React from "react";
import { CaretrightStrokeSrvIcon20, CaretrightStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { LightBoxArrow } from "./LightBoxArrow";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства LightBoxNext. */
export interface ILightBoxNextProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кликнуть по кнопке при нажатии стрелки вправо на клавиатуре. */
    clickByArrowRight?: boolean;
    /** Обработчик клика по кнопке. */
    onClick: () => void;
    /** Идентификатор для обучающего тура. */
    dataTutorialId?: string;
}

/** Стрелка лайтбокса "Вперёд". */
export const LightBoxNext: React.FC<ILightBoxNextProps> = ({ clickByArrowRight, ...rest }) => (
    <LightBoxArrow
        {...rest}
        buttonClassName={styles.lightBoxNextButton}
        clickByArrowKey={clickByArrowRight}
        containerClassName={styles.lightBoxNext}
        dataTestId="lightBox-next"
        eventKeyCode={EVENT_KEY_CODES.ARROW_RIGHT}
        iconDesktop={<CaretrightStrokeSrvIcon32 paletteIndex={0} />}
        iconMobile={<CaretrightStrokeSrvIcon20 paletteIndex={0} />}
    />
);

LightBoxNext.displayName = "LightBoxNext";
