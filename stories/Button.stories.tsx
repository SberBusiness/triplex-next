import React from "react";
import { Button } from "@sberbusiness/triplex-next";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Gap } from "../src/components/Gap";
import { EButtonTheme, EButtonSize } from "../src/components/Button/enums";

export default {
    title: "Components/Buttons/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки с различными темами, размерами и состояниями.

## Особенности

- **Темы**: General, Secondary, Danger, Link
- **Размеры**: small (SM), medium (MD), large (LG)
- **Состояния**: disabled, loading, expanded
- **Режимы**: обычный, блочный (block)
- **Доступность**: поддержка ARIA атрибутов и клавиатурной навигации

## Использование

\`\`\`tsx
import { Button, EButtonTheme, EButtonSize } from '@sberbusiness/triplex-next';

// Основная кнопка
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} onClick={handleClick}>
    Click me
</Button>

// Кнопка в состоянии загрузки
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} loading>
    Click me
</Button>

// Кнопка в состоянии disabled
<Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} disabled>
    Click me
</Button>

// Кнопка в блочном режиме
<Button theme={EButtonTheme.SECONDARY} size={EButtonSize.LG} block>
    Click me
</Button>
\`\`\`
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof Button> = {
    name: "Default",
    args: {
        children: "Button text",
        onClick: action("On Click"),
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EButtonSize),
            description: "Размер кнопки",
            table: {
                defaultValue: { summary: EButtonSize.MD },
            },
        },
        block: {
            control: { type: "boolean" },
            description: "Блочный режим",
            table: {
                type: { summary: "boolean" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Режим загрузки",
            table: {
                type: { summary: "boolean" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Контент кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },

    render: (args) => (
        <div style={{ width: "250px" }}>
            <Button {...args} />
        </div>
    ),
};

export const DifferentThemes: StoryObj<typeof Button> = {
    name: "Different Themes",
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                    Danger
                </Button>
                <Button theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                    Link
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Доступные темы кнопок",
            },
        },
    },
};

export const Icon: StoryObj<typeof Button> = {
    name: "Icon",
    args: {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.1895 4.66507 16.2586 8.17529 16.8836C8.71903 16.9804 9.08133 17.4996 8.98452 18.0434C8.8877 18.5871 8.36844 18.9494 7.82471 18.8526C3.3769 18.0606 0 14.1757 0 9.5C0 4.25329 4.25329 0 9.5 0C11.1161 0 12.6407 0.404353 13.9752 1.11823C14.4622 1.37873 14.6458 1.98469 14.3853 2.47168C14.1248 2.95867 13.5189 3.14227 13.0319 2.88177C11.9804 2.31932 10.779 2 9.5 2Z"
                    fill="#FFFFFF"
                />
                <path
                    d="M17.8254 7.5068C18.3739 7.44251 18.8707 7.83507 18.935 8.3836C18.978 8.75014 19 9.12271 19 9.5C19 9.79564 18.9865 10.0884 18.9599 10.3776C18.9095 10.9276 18.4228 11.3325 17.8728 11.2821C17.3228 11.2317 16.9179 10.7449 16.9683 10.1949C16.9893 9.96636 17 9.73457 17 9.5C17 9.20067 16.9825 8.90584 16.9486 8.6164C16.8843 8.06787 17.2769 7.57108 17.8254 7.5068Z"
                    fill="#FFFFFF"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5 9.81804C14.8806 9.81804 15.2283 10.0341 15.3967 10.3755L16.4866 12.5837L18.9236 12.9379C19.3002 12.9926 19.6132 13.2564 19.7308 13.6184C19.8484 13.9805 19.7503 14.3779 19.4778 14.6436L17.7144 16.3625L18.1306 18.7896C18.195 19.1647 18.0408 19.5439 17.7328 19.7676C17.4249 19.9914 17.0166 20.0209 16.6797 19.8438L14.5 18.6978L12.3203 19.8438C11.9834 20.0209 11.5751 19.9914 11.2672 19.7676C10.9592 19.5439 10.805 19.1647 10.8694 18.7896L11.2856 16.3625L9.52223 14.6436C9.24966 14.3779 9.15156 13.9805 9.26919 13.6184C9.38681 13.2564 9.69976 12.9926 10.0764 12.9379L12.5134 12.5837L13.6033 10.3755C13.7717 10.0341 14.1194 9.81804 14.5 9.81804ZM14.5 13.0776L14.0742 13.9403C13.9286 14.2355 13.647 14.44 13.3213 14.4874L12.3692 14.6257L13.0581 15.2972C13.2938 15.527 13.4014 15.858 13.3457 16.1824L13.1831 17.1306L14.0347 16.6829C14.326 16.5298 14.674 16.5298 14.9653 16.6829L15.8169 17.1306L15.6543 16.1824C15.5986 15.858 15.7062 15.527 15.9419 15.2972L16.6308 14.6257L15.6787 14.4874C15.353 14.44 15.0714 14.2355 14.9258 13.9403L14.5 13.0776Z"
                    fill="#FFFFFF"
                />
                <path
                    d="M17.1178 5.78633C17.5521 5.44512 17.6275 4.81646 17.2863 4.38219C16.9451 3.94792 16.3164 3.87248 15.8822 4.21369L9.47142 9.25071L6.58122 7.18628C6.13181 6.86527 5.50726 6.96936 5.18625 7.41877C4.86524 7.86819 4.96934 8.49274 5.41875 8.81375L8.91875 11.3137C9.28017 11.5719 9.76856 11.5607 10.1178 11.2863L17.1178 5.78633Z"
                    fill="#FFFFFF"
                />
            </svg>
        ),
    },
    argTypes: {
        icon: { table: { disable: true } },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button icon={args.icon} size={EButtonSize.SM} theme={EButtonTheme.GENERAL} />
            <Button icon={args.icon} size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} />
            <Button
                icon={
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.5C10.4772 6.5 6 10.9772 6 16.5C6 21.5595 9.75832 25.7428 14.6351 26.4077C15.1823 26.4824 15.5654 26.9865 15.4908 27.5337C15.4162 28.0809 14.9121 28.464 14.3649 28.3894C8.51062 27.5912 4 22.5732 4 16.5C4 9.87258 9.37258 4.5 16 4.5C18.3195 4.5 20.4881 5.15907 22.3252 6.30062C22.7943 6.5921 22.9383 7.20868 22.6468 7.67778C22.3554 8.14688 21.7388 8.29087 21.2697 7.99938C19.7402 7.04902 17.9358 6.5 16 6.5Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M26.8956 14.6777C27.4464 14.6369 27.926 15.0503 27.9668 15.6011C27.9888 15.898 28 16.1978 28 16.5C28 17.0541 27.9624 17.6 27.8894 18.1351C27.8148 18.6823 27.3107 19.0654 26.7635 18.9908C26.2163 18.9162 25.8331 18.4121 25.9077 17.8649C25.9685 17.4191 26 16.9635 26 16.5C26 16.2472 25.9906 15.9967 25.9723 15.7489C25.9314 15.1982 26.3448 14.7186 26.8956 14.6777Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M26.7809 9.37531C27.1259 9.80657 27.0559 10.4359 26.6247 10.7809L16.6247 18.7809C16.2635 19.0698 15.7512 19.0734 15.386 18.7894L10.886 15.2894C10.4501 14.9503 10.3716 14.322 10.7106 13.8861C11.0497 13.4501 11.678 13.3716 12.1139 13.7107L15.9913 16.7264L25.3753 9.21914C25.8066 8.87413 26.4358 8.94405 26.7809 9.37531Z"
                            fill="#FFFFFF"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.8967 17.5574C22.7283 17.2161 22.3806 17 22 17C21.6194 17 21.2717 17.2161 21.1033 17.5574L19.5726 20.6589L16.1499 21.1563C15.7732 21.211 15.4602 21.4749 15.3426 21.8369C15.225 22.1989 15.3231 22.5963 15.5957 22.862L18.0724 25.2762L17.4877 28.6851C17.4233 29.0602 17.5776 29.4394 17.8855 29.6631C18.1935 29.8869 18.6017 29.9164 18.9386 29.7392L22 28.1298L25.0614 29.7392C25.3983 29.9164 25.8066 29.8869 26.1145 29.6631C26.4225 29.4394 26.5767 29.0602 26.5123 28.6851L25.9277 25.2762L28.4044 22.862C28.6769 22.5963 28.775 22.1989 28.6574 21.8369C28.5398 21.4749 28.2268 21.211 27.8501 21.1563L24.4274 20.6589L22.8967 17.5574ZM21.1334 22.0155L22 20.2596L22.8666 22.0155C23.0123 22.3107 23.2939 22.5152 23.6196 22.5626L25.5574 22.8441L24.1552 24.211C23.9195 24.4407 23.8119 24.7717 23.8676 25.0961L24.1986 27.0261L22.4653 26.1149C22.174 25.9617 21.826 25.9617 21.5347 26.1149L19.8014 27.0261L20.1324 25.0961C20.1881 24.7717 20.0805 24.4407 19.8449 24.211L18.4426 22.8441L20.3805 22.5626C20.7062 22.5152 20.9877 22.3107 21.1334 22.0155Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                }
                size={EButtonSize.LG}
                theme={EButtonTheme.DANGER}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка с иконкой, переданной свойством icon",
            },
        },
    },
};

export const DifferentSizes: StoryObj<typeof Button> = {
    name: "Different Sizes",
    render: () => (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.GENERAL}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.GENERAL}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.SECONDARY}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.SECONDARY}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.DANGER}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.DANGER}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.DANGER}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.LINK}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.LINK}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.LINK}>
                    LG
                </Button>
            </div>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: "Доступные размеры кнопок",
            },
        },
    },
};

export const BlockMode: StoryObj<typeof Button> = {
    name: "Block mode",
    render: () => (
        <div style={{ width: "250px" }}>
            <Button block theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                General
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Secondary
            </Button>
            <Gap size={16} />
            <Button
                block
                size={EButtonSize.MD}
                theme={EButtonTheme.DANGER}
                icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.5 2C5.35786 2 2 5.35786 2 9.5C2 13.1895 4.66507 16.2586 8.17529 16.8836C8.71903 16.9804 9.08133 17.4996 8.98452 18.0434C8.8877 18.5871 8.36844 18.9494 7.82471 18.8526C3.3769 18.0606 0 14.1757 0 9.5C0 4.25329 4.25329 0 9.5 0C11.1161 0 12.6407 0.404353 13.9752 1.11823C14.4622 1.37873 14.6458 1.98469 14.3853 2.47168C14.1248 2.95867 13.5189 3.14227 13.0319 2.88177C11.9804 2.31932 10.779 2 9.5 2Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M17.8254 7.5068C18.3739 7.44251 18.8707 7.83507 18.935 8.3836C18.978 8.75014 19 9.12271 19 9.5C19 9.79564 18.9865 10.0884 18.9599 10.3776C18.9095 10.9276 18.4228 11.3325 17.8728 11.2821C17.3228 11.2317 16.9179 10.7449 16.9683 10.1949C16.9893 9.96636 17 9.73457 17 9.5C17 9.20067 16.9825 8.90584 16.9486 8.6164C16.8843 8.06787 17.2769 7.57108 17.8254 7.5068Z"
                            fill="#FFFFFF"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5 9.81804C14.8806 9.81804 15.2283 10.0341 15.3967 10.3755L16.4866 12.5837L18.9236 12.9379C19.3002 12.9926 19.6132 13.2564 19.7308 13.6184C19.8484 13.9805 19.7503 14.3779 19.4778 14.6436L17.7144 16.3625L18.1306 18.7896C18.195 19.1647 18.0408 19.5439 17.7328 19.7676C17.4249 19.9914 17.0166 20.0209 16.6797 19.8438L14.5 18.6978L12.3203 19.8438C11.9834 20.0209 11.5751 19.9914 11.2672 19.7676C10.9592 19.5439 10.805 19.1647 10.8694 18.7896L11.2856 16.3625L9.52223 14.6436C9.24966 14.3779 9.15156 13.9805 9.26919 13.6184C9.38681 13.2564 9.69976 12.9926 10.0764 12.9379L12.5134 12.5837L13.6033 10.3755C13.7717 10.0341 14.1194 9.81804 14.5 9.81804ZM14.5 13.0776L14.0742 13.9403C13.9286 14.2355 13.647 14.44 13.3213 14.4874L12.3692 14.6257L13.0581 15.2972C13.2938 15.527 13.4014 15.858 13.3457 16.1824L13.1831 17.1306L14.0347 16.6829C14.326 16.5298 14.674 16.5298 14.9653 16.6829L15.8169 17.1306L15.6543 16.1824C15.5986 15.858 15.7062 15.527 15.9419 15.2972L16.6308 14.6257L15.6787 14.4874C15.353 14.44 15.0714 14.2355 14.9258 13.9403L14.5 13.0776Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M17.1178 5.78633C17.5521 5.44512 17.6275 4.81646 17.2863 4.38219C16.9451 3.94792 16.3164 3.87248 15.8822 4.21369L9.47142 9.25071L6.58122 7.18628C6.13181 6.86527 5.50726 6.96936 5.18625 7.41877C4.86524 7.86819 4.96934 8.49274 5.41875 8.81375L8.91875 11.3137C9.28017 11.5719 9.76856 11.5607 10.1178 11.2863L17.1178 5.78633Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в блочном режиме",
            },
        },
    },
};

export const Disabled: StoryObj<typeof Button> = {
    name: "Disabled",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button disabled theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                General
            </Button>
            <Button disabled theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Secondary
            </Button>
            <Button disabled theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                Danger
            </Button>
            <Button disabled theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                Link
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии disabled",
            },
        },
    },
};

export const Loading: StoryObj<typeof Button> = {
    name: "Loading",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button loading theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button text
            </Button>
            <Button
                loading
                icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.5C10.4772 6.5 6 10.9772 6 16.5C6 21.5595 9.75832 25.7428 14.6351 26.4077C15.1823 26.4824 15.5654 26.9865 15.4908 27.5337C15.4162 28.0809 14.9121 28.464 14.3649 28.3894C8.51062 27.5912 4 22.5732 4 16.5C4 9.87258 9.37258 4.5 16 4.5C18.3195 4.5 20.4881 5.15907 22.3252 6.30062C22.7943 6.5921 22.9383 7.20868 22.6468 7.67778C22.3554 8.14688 21.7388 8.29087 21.2697 7.99938C19.7402 7.04902 17.9358 6.5 16 6.5Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M26.8956 14.6777C27.4464 14.6369 27.926 15.0503 27.9668 15.6011C27.9888 15.898 28 16.1978 28 16.5C28 17.0541 27.9624 17.6 27.8894 18.1351C27.8148 18.6823 27.3107 19.0654 26.7635 18.9908C26.2163 18.9162 25.8331 18.4121 25.9077 17.8649C25.9685 17.4191 26 16.9635 26 16.5C26 16.2472 25.9906 15.9967 25.9723 15.7489C25.9314 15.1982 26.3448 14.7186 26.8956 14.6777Z"
                            fill="#FFFFFF"
                        />
                        <path
                            d="M26.7809 9.37531C27.1259 9.80657 27.0559 10.4359 26.6247 10.7809L16.6247 18.7809C16.2635 19.0698 15.7512 19.0734 15.386 18.7894L10.886 15.2894C10.4501 14.9503 10.3716 14.322 10.7106 13.8861C11.0497 13.4501 11.678 13.3716 12.1139 13.7107L15.9913 16.7264L25.3753 9.21914C25.8066 8.87413 26.4358 8.94405 26.7809 9.37531Z"
                            fill="#FFFFFF"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.8967 17.5574C22.7283 17.2161 22.3806 17 22 17C21.6194 17 21.2717 17.2161 21.1033 17.5574L19.5726 20.6589L16.1499 21.1563C15.7732 21.211 15.4602 21.4749 15.3426 21.8369C15.225 22.1989 15.3231 22.5963 15.5957 22.862L18.0724 25.2762L17.4877 28.6851C17.4233 29.0602 17.5776 29.4394 17.8855 29.6631C18.1935 29.8869 18.6017 29.9164 18.9386 29.7392L22 28.1298L25.0614 29.7392C25.3983 29.9164 25.8066 29.8869 26.1145 29.6631C26.4225 29.4394 26.5767 29.0602 26.5123 28.6851L25.9277 25.2762L28.4044 22.862C28.6769 22.5963 28.775 22.1989 28.6574 21.8369C28.5398 21.4749 28.2268 21.211 27.8501 21.1563L24.4274 20.6589L22.8967 17.5574ZM21.1334 22.0155L22 20.2596L22.8666 22.0155C23.0123 22.3107 23.2939 22.5152 23.6196 22.5626L25.5574 22.8441L24.1552 24.211C23.9195 24.4407 23.8119 24.7717 23.8676 25.0961L24.1986 27.0261L22.4653 26.1149C22.174 25.9617 21.826 25.9617 21.5347 26.1149L19.8014 27.0261L20.1324 25.0961C20.1881 24.7717 20.0805 24.4407 19.8449 24.211L18.4426 22.8441L20.3805 22.5626C20.7062 22.5152 20.9877 22.3107 21.1334 22.0155Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                }
                size={EButtonSize.SM}
                theme={EButtonTheme.GENERAL}
            />
            <Button loading theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button text
            </Button>

            <Button loading theme={EButtonTheme.DANGER} size={EButtonSize.LG}>
                Button text
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии loading",
            },
        },
    },
};

export const Expanded: StoryObj<typeof Button> = {
    name: "Expanded",
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} aria-expanded>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} aria-expanded>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} aria-expanded>
                    Danger
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.MD}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6126 2C13.9734 2 13.3822 2.23979 12.9237 2.69873L4.11287 11.5184C3.39811 12.2339 3 13.1885 3 14.2024C3 15.2163 3.39811 16.171 4.11287 16.8864C4.82759 17.6019 5.78087 18 6.79279 18C7.80472 18 8.75799 17.6019 9.47272 16.8864L16.3828 9.97245C16.7732 9.58182 17.4064 9.58164 17.797 9.97205C18.1876 10.3625 18.1878 10.9956 17.7974 11.3863L10.8876 18.2999C9.80056 19.3881 8.33942 20 6.79279 20C5.24616 20 3.78502 19.3881 2.69795 18.2999C1.61091 17.2118 1 15.7497 1 14.2024C1 12.6551 1.6109 11.193 2.69794 10.1049L11.5088 1.28524C12.3476 0.445583 13.45 0 14.6126 0C15.7792 0 16.8985 0.466452 17.7165 1.28523C18.5552 2.12484 19 3.22792 19 4.39078C19 5.55766 18.5344 6.67759 17.7165 7.49633L10.0149 15.2067C8.92783 16.2949 6.99475 16.5713 5.7382 15.3421L5.73035 15.3344C4.82901 14.4331 4.24756 12.4684 5.73039 10.9856C6.22193 10.4941 7.23643 9.47474 8.23357 8.47277L8.35911 8.34662L8.35977 8.34596C9.31133 7.38979 10.2261 6.47057 10.6262 6.07045C11.0168 5.67993 11.6499 5.67993 12.0404 6.07045C12.431 6.46098 12.431 7.09414 12.0404 7.48467C11.6422 7.88291 10.7289 8.80068 9.77567 9.75848L9.77558 9.75858L9.6512 9.88356C8.65507 10.8845 7.63832 11.9061 7.14461 12.3998C6.87495 12.6695 6.80741 12.9502 6.82929 13.2104C6.85371 13.5008 6.9929 13.7662 7.14069 13.9162C7.47111 14.2345 8.13929 14.2544 8.59997 13.7933L16.3012 6.0832C16.7445 5.63942 17 5.02751 17 4.39078C17 3.75003 16.7601 3.15773 16.3015 2.69874C15.8582 2.25499 15.2478 2 14.6126 2Z"
                                fill="#B2B8BF"
                            />
                        </svg>
                    }
                    aria-expanded
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии expanded",
            },
        },
    },
};

export const TextWithIcon: StoryObj<typeof Button> = {
    name: "Text With Icon",
    args: {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.6126 2C13.9734 2 13.3822 2.23979 12.9237 2.69873L4.11287 11.5184C3.39811 12.2339 3 13.1885 3 14.2024C3 15.2163 3.39811 16.171 4.11287 16.8864C4.82759 17.6019 5.78087 18 6.79279 18C7.80472 18 8.75799 17.6019 9.47272 16.8864L16.3828 9.97245C16.7732 9.58182 17.4064 9.58164 17.797 9.97205C18.1876 10.3625 18.1878 10.9956 17.7974 11.3863L10.8876 18.2999C9.80056 19.3881 8.33942 20 6.79279 20C5.24616 20 3.78502 19.3881 2.69795 18.2999C1.61091 17.2118 1 15.7497 1 14.2024C1 12.6551 1.6109 11.193 2.69794 10.1049L11.5088 1.28524C12.3476 0.445583 13.45 0 14.6126 0C15.7792 0 16.8985 0.466452 17.7165 1.28523C18.5552 2.12484 19 3.22792 19 4.39078C19 5.55766 18.5344 6.67759 17.7165 7.49633L10.0149 15.2067C8.92783 16.2949 6.99475 16.5713 5.7382 15.3421L5.73035 15.3344C4.82901 14.4331 4.24756 12.4684 5.73039 10.9856C6.22193 10.4941 7.23643 9.47474 8.23357 8.47277L8.35911 8.34662L8.35977 8.34596C9.31133 7.38979 10.2261 6.47057 10.6262 6.07045C11.0168 5.67993 11.6499 5.67993 12.0404 6.07045C12.431 6.46098 12.431 7.09414 12.0404 7.48467C11.6422 7.88291 10.7289 8.80068 9.77567 9.75848L9.77558 9.75858L9.6512 9.88356C8.65507 10.8845 7.63832 11.9061 7.14461 12.3998C6.87495 12.6695 6.80741 12.9502 6.82929 13.2104C6.85371 13.5008 6.9929 13.7662 7.14069 13.9162C7.47111 14.2345 8.13929 14.2544 8.59997 13.7933L16.3012 6.0832C16.7445 5.63942 17 5.02751 17 4.39078C17 3.75003 16.7601 3.15773 16.3015 2.69874C15.8582 2.25499 15.2478 2 14.6126 2Z"
                    fill="#B2B8BF"
                />
            </svg>
        ),
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
    },
    argTypes: {
        icon: { table: { disable: true } },
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
        },
        size: {
            control: { type: "select" },
            options: Object.values(EButtonSize),
            table: {
                defaultValue: { summary: EButtonSize.MD },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Контент кнопки состоит из текста и иконки",
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button {...args}>&nbsp;Button text</Button>
        </div>
    ),
};
