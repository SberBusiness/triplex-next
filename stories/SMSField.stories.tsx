import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { EComponentSize } from "../src";
import { SMSField } from "../src/components/SMSField";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/SMSField",
    component: SMSField,
    tags: ["autodocs"],
    parameters: {
        docs: {
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
    decorators: [
        (Story) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SMSField>;

type ISMSFieldProps = Partial<React.ComponentProps<typeof SMSField>> &
    Partial<
        Pick<React.ComponentProps<typeof SMSField.Input>, "description" | "errorText" | "maxLength" | "placeholder">
    >;

// Базовая логика для переиспользования.
const useSMSFieldLogic = (value: string) => {
    const [code, setCode] = useState(value);
    const [timeLeft, setTimeLeft] = useState(0);
    const targetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            setTimeout(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
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

export const Playground: StoryObj<ISMSFieldProps> = {
    name: "Playground",
    args: {
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
        errorText: {
            control: { type: "text" },
            description: "Текст ошибки, отображается вместо плейсхолдера вне фокуса",
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
            include: ["description", "disabled", "errorText", "maxLength", "placeholder", "size"],
        },
        testRunner: { skip: true },
    },
    render: (args: ISMSFieldProps) => {
        const { description, disabled, errorText, maxLength, placeholder, size } = args;
        const { code, timeLeft, targetRef, onChange, onSubmit, onRefresh } = useSMSFieldLogic("");

        return (
            <SMSField
                code={code}
                disabled={disabled}
                onChangeCode={onChange}
                onSubmitCode={onSubmit}
                size={size ?? EComponentSize.MD}
            >
                <SMSField.Tooltip targetRef={targetRef} message="Текст подсказки">
                    <SMSField.Refresh
                        countdownTime={10}
                        countdownTimeLeft={timeLeft}
                        onRefresh={onRefresh}
                        ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                    />
                </SMSField.Tooltip>
                <SMSField.Input
                    description={description}
                    errorText={errorText}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
                <SMSField.Submit />
            </SMSField>
        );
    },
};

export const Error: StoryObj<ISMSFieldProps> = {
    name: "Error",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <>
                {sizes.map((size) => {
                    const { code, timeLeft, targetRef, onChange, onSubmit, onRefresh } = useSMSFieldLogic("");

                    return (
                        <SMSField key={size} code={code} onChangeCode={onChange} onSubmitCode={onSubmit} size={size}>
                            <SMSField.Tooltip targetRef={targetRef} message="Текст подсказки">
                                <SMSField.Refresh
                                    countdownTime={10}
                                    countdownTimeLeft={timeLeft}
                                    onRefresh={onRefresh}
                                    ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                                />
                            </SMSField.Tooltip>
                            <SMSField.Input errorText="Неверный код" maxLength={8} placeholder="Введите код" />
                            <SMSField.Submit />
                        </SMSField>
                    );
                })}
            </>
        );
    },
};

export const Disabled: StoryObj<ISMSFieldProps> = {
    name: "Disabled",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const targetRefEmpty = useRef<HTMLElement | null>(null);
        const targetRefError = useRef<HTMLElement | null>(null);
        const targetRefFull = useRef<HTMLElement | null>(null);

        const handleChange = () => {};

        const handleSubmit = () => {};

        const handleRefresh = () => {};

        return (
            <>
                <SMSField
                    code="12345678"
                    disabled={true}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSField.Tooltip targetRef={targetRefFull} message="Текст подсказки">
                        <SMSField.Refresh
                            countdownTime={5}
                            countdownTimeLeft={2}
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefFull.current = el)}
                        />
                    </SMSField.Tooltip>
                    <SMSField.Input placeholder="Введите код" />
                    <SMSField.Submit />
                </SMSField>

                <SMSField
                    code=""
                    disabled={true}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSField.Tooltip targetRef={targetRefEmpty} message="Текст подсказки">
                        <SMSField.Refresh
                            countdownTime={5}
                            countdownTimeLeft={2}
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefEmpty.current = el)}
                        />
                    </SMSField.Tooltip>
                    <SMSField.Input placeholder="Введите код" />
                    <SMSField.Submit />
                </SMSField>

                <SMSField
                    code=""
                    disabled={true}
                    onChangeCode={handleChange}
                    onSubmitCode={handleSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSField.Tooltip targetRef={targetRefError} message="Текст подсказки">
                        <SMSField.Refresh
                            countdownTime={5}
                            countdownTimeLeft={2}
                            onRefresh={handleRefresh}
                            ref={(el: HTMLButtonElement) => (targetRefError.current = el)}
                        />
                    </SMSField.Tooltip>
                    <SMSField.Input errorText="Неверный код" placeholder="Введите код" />
                    <SMSField.Submit />
                </SMSField>
            </>
        );
    },
};

export const Sizes: StoryObj<ISMSFieldProps> = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <>
                {sizes.map((size) => {
                    const { code, timeLeft, targetRef, onChange, onSubmit, onRefresh } = useSMSFieldLogic("");

                    return (
                        <SMSField key={size} code={code} onChangeCode={onChange} onSubmitCode={onSubmit} size={size}>
                            <SMSField.Tooltip targetRef={targetRef} message="Текст подсказки">
                                <SMSField.Refresh
                                    countdownTime={10}
                                    countdownTimeLeft={timeLeft}
                                    onRefresh={onRefresh}
                                    ref={(el: HTMLButtonElement) => (targetRef.current = el)}
                                />
                            </SMSField.Tooltip>
                            <SMSField.Input placeholder="Введите код" />
                            <SMSField.Submit />
                        </SMSField>
                    );
                })}
            </>
        );
    },
};

export const VisualTests: StoryObj<ISMSFieldProps> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const filled = useSMSFieldLogic("12345678");
        const errored = useSMSFieldLogic("");

        return (
            <>
                <SMSField
                    code={filled.code}
                    disabled={true}
                    onChangeCode={filled.onChange}
                    onSubmitCode={filled.onSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSField.Tooltip targetRef={filled.targetRef} message="Текст подсказки">
                        <SMSField.Refresh
                            countdownTime={5}
                            countdownTimeLeft={filled.timeLeft}
                            onRefresh={filled.onRefresh}
                            ref={(el: HTMLButtonElement) => (filled.targetRef.current = el)}
                        />
                    </SMSField.Tooltip>
                    <SMSField.Input placeholder="Введите код" />
                    <SMSField.Submit />
                </SMSField>

                <SMSField
                    code={errored.code}
                    onChangeCode={errored.onChange}
                    onSubmitCode={errored.onSubmit}
                    size={EComponentSize.MD}
                >
                    <SMSField.Tooltip targetRef={errored.targetRef} message="Текст подсказки">
                        <SMSField.Refresh
                            countdownTime={5}
                            countdownTimeLeft={errored.timeLeft}
                            onRefresh={errored.onRefresh}
                            ref={(el: HTMLButtonElement) => (errored.targetRef.current = el)}
                        />
                    </SMSField.Tooltip>
                    <SMSField.Input errorText="Неверный код" placeholder="Введите код" />
                    <SMSField.Submit />
                </SMSField>
            </>
        );
    },
};
