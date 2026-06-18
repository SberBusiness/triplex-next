import React, { useState } from "react";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

interface IVisualItemProps {
    direction: EOverlayDirection;
    title: string;
}

const VisualItem = ({ direction, title }: IVisualItemProps) => {
    const [opened, setOpened] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                width: 280,
                height: 200,
                border: "1px dashed #D0D4D9",
                padding: 12,
            }}
        >
            <div style={{ marginBottom: 8 }}>{title}</div>
            <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                Открыть {title}
            </button>
            <Overlay
                direction={direction}
                opened={opened}
                setOpened={setOpened}
                onOpen={action("onOpen")}
                onClose={action("onClose")}
            >
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

export const VisualTests = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, max-content)", gap: 24, padding: 24 }}>
        <VisualItem direction={EOverlayDirection.RIGHT} title="RIGHT" />
        <VisualItem direction={EOverlayDirection.LEFT} title="LEFT" />
        <VisualItem direction={EOverlayDirection.TOP} title="TOP" />
        <VisualItem direction={EOverlayDirection.BOTTOM} title="BOTTOM" />
    </div>
);
