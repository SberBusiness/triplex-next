import React, { useRef, useState } from "react";
import { action } from "storybook/actions";
import { Button, EButtonTheme, TriggerClickOnKeyDownEvent } from "@sberbusiness/triplex-next";

/** Свойства Playground-примера TriggerClickOnKeyDownEvent. */
export interface IPlaygroundProps {
    /** Код клавиши или массив кодов, по нажатию которых выполняется клик. */
    eventKeyCode: number | number[];
    /** Скрыть кнопку через display: none — по скрытой кнопке клик не выполняется. */
    targetHidden: boolean;
}

export const Playground = ({ eventKeyCode, targetHidden }: IPlaygroundProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setClickCount((prevCount) => prevCount + 1);
        action("onClick")(event);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>Нажмите выбранную в Controls клавишу — клик выполнится на кнопке из targetRef.</div>
            <TriggerClickOnKeyDownEvent eventKeyCode={eventKeyCode} targetRef={buttonRef}>
                <Button
                    ref={buttonRef}
                    onClick={handleClick}
                    theme={EButtonTheme.GENERAL}
                    style={targetHidden ? { display: "none" } : undefined}
                >
                    Кнопка
                </Button>
            </TriggerClickOnKeyDownEvent>
            <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                Кликов по кнопке: {clickCount}
                {targetHidden ? " — кнопка скрыта, клавиша её не кликает" : ""}
            </div>
        </div>
    );
};
