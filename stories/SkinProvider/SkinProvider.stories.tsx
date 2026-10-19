import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { SkinProvider } from "@sberbusiness/triplex-next";
import {
    DefaultRender,
    DefaultSource,
    PlaygroundRender,
    TPlaygroundArgs,
    ScopesRender,
    ScopesSource,
    StatesRender,
    StatesSource,
    ComponentsRender,
    ComponentsSource,
    NavigationRender,
    NavigationSource,
    PaymentWizardRender,
    PaymentWizardSource,
} from "./examples";

export default {
    title: "Components/SkinProvider",
    component: SkinProvider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "WordArt включается одним провайдером без DOM-обёртки, scopeRef и ручных классов. Поддерживаются все темы Button, поля на базе FormField (в том числе TextField, TextareaField, SelectField и DateField), Checkbox, Radio, Chip, Tag, SegmentedControl, CardStatic, CardAction, Island TYPE_1, Dropdown (включая мобильную панель и пункты списков), Tabs, TabsExtended, TabsLine, стандартное содержимое ModalWindow, TableBasic (включая MasterTable.TableBasic), Tooltip, Notification, NotificationGrouped, Stepper и StepperExtended. Поля с ошибками и предупреждениями, заблокированные элементы и кнопки DANGER сохраняют сигнальные цвета. Island TYPE_2 и TYPE_3 сохраняют своё оформление. Провайдер независим от ThemeProvider; палитра настраивается токенами SkinProvider.WordArt_* (например WordArt_Pink: { value: '#FF4090' }). Тема и её токены работают как обычно, в том числе в порталах Triplex. Для собственного React-портала переносите область ThemeProvider в контейнер по обычным правилам темы. skin={null} отключает скин во вложенной ветке. Объёмные грани выходят за размеры компонентов: оставляйте между ними место и не обрезайте overflow.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={SkinProvider} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof SkinProvider>;

export const Playground: StoryObj<TPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: { skin: "wordart" },
    argTypes: {
        skin: {
            control: "select",
            options: ["wordart", null],
            description: "Скин области; null — стандартный Triplex.",
        },
    },
    render: PlaygroundRender,
    parameters: {
        controls: { include: ["skin"] },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof SkinProvider> = {
    render: DefaultRender,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultSource, language: "tsx" } } },
};

export const DarkTheme: StoryObj<typeof SkinProvider> = {
    name: "Dark theme",
    render: DefaultRender,
    globals: { theme: "dark", backgrounds: { value: "black" } },
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: DefaultSource, language: "tsx" },
            description: {
                story: "Тёмная тема выбирается глобальным ThemeProvider. Радужные грани сохраняются, поверхность карточки и поля становится тёмной.",
            },
        },
    },
};

export const Scopes: StoryObj<typeof SkinProvider> = {
    render: ScopesRender,
    // This example demonstrates the native scope outside a local provider, independent of the global skin.
    decorators: [
        (Story) => (
            <SkinProvider skin={null}>
                <Story />
            </SkinProvider>
        ),
    ],
    parameters: { controls: { disable: true }, docs: { source: { code: ScopesSource, language: "tsx" } } },
};

export const States: StoryObj<typeof SkinProvider> = {
    render: StatesRender,
    parameters: { controls: { disable: true }, docs: { source: { code: StatesSource, language: "tsx" } } },
};

export const Components: StoryObj<typeof SkinProvider> = {
    render: ComponentsRender,
    parameters: { controls: { disable: true }, docs: { source: { code: ComponentsSource, language: "tsx" } } },
};

export const ComponentsDark: StoryObj<typeof SkinProvider> = {
    name: "Components / Dark",
    render: ComponentsRender,
    globals: { theme: "dark", backgrounds: { value: "black" } },
    parameters: { controls: { disable: true }, docs: { source: { code: ComponentsSource, language: "tsx" } } },
};

export const Navigation: StoryObj<typeof SkinProvider> = {
    render: NavigationRender,
    parameters: { controls: { disable: true }, docs: { source: { code: NavigationSource, language: "tsx" } } },
};

export const NavigationDark: StoryObj<typeof SkinProvider> = {
    render: NavigationRender,
    globals: { theme: "dark", backgrounds: { value: "black" } },
    parameters: { controls: { disable: true }, docs: { source: { code: NavigationSource, language: "tsx" } } },
};

export const DropdownOpen: StoryObj<typeof SkinProvider> = {
    tags: ["!autodocs"],
    render: NavigationRender,
    parameters: { controls: { disable: true } },
    play: async ({ canvasElement, userEvent }) => {
        const trigger = canvasElement.querySelector<HTMLElement>('button[aria-label="Действия с проектом"]');
        if (trigger) await userEvent.click(trigger);
    },
};

export const ModalOpen: StoryObj<typeof SkinProvider> = {
    tags: ["!autodocs"],
    render: NavigationRender,
    parameters: { controls: { disable: true } },
    play: async ({ canvasElement, userEvent }) => {
        const trigger = canvasElement.querySelector<HTMLElement>('[data-wordart-action="modal"]');
        if (trigger) await userEvent.click(trigger);
    },
};

export const PaymentWizard: StoryObj<typeof SkinProvider> = {
    render: () => <PaymentWizardRender />,
    parameters: { controls: { disable: true }, docs: { source: { code: PaymentWizardSource, language: "tsx" } } },
};

export const PaymentReview: StoryObj<typeof SkinProvider> = {
    render: () => <PaymentWizardRender initialStep={1} />,
    parameters: { controls: { disable: true }, docs: { source: { code: PaymentWizardSource, language: "tsx" } } },
};

export const PaymentSigning: StoryObj<typeof SkinProvider> = {
    render: () => <PaymentWizardRender initialStep={2} />,
    parameters: { controls: { disable: true }, docs: { source: { code: PaymentWizardSource, language: "tsx" } } },
};

export const PaymentComplete: StoryObj<typeof SkinProvider> = {
    render: () => <PaymentWizardRender initialStep={3} />,
    parameters: { controls: { disable: true }, docs: { source: { code: PaymentWizardSource, language: "tsx" } } },
};

export const PaymentReviewDark: StoryObj<typeof SkinProvider> = {
    render: () => <PaymentWizardRender initialStep={1} />,
    globals: { theme: "dark", backgrounds: { value: "black" } },
    parameters: { controls: { disable: true }, docs: { source: { code: PaymentWizardSource, language: "tsx" } } },
};

export const PaymentTooltip: StoryObj<typeof SkinProvider> = {
    tags: ["!autodocs", "!dev"],
    render: () => <PaymentWizardRender initialStep={1} />,
    parameters: { controls: { disable: true }, docs: { canvas: { sourceState: "none" }, codePanel: false } },
    play: async ({ canvasElement, userEvent }) => {
        const trigger = canvasElement.querySelector<HTMLElement>('button[aria-label="Как проверяется платёж"]');
        if (trigger) await userEvent.click(trigger);
    },
};
