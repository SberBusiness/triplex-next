import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../src";
import { Gap } from "../src/components/Gap";
import { SMSInput } from "../src/components/SMSInput";
import { EFontType, ETextSize, Text } from "../src/components/Typography";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/SMSField",
    component: SMSInput,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент для ввода СМС.

## Использование

\`SMSField\` состоит из подсказки \`SMSField.Tooltip\` с кнопкой \`SMSField.Refresh\`, поля ввода \`SMSField.Input\` и кнопки отправки \`SMSField.Submit\`. Можно добавить описание и счётчик.
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

// Базовая логика для переиспользования.
const useSMSInputLogic = () => {
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
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

    return {
        code,
        timeLeft,
        targetRef,
        onChange: handleChange,
        onSubmit: handleSubmit,
        onRefresh: handleRefresh,
    };
};

export const Playground: StoryObj<ISMSInputProps> = {
    name: "Playground",
    args: {
        description: "Перейдите по",
        disabled: false,
        maxLength: 8,
        placeholder: "Введите код",
        size: EComponentSize.MD,
    },
    argTypes: {
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
            include: ["description", "disabled", "maxLength", "placeholder", "size"],
        },
        docs: {
            description: {
                story: "Интерактивная демонстрация SMSInput. Позволяет настраивать основные свойства компонента.",
            },
        },
    },
    render: (args: ISMSInputProps) => {
        const { disabled, maxLength, placeholder, size } = args;
        const { code, timeLeft, targetRef, onChange, onSubmit, onRefresh } = useSMSInputLogic();

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={code}
                    disabled={disabled}
                    maxLength={maxLength}
                    onChangeCode={onChange}
                    onSubmitCode={onSubmit}
                    size={size}
                >
                    <SMSInput.Tooltip targetRef={targetRef} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeft}
                            onRefresh={onRefresh}
                            ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                        />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder={placeholder} />
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
        const {
            code: codeSM,
            timeLeft: timeLeftSM,
            targetRef: targetRefSM,
            onChange: handleChangeSM,
            onSubmit: handleSubmitSM,
            onRefresh: handleRefreshSM,
        } = useSMSInputLogic();

        const {
            code: codeMD,
            timeLeft: timeLeftMD,
            targetRef: targetRefMD,
            onChange: handleChangeMD,
            onSubmit: handleSubmitMD,
            onRefresh: handleRefreshMD,
        } = useSMSInputLogic();

        const {
            code: codeLG,
            timeLeft: timeLeftLG,
            targetRef: targetRefLG,
            onChange: handleChangeLG,
            onSubmit: handleSubmitLG,
            onRefresh: handleRefreshLG,
        } = useSMSInputLogic();

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={codeSM}
                    error={true}
                    maxLength={8}
                    onChangeCode={handleChangeSM}
                    onSubmitCode={handleSubmitSM}
                    size={EComponentSize.SM}
                >
                    <SMSInput.Tooltip targetRef={targetRefSM} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftSM}
                            onRefresh={handleRefreshSM}
                            ref={(el: HTMLButtonElement) => (targetRefSM.current = el)}
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

                <Gap size={24} />

                <SMSInput
                    code={codeMD}
                    error={true}
                    maxLength={8}
                    onChangeCode={handleChangeMD}
                    onSubmitCode={handleSubmitMD}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRefMD} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftMD}
                            onRefresh={handleRefreshMD}
                            ref={(el: HTMLButtonElement) => (targetRefMD.current = el)}
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

                <Gap size={24} />

                <SMSInput
                    code={codeLG}
                    error={true}
                    maxLength={8}
                    onChangeCode={handleChangeLG}
                    onSubmitCode={handleSubmitLG}
                    size={EComponentSize.LG}
                >
                    <SMSInput.Tooltip targetRef={targetRefLG} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftLG}
                            onRefresh={handleRefreshLG}
                            ref={(el: HTMLButtonElement) => (targetRefLG.current = el)}
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
        const {
            code: codeSM,
            timeLeft: timeLeftSM,
            targetRef: targetRefSM,
            onChange: handleChangeSM,
            onSubmit: handleSubmitSM,
            onRefresh: handleRefreshSM,
        } = useSMSInputLogic();

        const {
            code: codeMD,
            timeLeft: timeLeftMD,
            targetRef: targetRefMD,
            onChange: handleChangeMD,
            onSubmit: handleSubmitMD,
            onRefresh: handleRefreshMD,
        } = useSMSInputLogic();

        const {
            code: codeLG,
            timeLeft: timeLeftLG,
            targetRef: targetRefLG,
            onChange: handleChangeLG,
            onSubmit: handleSubmitLG,
            onRefresh: handleRefreshLG,
        } = useSMSInputLogic();

        return (
            <div style={{ width: "300px" }}>
                <SMSInput
                    code={codeSM}
                    onChangeCode={handleChangeSM}
                    onSubmitCode={handleSubmitSM}
                    size={EComponentSize.SM}
                >
                    <SMSInput.Tooltip targetRef={targetRefSM} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftSM}
                            onRefresh={handleRefreshSM}
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
                    onSubmitCode={handleSubmitMD}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Tooltip targetRef={targetRefMD} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftMD}
                            onRefresh={handleRefreshMD}
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
                    onSubmitCode={handleSubmitLG}
                    size={EComponentSize.LG}
                >
                    <SMSInput.Tooltip targetRef={targetRefLG} message="Текст подсказки">
                        <SMSInput.Refresh
                            countdownTime={10}
                            countdownTimeLeft={timeLeftLG}
                            onRefresh={handleRefreshLG}
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
