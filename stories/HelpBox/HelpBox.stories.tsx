import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { ETooltipPreferPlace, ETooltipSize } from "../../src/components/Tooltip/enums";
import { Gap } from "../../src/components/Gap";

export default {
    title: "Components/HelpBox",
    parameters: {
        docs: {
            description: {
                component: `\nИконка помощи с всплывающей подсказкой.\n\n- **Размеры тултипа**: SM, LG\n- **Расположение**: above, below, left, right\n- **Мобильный заголовок**: отдельная зона для мобильной версии\n                `,
            },
        },
    },
    tags: ["autodocs"],
};

interface IHelpBoxWithControlsProps extends React.ComponentProps<typeof HelpBox> {
    contentText?: string;
    mobileHeaderText?: string;
}

export const Playground: StoryObj<IHelpBoxWithControlsProps> = {
    render: (args) => {
        const { contentText, mobileHeaderText, ...helpBoxProps } = args;

        return (
            <div style={{ padding: 40 }}>
                <HelpBox {...helpBoxProps} mobileHeaderContent={mobileHeaderText || undefined}>
                    {contentText || "Текст подсказки"}
                </HelpBox>
            </div>
        );
    },
    argTypes: {
        tooltipSize: {
            control: { type: "select" },
            options: Object.values(ETooltipSize),
            description: "Размер тултипа",
            table: {
                type: { summary: "ETooltipSize" },
                defaultValue: { summary: "ETooltipSize.SM" },
            },
        },
        preferPlace: {
            control: { type: "select" },
            options: Object.values(ETooltipPreferPlace),
            description: "Предпочтительное положение",
            table: {
                type: { summary: "ETooltipPreferPlace" },
                defaultValue: { summary: "ETooltipPreferPlace.ABOVE" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Доп. CSS класс",
            table: {
                type: { summary: "string" },
            },
        },
        contentText: {
            control: { type: "text" },
            description: "Текст в теле подсказки",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Текст подсказки" },
            },
        },
        mobileHeaderText: {
            control: { type: "text" },
            description: "Текст мобильного заголовка",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Заголовок подсказки" },
            },
        },
    },
    args: {
        tooltipSize: ETooltipSize.SM,
        preferPlace: ETooltipPreferPlace.ABOVE,
        contentText: "Текст подсказки",
        mobileHeaderText: "Заголовок подсказки",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация HelpBox с контролами размера, положения и текстов.",
            },
        },
    },
};

export const Basic: StoryObj<typeof HelpBox> = {
    render: () => (
        <div style={{ padding: 50 }}>
            <HelpBox tooltipSize={ETooltipSize.SM}>Подсказка по элементу интерфейса</HelpBox>
        </div>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый HelpBox c тултипом большого размера." },
        },
    },
};

export const Sizes: StoryObj<typeof HelpBox> = {
    render: () => (
        <div style={{ padding: 50, display: "flex", gap: 100 }}>
            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                SM
            </HelpBox>
            <HelpBox tooltipSize={ETooltipSize.LG} preferPlace={ETooltipPreferPlace.BELOW}>
                LG
            </HelpBox>
        </div>
    ),
    parameters: {
        docs: {
            description: { story: "Демонстрация размеров тултипа: SM и LG." },
        },
    },
};

export const Placement: StoryObj<typeof HelpBox> = {
    render: () => (
        <div style={{ padding: 50, display: "grid", gridTemplateColumns: "repeat(2, minmax(120px, 1fr))", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 150 }}>above</span>
                <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                    Подсказка сверху
                </HelpBox>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 150 }}>below</span>
                <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.BELOW}>
                    Подсказка снизу
                </HelpBox>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 150 }}>left</span>
                <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.LEFT}>
                    Подсказка слева
                </HelpBox>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 150 }}>right</span>
                <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.RIGHT}>
                    Подсказка справа
                </HelpBox>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: { story: "Варианты расположения тултипа относительно иконки HelpBox." },
        },
    },
};

export const WithMobileHeader: StoryObj<typeof HelpBox> = {
    render: () => (
        <div style={{ padding: 50 }}>
            <HelpBox tooltipSize={ETooltipSize.SM} mobileHeaderContent="Заголовок">
                Текст подсказки
            </HelpBox>
        </div>
    ),
    parameters: {
        docs: {
            description: { story: "Пример использования мобильного заголовка у тултипа." },
        },
    },
};

export const Controlled: StoryObj<typeof HelpBox> = {
    render: () => {
        const [open, setOpen] = useState(false);

        const handleToggle = (nextOpen: boolean) => setOpen(nextOpen);
        const handleManualOpen = () => setOpen(true);
        const handleManualClose = () => setOpen(false);

        return (
            <div style={{ padding: 40, display: "flex", alignItems: "center", gap: 16 }}>
                <button type="button" onClick={handleManualOpen}>
                    Открыть
                </button>
                <button type="button" onClick={handleManualClose}>
                    Закрыть
                </button>
                <HelpBox
                    tooltipSize={ETooltipSize.SM}
                    preferPlace={ETooltipPreferPlace.RIGHT}
                    isOpen={open}
                    toggle={handleToggle}
                >
                    Управляемое состояние тултипа
                </HelpBox>
            </div>
        );
    },
    parameters: {
        docs: {
            description: { story: "Пример контролируемого состояния HelpBox через свойства isOpen/toggle." },
        },
    },
};
