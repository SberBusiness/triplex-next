import React, { useRef } from "react";
import { StoryObj } from "@storybook/react";
import { Tooltip } from "../src/components/Tooltip/Tooltip";
import { ButtonIcon } from "../src/components/Button";
import { ETooltipPreferPlace, ETooltipSize } from "../src/components/Tooltip/enums";
import { HintFilledSrvIcon16 } from "@sberbusiness/icons-next";

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
        },
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
        targetRef: { table: { disable: true } },
        children: { table: { disable: true } },
        renderContainer: { table: { disable: true } },
        onShow: { table: { disable: true } },
        toggle: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная площадка с контролами для размера, способа открытия и позиции.",
            },
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {places.map((place, index) => (
                    <Tooltip
                        key={place}
                        size={ETooltipSize.SM}
                        toggleType="hover"
                        preferPlace={place}
                        targetRef={refs[index]}
                    >
                        <Tooltip.Target>
                            <ButtonIcon ref={(el) => (refs[index].current = el)} aria-label={`Tooltip ${place}`}>
                                <HintFilledSrvIcon16 paletteIndex={5} />
                            </ButtonIcon>
                        </Tooltip.Target>
                        <Tooltip.Body>{place}</Tooltip.Body>
                    </Tooltip>
                ))}
            </div>
        );
    },
};
