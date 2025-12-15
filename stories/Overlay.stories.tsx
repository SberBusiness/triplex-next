import React, { useEffect, useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Overlay } from "../src/components/Overlay/Overlay";
import { EOverlayDirection } from "../src/components/Overlay/OverlayBase";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Overlay",
    component: Overlay,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент Overlay — затемняющий слой с выезжающей панелью из выбранной стороны контейнера/страницы.

## Возможности

- **Расположение панели**: RIGHT, LEFT, TOP, BOTTOM
- **Режимы позиционирования**: relative (по родителю) и fixed (на всю страницу)
- **События**: opening, open, closing, close
- **Доступность**: кликабельная маска, управление с клавиатуры в содержимом панели
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Playground} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
};

type IOverlayPlaygroundProps = React.ComponentProps<typeof Overlay> & {
    label?: string;
};

export const Playground: StoryObj<IOverlayPlaygroundProps> = {
    render: (args) => {
        const {
            direction = EOverlayDirection.RIGHT,
            fixed = false,
            opened: openedArg = false,
            label = "Открыть оверлей",
        } = args;

        const [opened, setOpened] = useState<boolean>(openedArg);

        // Синхронизация внешнего значения opened из controls.
        useEffect(() => {
            setOpened(openedArg);
        }, [openedArg]);

        return (
            <div style={{ position: "relative", width: 320, height: 200, border: "1px dashed #D0D4D9", padding: 12 }}>
                <button
                    type="button"
                    onClick={() => setOpened(true)}
                    aria-label="Open overlay"
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
                    {(props) => (
                        <>
                            <Overlay.Mask
                                opened={opened}
                                onClick={() => setOpened(false)}
                                aria-label="Overlay backdrop"
                            />
                            <Overlay.Panel {...props} direction={direction} aria-label="Overlay panel">
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <div>Содержимое оверлея</div>
                                    <button type="button" onClick={() => setOpened(false)} aria-label="Close overlay">
                                        Закрыть
                                    </button>
                                </div>
                            </Overlay.Panel>
                        </>
                    )}
                </Overlay>
            </div>
        );
    },
    argTypes: {
        direction: {
            control: { type: "select" },
            options: [EOverlayDirection.RIGHT, EOverlayDirection.LEFT, EOverlayDirection.TOP, EOverlayDirection.BOTTOM],
            description: "Расположение панели",
        },
        fixed: {
            control: { type: "boolean" },
            description: "Фиксированное позиционирование на всю страницу",
        },
        opened: {
            control: { type: "boolean" },
            description: "Состояние открытости",
        },
        setOpened: { table: { disable: true } },
        children: { table: { disable: true } },
        onOpening: { table: { disable: true } },
        onOpen: { table: { disable: true } },
        onClosing: { table: { disable: true } },
        onClose: { table: { disable: true } },
        label: { control: { type: "text" }, description: "Текст кнопки открытия" },
    },
    args: {
        direction: EOverlayDirection.RIGHT,
        fixed: false,
        opened: false,
        label: "Открыть оверлей",
    },
    parameters: {
        controls: {
            include: ["direction", "fixed", "opened", "label"],
        },
        docs: {
            description: {
                story: "Интерактивная демонстрация Overlay: выбор направления, fixed и состояния opened.",
            },
        },
    },
};

export const Directions: StoryObj<typeof Overlay> = {
    name: "Directions",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Примеры всех направлений выезжающей панели.",
            },
        },
    },
    render: () => {
        const Example = ({ direction, title }: { direction: EOverlayDirection; title: string }) => {
            const [opened, setOpened] = useState(false);
            return (
                <div
                    style={{ position: "relative", width: 320, height: 200, border: "1px dashed #D0D4D9", padding: 12 }}
                >
                    <div style={{ marginBottom: 8 }}>{title}</div>
                    <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                        Открыть
                    </button>
                    <Overlay direction={direction} opened={opened} setOpened={setOpened}>
                        {(props) => (
                            <>
                                <Overlay.Mask opened={opened} onClick={() => setOpened(false)} />
                                <Overlay.Panel {...props} direction={direction}>
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

        return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                <Example direction={EOverlayDirection.RIGHT} title="RIGHT" />
                <Example direction={EOverlayDirection.LEFT} title="LEFT" />
                <Example direction={EOverlayDirection.TOP} title="TOP" />
                <Example direction={EOverlayDirection.BOTTOM} title="BOTTOM" />
            </div>
        );
    },
};

export const Fixed: StoryObj<typeof Overlay> = {
    name: "Fixed",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Fixed-оверлей занимает всю страницу поверх контента.",
            },
        },
    },
    render: () => {
        const [opened, setOpened] = useState(false);
        return (
            <div>
                <button type="button" onClick={() => setOpened(true)} style={{ padding: "6px 12px" }}>
                    Открыть fixed оверлей
                </button>
                <Overlay fixed direction={EOverlayDirection.RIGHT} opened={opened} setOpened={setOpened}>
                    {(props) => (
                        <>
                            <Overlay.Mask opened={opened} onClick={() => setOpened(false)} />
                            <Overlay.Panel {...props} direction={EOverlayDirection.RIGHT}>
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
    },
};
