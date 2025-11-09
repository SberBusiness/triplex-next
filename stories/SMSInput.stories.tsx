import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { EFormFieldSize } from "../src/components/FormField";
import { Gap } from "../src/components/Gap";
import { Link } from "../src/components/Link";
import { SMSInput } from "../src/components/SMSInput";
import { EFontType, ETextSize, Text } from "../src/components/Typography";

export default {
    title: "Components/SMSInput",
    component: SMSInput,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент для ввода СМС.

## Использование

\`SMSInput\` состоит из подсказки \`SMSInput.Tooltip\` с кнопкой \`SMSInput.Refresh\`, поля ввода \`SMSInput.Input\` и кнопки отправки \`SMSInput.Submit\`. Можно добавить описание и счётчик.
                `,
            },
        },
    },
};

type ISMSInputProps = Partial<React.ComponentProps<typeof SMSInput>>;

export const Playground: StoryObj<ISMSInputProps> = {
    name: "Playground",
    args: {
        counter: "0/8",
        description: "Перейдите по",
        disabled: false,
        maxLength: 8,
        placeholder: "Введите код",
        size: EFormFieldSize.MD,
    },
    argTypes: {
        counter: {
            control: { type: "text" },
            description: "Текст счётчика символов",
        },
        description: {
            control: { type: "text" },
            description: "Описание поля ввода",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Признак блокировки компонента",
        },
        maxLength: {
            control: { type: "number", min: 1 },
            description: "Максимальное количество символов",
        },
        placeholder: {
            control: { type: "text" },
            description: "Плейсхолдер поля ввода",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EFormFieldSize),
            description: "Размер поля",
        },
        children: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация SMSInput. Позволяет настраивать основные свойства компонента.",
            },
        },
    },
    render: (args: ISMSInputProps) => {
        const [code, setCode] = useState("");
        const [timeLeft, setTimeLeft] = useState(10);
        const { counter, description, disabled, maxLength, placeholder, size } = args;
        const targetRef = useRef<HTMLElement | null>(null);

        useEffect(() => {
            if (timeLeft > 0) {
                setTimeout(() => {
                    setTimeLeft((timeLeft) => timeLeft - 1);
                }, 1_000);
            }
        }, [timeLeft]);

        const handleChange = (value: string) => {
            setCode(value);
        };

        return (
            <div style={{ width: "300px" }}>
                <SMSInput code={code} disabled={disabled} maxLength={maxLength} onChangeCode={handleChange} size={size}>
                    <SMSInput.Tooltip targetRef={targetRef} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeft}
                            ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input
                        counter={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {counter}
                            </Text>
                        }
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {description}
                                <Link> ссылке</Link>
                            </Text>
                        }
                        placeholder={placeholder}
                    />
                    <SMSInput.Submit />
                </SMSInput>
            </div>
        );
    },
};

export const Error: StoryObj<ISMSInputProps> = {
    parameters: {
        docs: {
            description: {
                story: "SMSInput в состоянии error.",
            },
        },
    },
    render: () => {
        const [code, setCode] = useState("");
        const targetRef = useRef<HTMLElement | null>(null);

        const handleChange = (value: string) => {
            setCode(value);
        };

        return (
            <div style={{ width: "300px" }}>
                <SMSInput code={code} error={true} maxLength={8} onChangeCode={handleChange} size={EFormFieldSize.MD}>
                    <SMSInput.Tooltip targetRef={targetRef} message="Текст подсказки">
                        <SMSInput.Refresh ref={(el: HTMLButtonElement) => (targetRef.current = el)} />
                    </SMSInput.Tooltip>
                    <SMSInput.Input
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                Текст ошибки
                            </Text>
                        }
                        placeholder="Введите код"
                    />
                    <SMSInput.Submit />
                </SMSInput>
            </div>
        );
    },
};

export const Disabled: StoryObj<ISMSInputProps> = {
    parameters: {
        docs: {
            description: {
                story: "SMSInput в состоянии disabled с введённым кодом и без.",
            },
        },
    },
    render: () => {
        const targetRefEmpty = useRef<HTMLElement | null>(null);
        const targetRefFull = useRef<HTMLElement | null>(null);

        return (
            <div style={{ width: "300px" }}>
                <SMSInput code="12345678" disabled={true} size={EFormFieldSize.MD}>
                    <SMSInput.Tooltip targetRef={targetRefFull} message="Текст подсказки">
                        <SMSInput.Refresh
                            ref={(el: HTMLButtonElement) => (targetRefFull.current = el)}
                            countdownTime={5}
                            countdownTimeLeft={2}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput code="" disabled={true} size={EFormFieldSize.MD}>
                    <SMSInput.Tooltip targetRef={targetRefEmpty} message="Текст подсказки">
                        <SMSInput.Refresh
                            ref={(el: HTMLButtonElement) => (targetRefEmpty.current = el)}
                            countdownTime={5}
                            countdownTimeLeft={2}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>
            </div>
        );
    },
};

export const Sizes: StoryObj<ISMSInputProps> = {
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров SMSInput: SM (маленький), MD (средний), LG (большой). Каждый размер имеет свои отступы и высоту для разных случаев использования.",
            },
        },
    },
    render: () => {
        const [codeSM, setCodeSM] = useState("");
        const [codeMD, setCodeMD] = useState("");
        const [codeLG, setCodeLG] = useState("");
        const targetRefSM = useRef<HTMLElement | null>(null);
        const targetRefMD = useRef<HTMLElement | null>(null);
        const targetRefLG = useRef<HTMLElement | null>(null);

        const handleChangeSM = (value: string) => {
            setCodeSM(value);
        };

        const handleChangeMD = (value: string) => {
            setCodeMD(value);
        };

        const handleChangeLG = (value: string) => {
            setCodeLG(value);
        };

        return (
            <div style={{ width: "300px" }}>
                <SMSInput code={codeSM} size={EFormFieldSize.SM} onChangeCode={handleChangeSM}>
                    <SMSInput.Tooltip targetRef={targetRefSM} message="Текст подсказки">
                        <SMSInput.Refresh ref={(el: HTMLButtonElement) => (targetRefSM.current = el)} />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput code={codeMD} size={EFormFieldSize.MD} onChangeCode={handleChangeMD}>
                    <SMSInput.Tooltip targetRef={targetRefMD} message="Текст подсказки">
                        <SMSInput.Refresh ref={(el: HTMLButtonElement) => (targetRefMD.current = el)} />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput code={codeLG} size={EFormFieldSize.LG} onChangeCode={handleChangeLG}>
                    <SMSInput.Tooltip targetRef={targetRefLG} message="Текст подсказки">
                        <SMSInput.Refresh ref={(el: HTMLButtonElement) => (targetRefLG.current = el)} />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>
            </div>
        );
    },
};
