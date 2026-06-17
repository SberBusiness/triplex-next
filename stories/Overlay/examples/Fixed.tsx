import React, { useState } from "react";
import { Overlay, EOverlayDirection } from "@sberbusiness/triplex-next";

export const Fixed = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                Открыть fixed оверлей
            </button>
            <Overlay fixed direction={EOverlayDirection.RIGHT} opened={opened} setOpened={setOpened}>
                {(provideProps) => (
                    <>
                        <Overlay.Mask opened={opened} onClick={() => setOpened(false)} aria-label="Закрыть оверлей" />
                        <Overlay.Panel
                            {...provideProps}
                            direction={EOverlayDirection.RIGHT}
                            aria-label="Панель оверлея"
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>Оверлей на всю страницу (fixed)</div>
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
