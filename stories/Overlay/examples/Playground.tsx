import React, { useState } from "react";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

export interface IOverlayPlaygroundProps {
    direction: EOverlayDirection;
    fixed: boolean;
    opened: boolean;
    label: string;
}

const PlaygroundContent = ({ direction, fixed, opened: initialOpened, label }: IOverlayPlaygroundProps) => {
    const [opened, setOpened] = useState<boolean>(initialOpened);

    return (
        <div
            style={{
                position: "relative",
                width: 320,
                height: 200,
                border: "1px dashed #D0D4D9",
                padding: 12,
            }}
        >
            <button
                type="button"
                onClick={() => setOpened(true)}
                aria-label="Открыть оверлей"
                style={{ padding: "6px 12px", cursor: "pointer" }}
            >
                {label}
            </button>

            <Overlay
                direction={direction}
                fixed={fixed}
                opened={opened}
                setOpened={setOpened}
                onOpening={action("onOpening")}
                onOpen={action("onOpen")}
                onClosing={action("onClosing")}
                onClose={action("onClose")}
            >
                {(provideProps) => (
                    <>
                        <Overlay.Mask opened={opened} onClick={() => setOpened(false)} aria-label="Закрыть оверлей" />
                        <Overlay.Panel {...provideProps} direction={direction} aria-label="Панель оверлея">
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>Содержимое оверлея</div>
                                <button type="button" onClick={() => setOpened(false)} aria-label="Закрыть оверлей">
                                    Закрыть
                                </button>
                            </div>
                        </Overlay.Panel>
                    </>
                )}
            </Overlay>
        </div>
    );
};

export const Playground = (args: IOverlayPlaygroundProps) => {
    const { direction = EOverlayDirection.RIGHT, fixed = false, opened = false, label = "Открыть оверлей" } = args;

    // Storybook-control `opened` задаёт начальное состояние; key-reset перемонтирует пример при его изменении.
    return <PlaygroundContent key={String(opened)} direction={direction} fixed={fixed} opened={opened} label={label} />;
};
