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

    it("renders with custom icon", () => {
        const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
        render(
            <AlertContext type={EAlertType.INFO} renderIcon={customIcon}>
                {testText}
            </AlertContext>,
        );

        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
});
