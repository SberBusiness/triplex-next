import { IButtonSecondaryProps } from "@sberbusiness/triplex-next/components/Button/Button";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import React, { useRef } from "react";
import { Button } from "../../Button/Button";
import { CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EButtonTheme } from "../../Button/enums";
import styles from "../styles/ModalWindowClose.module.less";

/**
 * Свойства компонента кнопки закрытия модального окна.
 */
interface IModalWindowCloseProps extends IButtonSecondaryProps {}

/**
 * Компонент кнопки закрытия модального окна.
 */
export const ModalWindowClose: React.FC<IModalWindowCloseProps> = (props) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <div className={styles.modalWindowClose}>
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                <Button
                    title="Закрыть"
                    ref={ref}
                    icon={<CrossStrokeSrvIcon20 paletteIndex={0} />}
                    {...props}
                    size={EComponentSize.MD}
                    theme={EButtonTheme.SECONDARY}
                />
            </TriggerClickOnKeyDownEvent>
        </div>
    );
};

ModalWindowClose.displayName = "ModalWindowClose";
