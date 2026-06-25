import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import {
    TextField,
    FormFieldClear,
    HelpBox,
    Text,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETooltipSize,
    ETooltipPreferPlace,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export default {
    title: "Components/TextFields/TextField",
    component: TextField,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={TextField} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof TextField>;

interface IPlaygroundProps extends React.ComponentProps<typeof TextField> {
    labelText?: string;
    placeholder?: string;
    prefixText?: string;
    postfixText?: string;
    descriptionText?: string;
    showLabel?: boolean;
}

export const Playground: StoryObj<IPlaygroundProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const {
            labelText,
            placeholder,
            prefixText,
            postfixText,
            descriptionText,
            showLabel,
            counter,
            ...textFieldProps
        } = args;

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    {...textFieldProps}
                    description={
                        descriptionText ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {descriptionText}
                            </Text>
                        ) : undefined
                    }
                    prefix={prefixText || ""}
                    postfix={postfixText || ""}
                    counter={
                        counter ? (
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                {counter}
                            </Text>
                        ) : undefined
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: placeholder || "Type to proceed",
                    }}
                    label={showLabel ? labelText || "Label" : undefined}
                />
            </div>
        );
    },
    argTypes: {
        status: {
            control: { type: "select" },
            options: Object.values(EFormFieldStatus),
        },
        labelText: {
            control: { type: "text" },
        },
        showLabel: {
            control: { type: "boolean" },
        },
        placeholder: {
            control: { type: "text" },
        },
        prefixText: {
            control: { type: "text" },
        },
        postfixText: {
            control: { type: "text" },
        },
        descriptionText: {
            control: { type: "text" },
        },
        counter: {
            control: { type: "text" },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
    },
    args: {
        status: EFormFieldStatus.DEFAULT,
        size: EComponentSize.LG,
        labelText: "Label",
        showLabel: true,
        placeholder: "Type to proceed",
        prefixText: "",
        postfixText: "",
        descriptionText: "(21) Description",
        counter: "0/201",
    },
    parameters: {
        controls: {
            include: [
                "status",
                "labelText",
                "showLabel",
                "placeholder",
                "prefixText",
                "postfixText",
                "descriptionText",
                "counter",
                "size",
            ],
        },
        testRunner: { skip: true },
    },
};

export const Default: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const PassRefToInput: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");
        const ref = useRef<HTMLInputElement>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    inputProps={{
                        ref: ref,
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithPrefixAndPostfix: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                    postfix={
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithClearButton: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    postfix={<FormFieldClear onClick={() => setValue("")} />}
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const WithCounter: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");
        const maxLength = 201;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (newValue.length <= maxLength) {
                setValue(newValue);
            }
        };

        const currentLength = value.length;

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description
                        </Text>
                    }
                    counter={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {currentLength}/{maxLength}
                        </Text>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        maxLength: maxLength,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};

export const Sizes: StoryObj<typeof TextField> = {
    render: () => {
        const [valueSM, setValueSM] = useState("");
        const [valueMD, setValueMD] = useState("");
        const [valueLG, setValueLG] = useState("");

        const handleChangeSM = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueSM(e.target.value);
        };

        const handleChangeMD = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueMD(e.target.value);
        };

        const handleChangeLG = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueLG(e.target.value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SM</div>
                    <TextField
                        size={EComponentSize.SM}
                        inputProps={{
                            value: valueSM,
                            onChange: handleChangeSM,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>MD</div>
                    <TextField
                        size={EComponentSize.MD}
                        inputProps={{
                            value: valueMD,
                            onChange: handleChangeMD,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>LG</div>
                    <TextField
                        size={EComponentSize.LG}
                        inputProps={{
                            value: valueLG,
                            onChange: handleChangeLG,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const States: StoryObj<typeof TextField> = {
    render: () => {
        const [value, setValue] = useState("");
        const [valueError, setValueError] = useState("");
        const [valueWarning, setValueWarning] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        const handleChangeError = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueError(e.target.value);
        };

        const handleChangeWarning = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValueWarning(e.target.value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DEFAULT</div>
                    <TextField
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description
                            </Text>
                        }
                        inputProps={{
                            value: value,
                            onChange: handleChange,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>ERROR</div>
                    <TextField
                        status={EFormFieldStatus.ERROR}
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                Error text
                            </Text>
                        }
                        inputProps={{
                            value: valueError,
                            onChange: handleChangeError,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>WARNING</div>
                    <TextField
                        status={EFormFieldStatus.WARNING}
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.WARNING}>
                                Warning text
                            </Text>
                        }
                        inputProps={{
                            value: valueWarning,
                            onChange: handleChangeWarning,
                            placeholder: "Type to proceed",
                        }}
                        label="Label"
                    />
                </div>

                <div style={{ maxWidth: 300 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>DISABLED</div>
                    <TextField
                        status={EFormFieldStatus.DISABLED}
                        inputProps={{}}
                        description={
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                (21) Description
                            </Text>
                        }
                        label="Label"
                    />
                </div>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const Production: StoryObj<typeof TextField> = {
    name: "Example: production",
    render: () => {
        const [value, setValue] = useState("");
        const maxLength = 201;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (newValue.length <= maxLength) {
                setValue(newValue);
            }
        };

        const currentLength = value.length;

        return (
            <div style={{ maxWidth: 300 }}>
                <TextField
                    description={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                            <Link href="#" onClick={(event) => event.preventDefault()}>
                                Link text
                            </Link>
                        </Text>
                    }
                    counter={
                        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {currentLength}/{maxLength}
                        </Text>
                    }
                    prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                    postfix={
                        <>
                            <FormFieldClear onClick={() => setValue("")} />
                            <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                                Text
                            </HelpBox>
                        </>
                    }
                    inputProps={{
                        value: value,
                        onChange: handleChange,
                        placeholder: "Type to proceed",
                    }}
                    label="Label"
                />
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
};
