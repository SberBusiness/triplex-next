import React from "react";
import { render, screen } from "@testing-library/react";
import { AlertContext } from "../AlertContext";
import { EAlertType } from "../../EAlertType";

vi.mock("@sberbusiness/icons-next", () => ({
    InfoStrokeStsIcon16: () => <div data-testid="info-icon">Info Icon</div>,
    WarningStrokeStsIcon16: () => <div data-testid="warning-icon">Warning Icon</div>,
    ErrorStrokeStsIcon16: () => <div data-testid="error-icon">Error Icon</div>,
    SystemStrokeStsIcon16: () => <div data-testid="system-icon">System Icon</div>,
}));

type TAlertContextType = Exclude<EAlertType, EAlertType.FEATURE>;

describe("AlertContext", () => {
    const testText = "Sample alert text";

    it("renders with info type correctly", () => {
        render(<AlertContext type={EAlertType.INFO}>{testText}</AlertContext>);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(testText);
    });

    it("renders with warning type correctly", () => {
        render(<AlertContext type={EAlertType.WARNING}>{testText}</AlertContext>);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(testText);
    });

    it("renders with error type correctly", () => {
        render(<AlertContext type={EAlertType.ERROR}>{testText}</AlertContext>);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(testText);
    });

    it("renders with system type correctly", () => {
        render(<AlertContext type={EAlertType.SYSTEM}>{testText}</AlertContext>);

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(testText);
    });

    it.each<[TAlertContextType, string]>([
        [EAlertType.INFO, "alertTypeInfo"],
        [EAlertType.WARNING, "alertTypeWarning"],
        [EAlertType.ERROR, "alertTypeError"],
        [EAlertType.SYSTEM, "alertTypeSystem"],
    ])("applies correct type class for %s", (type, expectedClass) => {
        render(<AlertContext type={type}>{testText}</AlertContext>);

        expect(screen.getByRole("alert")).toHaveClass(expectedClass);
    });

    it.each<[TAlertContextType, string]>([
        [EAlertType.INFO, "info-icon"],
        [EAlertType.WARNING, "warning-icon"],
        [EAlertType.ERROR, "error-icon"],
        [EAlertType.SYSTEM, "system-icon"],
    ])("renders default icon for %s", (type, expectedTestId) => {
        render(<AlertContext type={type}>{testText}</AlertContext>);

        expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const customClassName = "custom-alert-class";
        render(
            <AlertContext type={EAlertType.INFO} className={customClassName}>
                {testText}
            </AlertContext>,
        );

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveClass(customClassName);
    });

    it("keeps base class when custom className is passed", () => {
        render(
            <AlertContext type={EAlertType.INFO} className="custom-alert-class">
                {testText}
            </AlertContext>,
        );

        const alertElement = screen.getByRole("alert");
        expect(alertElement).toHaveClass("alertContext");
        expect(alertElement).toHaveClass("custom-alert-class");
    });

    it("renders custom icon instead of default one when renderIcon is passed", () => {
        const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
        render(
            <AlertContext type={EAlertType.INFO} renderIcon={customIcon}>
                {testText}
            </AlertContext>,
        );

        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("info-icon")).not.toBeInTheDocument();
    });

    it("forwards ref to root span element", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <AlertContext type={EAlertType.INFO} ref={ref}>
                {testText}
            </AlertContext>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(screen.getByRole("alert"));
    });

    it("renders root element with alert role", () => {
        render(<AlertContext type={EAlertType.INFO}>{testText}</AlertContext>);

        expect(screen.getByRole("alert")).toHaveAttribute("role", "alert");
    });

    it("renders data-tx attribute with package version", () => {
        render(<AlertContext type={EAlertType.INFO}>{testText}</AlertContext>);

        expect(screen.getByRole("alert")).toHaveAttribute("data-tx", process.env.npm_package_version);
    });

    it("passes through additional props to root element", () => {
        render(
            <AlertContext type={EAlertType.INFO} id="alert-id" aria-label="Alert label" data-testid="alert-root">
                {testText}
            </AlertContext>,
        );

        const alertElement = screen.getByTestId("alert-root");
        expect(alertElement).toHaveAttribute("id", "alert-id");
        expect(alertElement).toHaveAttribute("aria-label", "Alert label");
    });

    it("wraps children into Text with B4 typography classes", () => {
        render(<AlertContext type={EAlertType.INFO}>{testText}</AlertContext>);

        const textElement = screen.getByText(testText);
        expect(textElement).toHaveClass("alertContextText");
        expect(textElement).toHaveClass("typography");
        expect(textElement).toHaveClass("text");
        expect(textElement).toHaveClass("b4");
    });

    it.each<[TAlertContextType, string]>([
        [EAlertType.INFO, "info"],
        [EAlertType.WARNING, "warning"],
        [EAlertType.ERROR, "error"],
        [EAlertType.SYSTEM, "secondary"],
    ])("does not set a Typography font type class on text for %s", (type, fontTypeClass) => {
        render(<AlertContext type={type}>{testText}</AlertContext>);

        // Цвет текста задаёт правило .alertContext.alertTypeX .alertContextText через токены
        // AlertContext-*, а не prop type у Text: токены Typography-* отличаются для всех типов,
        // кроме ERROR. Появление здесь font-type класса означает возврат мёртвого дублирования.
        expect(screen.getByText(testText)).not.toHaveClass(fontTypeClass);
    });

    it("renders complex children", () => {
        render(
            <AlertContext type={EAlertType.INFO}>
                <strong>Bold</strong> and plain
            </AlertContext>,
        );

        expect(screen.getByText("Bold")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent("Bold and plain");
    });
});
