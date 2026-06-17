import React, { useState } from "react";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";

export const Default = () => {
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
            <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                Открыть оверлей
            </button>
            <Overlay direction={EOverlayDirection.RIGHT} opened={opened} setOpened={setOpened}>
                {(provideProps) => (
                    <>
                        <Overlay.Mask opened={opened} onClick={() => setOpened(false)} aria-label="Закрыть оверлей" />
                        <Overlay.Panel
                            {...provideProps}
                            direction={EOverlayDirection.RIGHT}
                            aria-label="Панель оверлея"
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>Содержимое оверлея</div>
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
