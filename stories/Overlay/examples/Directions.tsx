import React, { useState } from "react";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";

interface IDirectionItemProps {
    direction: EOverlayDirection;
    title: string;
}

const DirectionItem = ({ direction, title }: IDirectionItemProps) => {
    const [opened, setOpened] = useState(false);

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
            <div style={{ marginBottom: 8 }}>{title}</div>
            <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                Открыть
            </button>
            <Overlay direction={direction} opened={opened} setOpened={setOpened}>
                {(provideProps) => (
                    <>
                        <Overlay.Mask opened={opened} onClick={() => setOpened(false)} aria-label="Закрыть оверлей" />
                        <Overlay.Panel {...provideProps} direction={direction} aria-label="Панель оверлея">
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>Панель ({title})</div>
                                <button type="button" onClick={() => setOpened(false)}>
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

export const Directions = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <DirectionItem direction={EOverlayDirection.RIGHT} title="RIGHT" />
        <DirectionItem direction={EOverlayDirection.LEFT} title="LEFT" />
        <DirectionItem direction={EOverlayDirection.TOP} title="TOP" />
        <DirectionItem direction={EOverlayDirection.BOTTOM} title="BOTTOM" />
    </div>
);
