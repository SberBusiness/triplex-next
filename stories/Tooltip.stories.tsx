import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { Tooltip } from "../src/components/Tooltip/Tooltip";
import { ButtonIcon } from "../src/components/Button";
import { ETooltipPreferPlace, ETooltipSize } from "../src/components/Tooltip/enums";
import { HintFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Всплывающая подсказка с таргетом-иконкой.

## Использование

\`Tooltip\` состоит из таргета \`Tooltip.Target\` и содержимого \`Tooltip.Body\`. Можно добавить \`Tooltip.Link\` и \`Tooltip.XButton\`.

\n
\`toggleType\` — \`hover\` или \`click\`, \`preferPlace\` — \`above\` | \`below\` | \`left\` | \`right\`, \`size\` — \`sm\` | \`lg\`.

Поддерживается адаптивный режим (отображение снизу и только по клику).
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
        // не работает
        // disableZoom: true,
    },
};

type ITooltipPlaygroundProps = Partial<React.ComponentProps<typeof Tooltip>> & {
    label?: string;
    text?: string;
    modalTitle?: string;
    linkText?: string;
    linkHref?: string;
    withClose?: boolean;
};

export const Playground: StoryObj<ITooltipPlaygroundProps> = {
    name: "Playground",
    args: {
        size: ETooltipSize.SM,
        toggleType: "hover",
        preferPlace: ETooltipPreferPlace.BELOW,
        disableAdaptiveMode: false,
        isOpen: undefined,
        label: "Подсказка",
        text: "Текст подсказки",
        modalTitle: "Адаптивный заголовок подсказки",
        linkText: "Подробнее",
        linkHref: "#",
        withClose: false,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(ETooltipSize),
            description: "Размер тултипа",
        },
        toggleType: {
            control: { type: "inline-radio" },
            options: ["hover", "click"],
            description: "Способ открытия",
        },
        preferPlace: {
            control: { type: "select" },
            options: Object.values(ETooltipPreferPlace),
            description: "Предпочтительное расположение",
        },
        disableAdaptiveMode: { control: { type: "boolean" }, description: "Отключить мобильный режим" },
        isOpen: { control: { type: "boolean" }, description: "Принудительно открыть/закрыть (контролируемый режим)" },
        label: { control: { type: "text" }, description: "Aria-label для иконки-таргета" },
        text: { control: { type: "text" }, description: "Текст тултипа" },
        modalTitle: { contolr: { type: "text" }, describe: "Заголовок в адаптивном режиме (опционально)" },
        linkText: { control: { type: "text" }, description: "Текст ссылки (опционально)" },
        linkHref: { control: { type: "text" }, description: "Href ссылки (опционально)" },
        withClose: { control: { type: "boolean" }, description: "Показать кнопку закрытия" },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная площадка с контролами для размера, способа открытия и позиции.",
            },
        },
        controls: {
            include: [
                "size",
                "toggleType",
                "preferPlace",
                "disableAdaptiveMode",
                "isOpen",
                "label",
                "text",
                "modalTitle",
                "linkText",
                "linkHref",
                "withClose",
            ],
        },
    },
    render: (args) => {
        const {
            size = ETooltipSize.SM,
            toggleType = "hover",
            preferPlace = ETooltipPreferPlace.BELOW,
            disableAdaptiveMode = false,
            isOpen,
            label = "Показать подсказку",
            text = "Текст подсказки",
            modalTitle,
            linkText,
            linkHref,
            withClose,
        } = args;

        const targetRef = useRef<HTMLElement | null>(null);

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip
                    size={size}
                    toggleType={toggleType}
                    preferPlace={preferPlace}
                    disableAdaptiveMode={disableAdaptiveMode}
                    isOpen={isOpen}
                    targetRef={targetRef}
                >
                    <Tooltip.Target>
                        <ButtonIcon ref={(el) => (targetRef.current = el)} aria-label={label}>
                            <HintFilledSrvIcon16 paletteIndex={5} />
                        </ButtonIcon>
                    </Tooltip.Target>
                    <Tooltip.Body>{text}</Tooltip.Body>
                    {linkText && linkHref ? (
                        <Tooltip.Link href={linkHref} target="_blank" rel="noopener noreferrer">
                            {linkText}
                        </Tooltip.Link>
                    ) : null}
                    {withClose ? <Tooltip.XButton aria-label="Закрыть подсказку" /> : null}
                    {modalTitle && <Tooltip.MobileHeader>{modalTitle}</Tooltip.MobileHeader>}
                </Tooltip>
            </div>
        );
    },
};

export const Default: StoryObj = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const targetRef = useRef<HTMLElement | null>(null);

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip
                    size={ETooltipSize.SM}
                    toggleType="hover"
                    preferPlace={ETooltipPreferPlace.BELOW}
                    targetRef={targetRef}
                >
                    <Tooltip.Target>
                        <ButtonIcon ref={(el) => (targetRef.current = el)} aria-label="Подсказка">
                            <HintFilledSrvIcon16 paletteIndex={5} />
                        </ButtonIcon>
                    </Tooltip.Target>
                    <Tooltip.Body>Текст подсказки</Tooltip.Body>
                </Tooltip>
            </div>
        );
    },
};

export const DifferentPlaces: StoryObj = {
    name: "Different places",
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Примеры всех вариантов preferPlace." } },
    },
    render: () => {
        const refs = [
            useRef<HTMLElement | null>(null),
            useRef<HTMLElement | null>(null),
            useRef<HTMLElement | null>(null),
            useRef<HTMLElement | null>(null),
        ];
        const places = [
            ETooltipPreferPlace.ABOVE,
            ETooltipPreferPlace.BELOW,
            ETooltipPreferPlace.LEFT,
            ETooltipPreferPlace.RIGHT,
        ];

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 32,
                    height: 200,
                    marginLeft: 100,
                }}
            >
                {places.map((place, index) => (
                    <Tooltip
                        key={place}
                        size={ETooltipSize.SM}
                        toggleType="hover"
                        preferPlace={place}
                        targetRef={refs[index]}
                    >
                        <Tooltip.Target>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                    textTransform: "capitalize",
                                }}
                            >
                                {place}
                                <ButtonIcon ref={(el) => (refs[index].current = el)} aria-label={`Tooltip ${place}`}>
                                    <HintFilledSrvIcon16 paletteIndex={5} />
                                </ButtonIcon>
                            </div>
                        </Tooltip.Target>
                        <Tooltip.Body>{place}</Tooltip.Body>
                    </Tooltip>
                ))}
            </div>
        );
    },
};

export const MobileHeader: StoryObj = {
    name: "Mobile Header",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Примеры тултипа с заголовком для адаптивного режима.\nВ адаптиве открывается только по клику.",
            },
        },
    },
    render: () => {
        const ref = useRef<HTMLButtonElement | null>(null);

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip size={ETooltipSize.SM} toggleType="hover" targetRef={ref}>
                    <Tooltip.Target>
                        <ButtonIcon ref={ref}>
                            <HintFilledSrvIcon16 paletteIndex={5} />
                        </ButtonIcon>
                    </Tooltip.Target>
                    <Tooltip.Body>Текст подсказки</Tooltip.Body>
                    <Tooltip.MobileHeader>Заголовок для адаптивного режима</Tooltip.MobileHeader>
                </Tooltip>
            </div>
        );
    },
};

export const RenderContainer: StoryObj = {
    name: "Render container",
    parameters: {
        controls: { disable: true },
        // не работает
        // disableZoom: true,
        docs: {
            description: {
                story:
                    "!!Смотреть в отдельном окне (особенность разметки storybook)!!\n " +
                    "Примеры с render-ом в указанный контейнер (DOM-node). Предупреждение: position или " +
                    "transform контейнера или его родителей могут повлиять на позиционирование Tooltip. ",
            },
        },
    },
    render: () => {
        const [container, setContainer] = useState<Element | null>(null);
        const ref = useRef<HTMLButtonElement | null>(null);

        useEffect(() => {
            setContainer(document.querySelector("#tooltip-render-container"));
        }, []);

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div id="tooltip-render-container" style={{ height: 16, width: 16, border: "solid 1px red" }} />

                {container && (
                    <Tooltip
                        size={ETooltipSize.SM}
                        targetRef={ref}
                        renderContainer={container}
                        // чтобы можно было посмотреть позиционирование в dev tools
                        toggleType="click"
                    >
                        <Tooltip.Target>
                            <ButtonIcon ref={ref}>
                                <HintFilledSrvIcon16 paletteIndex={5} />
                            </ButtonIcon>
                        </Tooltip.Target>
                        <Tooltip.Body>Текст подсказки</Tooltip.Body>
                        <Tooltip.XButton aria-label="Закрыть" />
                    </Tooltip>
                )}
            </div>
        );
    },
};
