import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { Gap } from "../src/components/Gap";
import { Link } from "../src/components/Link";
import { SMSInput } from "../src/components/SMSInput";
import { EFontType, ETextSize, Text } from "../src/components/Typography";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";

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

type ISMSInputProps = Partial<React.ComponentProps<typeof SMSInput>>;

export const Playground: StoryObj<ISMSInputProps> = {
    name: "Playground",
    args: {
        counter: "0/8",
        description: "Перейдите по",
        disabled: false,
        maxLength: 8,
        placeholder: "Введите код",
        size: EComponentSize.MD,
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
            options: Object.values(EComponentSize),
            description: "Размер поля",
        },
    },
    parameters: {
        controls: {
            include: ["counter", "description", "disabled", "maxLength", "placeholder", "size"],
        },
        docs: {
            description: {
                story: "Интерактивная демонстрация SMSInput. Позволяет настраивать основные свойства компонента.",
            },
        },
    },
    render: (args: ISMSInputProps) => {
        const [code, setCode] = useState("");
        const [timeLeft, setTimeLeft] = useState(0);
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

        const handleSubmit = () => setCode("");

        const handleRefresh = () => {
            setCode("");
            setTimeLeft(10);
        };

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={code}
                    disabled={disabled}
                    maxLength={maxLength}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={size}
                >
                    <SMSInput.Tooltip targetRef={targetRef} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeft}
                            onRefresh={handleRefresh}
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
    name: "Error",
    parameters: {
        controls: { disable: true },
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

        const handleSubmit = () => setCode("");

        const handleRefresh = () => {};

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={code}
                    error={true}
                    maxLength={8}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRef} message="Текст подсказки">
                        <SMSInput.Refresh
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                        />
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
    name: "Disabled",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "SMSInput в состоянии disabled с введённым кодом и без.",
            },
        },
    },
    render: () => {
        const targetRefEmpty = useRef<HTMLElement | null>(null);
        const targetRefFull = useRef<HTMLElement | null>(null);

        const handleChange = () => {};

        const handleSubmit = () => {};

        const handleRefresh = () => {};

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code="12345678"
                    disabled={true}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRefFull} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={5}
                            countdownTimeLeft={2}
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefFull.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput
                    code=""
                    disabled={true}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRefEmpty} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={5}
                            countdownTimeLeft={2}
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefEmpty.current = el)}
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
    name: "Sizes",
    parameters: {
        controls: { disable: true },
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

        const handleSubmit = () => {};

        const handleRefresh = () => {};

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={codeSM}
                    onChangeCode={handleChangeSM}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.SM}
                >
                    <SMSInput.Tooltip targetRef={targetRefSM} message="Текст подсказки">
                        <SMSInput.Refresh
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefSM.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput
                    code={codeMD}
                    onChangeCode={handleChangeMD}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRefMD} message="Текст подсказки">
                        <SMSInput.Refresh
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefMD.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>

                <Gap size={24} />

                <SMSInput
                    code={codeLG}
                    onChangeCode={handleChangeLG}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.LG}
                >
                    <SMSInput.Tooltip targetRef={targetRefLG} message="Текст подсказки">
                        <SMSInput.Refresh
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefLG.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>
            </div>
        );
    },
};
