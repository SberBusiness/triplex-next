import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { SMSInput } from "@sberbusiness/triplex-next/components/SMSInput";
import { SMSInputContext } from "@sberbusiness/triplex-next/components/SMSInput/SMSInputContext";
import { RefreshIcon } from "@sberbusiness/triplex-next/components/SMSInput/components/RefreshIcon";
import { SubmitIcon } from "@sberbusiness/triplex-next/components/SMSInput/components/SubmitIcon";
import smsInputStyles from "@sberbusiness/triplex-next/components/SMSInput/styles/SMSInput.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const createDefaultSmsInputProps = () => ({
    code: "",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
});

describe("SMSInput", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders root element with base class, custom class and children", () => {
        const props = createDefaultSmsInputProps();

        render(
            <SMSInput {...props} className="custom-root" data-testid="sms-input">
                <div data-testid="sms-input-child">Child</div>
            </SMSInput>,
        );

        const root = screen.getByTestId("sms-input");
        expect(root).toBeInTheDocument();
        expect(root).toHaveClass(smsInputStyles.smsInput);
        expect(root).toHaveClass("custom-root");
        expect(root).toHaveAttribute("data-tx", process.env.npm_package_version);
        expect(screen.getByTestId("sms-input-child")).toBeInTheDocument();
    });

    it("provides size class to nested submit button based on size prop", () => {
        const props = {
            ...createDefaultSmsInputProps(),
            size: EComponentSize.SM,
        };

        render(
            <SMSInput {...props}>
                <SMSInput.Submit aria-label="Send code" />
            </SMSInput>,
        );

        const submitButton = screen.getByRole("button", { name: "Send code" });
        expect(submitButton).toHaveClass(smsInputStyles.SM);
    });
});

describe("SMSInput.Input", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("accepts only numeric input, updates controlled value and submits on Enter", async () => {
        const handleChangeCode = vi.fn();
        const handleSubmitCode = vi.fn();
        const handleOnChange = vi.fn();

        const ControlledSmsInput: React.FC = () => {
            const [code, setCode] = React.useState("");

            const handleCodeChange = (value: string) => {
                setCode(value);
                handleChangeCode(value);
            };

            return (
                <SMSInput
                    code={code}
                    onChangeCode={handleCodeChange}
                    onSubmitCode={handleSubmitCode}
                    size={EComponentSize.MD}
                >
                    <SMSInput.Input
                        aria-label="SMS code"
                        counter={`${code.length}/8`}
                        placeholder="Введите код"
                        onChange={handleOnChange}
                    />
                    <SMSInput.Submit aria-label="Отправить код" />
                </SMSInput>
            );
        };

        render(<ControlledSmsInput />);

        const input = screen.getByRole("textbox", { name: "SMS code" });

        fireEvent.change(input, { target: { value: "12" } });
        expect(handleChangeCode).toHaveBeenLastCalledWith("12");
        expect(handleOnChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue("12");

        fireEvent.change(input, { target: { value: "12a" } });
        expect(handleChangeCode).toHaveBeenCalledTimes(1);
        expect(handleOnChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue("12");

        fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
        await waitFor(() => expect(handleSubmitCode).toHaveBeenCalledWith("12"));
    });

    it("renders description text and counter content", () => {
        const props = {
            ...createDefaultSmsInputProps(),
            code: "1234",
        };

        render(
            <SMSInput {...props}>
                <SMSInput.Input
                    aria-label="SMS code"
                    counter={<span data-testid="sms-counter">4 / 8</span>}
                    description="Введите код, отправленный по SMS"
                />
            </SMSInput>,
        );

        expect(screen.getByText("Введите код, отправленный по SMS")).toBeInTheDocument();
        expect(screen.getByTestId("sms-counter")).toHaveTextContent("4 / 8");
    });
});

describe("SMSInput.Submit", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("disables submit button when code is empty", () => {
        const props = createDefaultSmsInputProps();

        render(
            <SMSInput {...props}>
                <SMSInput.Submit aria-label="Отправить" />
            </SMSInput>,
        );

        const submitButton = screen.getByRole("button", { name: "Отправить" });
        expect(submitButton).toBeDisabled();
        expect(submitButton).not.toHaveClass(smsInputStyles.active);
    });

    it("activates submit button and calls onSubmitCode when code is provided", () => {
        const props = {
            ...createDefaultSmsInputProps(),
            code: "9876",
        };

        render(
            <SMSInput {...props}>
                <SMSInput.Submit aria-label="Подтвердить" />
            </SMSInput>,
        );

        const submitButton = screen.getByRole("button", { name: "Подтвердить" });
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveClass(smsInputStyles.active);

        fireEvent.click(submitButton);
        expect(props.onSubmitCode).toHaveBeenCalledWith("9876");
    });

    it("updates disabledSubmit flag in context based on code presence", async () => {
        const disabledSubmitListener = vi.fn();

        const DisabledSubmitProbe: React.FC<{ listener: (value: boolean) => void }> = ({ listener }) => {
            const { disabledSubmit } = React.useContext(SMSInputContext);

            React.useEffect(() => {
                listener(disabledSubmit);
            }, [disabledSubmit, listener]);

            return null;
        };

        const handleChangeCode = vi.fn();
        const handleSubmitCode = vi.fn();

        const ControlledSmsInput: React.FC = () => {
            const [code, setCode] = React.useState("");

            const handleCodeChange = (value: string) => {
                setCode(value);
                handleChangeCode(value);
            };

            return (
                <SMSInput
                    code={code}
                    onChangeCode={handleCodeChange}
                    onSubmitCode={handleSubmitCode}
                    size={EComponentSize.MD}
                >
                    <DisabledSubmitProbe listener={disabledSubmitListener} />
                    <SMSInput.Input aria-label="SMS code" counter={`${code.length}/8`} />
                    <SMSInput.Submit aria-label="Отправить код" />
                </SMSInput>
            );
        };

        render(<ControlledSmsInput />);

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(disabledSubmitListener).toHaveBeenLastCalledWith(true);

        fireEvent.change(input, { target: { value: "1234" } });
        await waitFor(() => expect(disabledSubmitListener).toHaveBeenLastCalledWith(false));
    });
});

describe("SMSInput.Refresh", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("disables refresh while countdown is active and shows progress", () => {
        const props = {
            ...createDefaultSmsInputProps(),
            code: "",
        };
        const handleRefresh = vi.fn();

        render(
            <SMSInput {...props}>
                <SMSInput.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={5}
                    onRefresh={handleRefresh}
                />
            </SMSInput>,
        );

        const refreshButton = screen.getByRole("button", { name: "Запросить новый код" });
        expect(refreshButton).toHaveAttribute("aria-disabled", "true");
        expect(refreshButton).toHaveClass(smsInputStyles.disabled);
        fireEvent.click(refreshButton);
        expect(handleRefresh).not.toHaveBeenCalled();

        const clipPath = refreshButton.querySelector("clipPath");
        expect(clipPath).toHaveAttribute("id", "clipFront0.5");
    });

    it("invokes onRefresh and onClick when enabled", () => {
        const props = createDefaultSmsInputProps();
        const handleRefresh = vi.fn();
        const handleClick = vi.fn();

        render(
            <SMSInput {...props}>
                <SMSInput.Refresh
                    aria-label="Получить код"
                    countdownTime={30}
                    countdownTimeLeft={0}
                    onRefresh={handleRefresh}
                    onClick={handleClick}
                />
            </SMSInput>,
        );

        const refreshButton = screen.getByRole("button", { name: "Получить код" });
        expect(refreshButton).not.toHaveAttribute("aria-disabled", "true");

        fireEvent.click(refreshButton);
        expect(handleRefresh).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledTimes(1);

        const clipPath = refreshButton.querySelector("clipPath");
        expect(clipPath).toHaveAttribute("id", "clipFront0.999");
    });
});

describe("SMSInput.Tooltip", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("generates tooltip id, wires it to refresh button and displays tooltip content", async () => {
        const props = createDefaultSmsInputProps();
        const tooltipListener = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        const TooltipIdProbe: React.FC<{ listener: (value?: string) => void }> = ({ listener }) => {
            const { tooltipId } = React.useContext(SMSInputContext);

            React.useEffect(() => {
                listener(tooltipId);
            }, [listener, tooltipId]);

            return null;
        };

        render(
            <SMSInput {...props}>
                <TooltipIdProbe listener={tooltipListener} />
                <SMSInput.Tooltip message="Код повторно отправлен" targetRef={targetRef} isOpen>
                    <SMSInput.Refresh
                        aria-label="Отправить снова"
                        countdownTime={10}
                        countdownTimeLeft={0}
                        onRefresh={vi.fn()}
                        ref={targetRef}
                    />
                </SMSInput.Tooltip>
            </SMSInput>,
        );

        const refreshButton = screen.getByRole("button", { name: "Отправить снова" });

        await waitFor(() => {
            expect(refreshButton.getAttribute("aria-describedby")).toBeTruthy();
        });

        const tooltipId = refreshButton.getAttribute("aria-describedby");
        expect(tooltipId).toBeTruthy();

        const lastCall = tooltipListener.mock.calls[tooltipListener.mock.calls.length - 1];
        expect(lastCall[0]).toBe(tooltipId);

        const tooltipBody = screen.getByText("Код повторно отправлен");
        expect(tooltipBody).toBeInTheDocument();

        const tooltipElement = document.getElementById(tooltipId ?? "");
        expect(tooltipElement).not.toBeNull();
        expect(tooltipElement?.textContent).toContain("Код повторно отправлен");
    });
});

describe("RefreshIcon", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("clamps percent to three decimal places and applies disabled class", () => {
        const { container } = render(<RefreshIcon disabled percent={1.5} size={EComponentSize.MD} />);

        const clipPath = container.querySelector("clipPath");
        expect(clipPath).toHaveAttribute("id", "clipFront0.999");

        const disabledPath = container.querySelector(`.${smsInputStyles.disabled}`);
        expect(disabledPath).toBeInTheDocument();
    });

    it("renders large icon dimensions for LG size", () => {
        const { container } = render(<RefreshIcon disabled={false} percent={0.25} size={EComponentSize.LG} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "32");
        expect(svg).toHaveAttribute("height", "32");
    });
});

describe("SubmitIcon", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders svg with large size dimensions for LG variant", () => {
        const { container } = render(<SubmitIcon size={EComponentSize.LG} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "26");
        expect(svg).toHaveAttribute("height", "26");
    });

    it("renders svg with default dimensions for non-LG sizes", () => {
        const { container } = render(<SubmitIcon size={EComponentSize.MD} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "20");
        expect(svg).toHaveAttribute("height", "20");
    });
});
