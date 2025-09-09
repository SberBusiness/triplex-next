import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertProcess } from "../AlertProcess";
import { EAlertType } from "../../EAlertType";

vi.mock("@sberbusiness/icons-next", () => ({
    CrossStrokeSrvIcon16: () => <div data-testid="close-icon">CloseIcon</div>,
    CaretdownStrokeSrvIcon16: () => <div data-testid="caret-icon">CaretIcon</div>,
    InfoStrokeStsIcon20: () => <div data-testid="info-icon">InfoIcon</div>,
    WarningStrokeStsIcon20: () => <div data-testid="warning-icon">WarningIcon</div>,
    ErrorStrokeStsIcon20: () => <div data-testid="error-icon">ErrorIcon</div>,
    SystemStrokeStsIcon20: () => <div data-testid="system-icon">SystemIcon</div>,
    DefaulticonStrokePrdIcon20: () => <div data-testid="feature-icon">FeatureIcon</div>,
}));

const getAlert = () => screen.getByTestId("alert");

describe("AlertProcess", () => {
    it("Should render with props", () => {
        render(<AlertProcess type={EAlertType.INFO} data-testid="alert" />);

        const alert = getAlert();
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass("alertProcess");
        expect(alert).toHaveClass("alertTypeInfo");
    });

    it("Should render with different alert types", () => {
        const { rerender } = render(<AlertProcess type={EAlertType.INFO} data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveClass("alertTypeInfo");
        expect(screen.getByTestId("info-icon")).toBeInTheDocument();

        rerender(<AlertProcess type={EAlertType.WARNING} data-testid="alert" />);
        expect(alert).toHaveClass("alertTypeWarning");
        expect(screen.getByTestId("warning-icon")).toBeInTheDocument();

        rerender(<AlertProcess type={EAlertType.ERROR} data-testid="alert" />);
        expect(alert).toHaveClass("alertTypeError");
        expect(screen.getByTestId("error-icon")).toBeInTheDocument();

        rerender(<AlertProcess type={EAlertType.SYSTEM} data-testid="alert" />);
        expect(alert).toHaveClass("alertTypeSystem");
        expect(screen.getByTestId("system-icon")).toBeInTheDocument();

        rerender(<AlertProcess type={EAlertType.FEATURE} data-testid="alert" />);
        expect(alert).toHaveClass("alertTypeFeature");
        expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
    });

    it("Should render custom icon when provided", () => {
        const customIcon = <div data-testid="custom-icon">Custom Icon</div>;
        render(<AlertProcess type={EAlertType.INFO} renderIcon={customIcon} data-testid="alert" />);
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("Should apply custom className", () => {
        render(<AlertProcess type={EAlertType.INFO} className="custom-class" data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveClass("custom-class");
    });

    it("Should render close button when closable is true", () => {
        render(<AlertProcess type={EAlertType.INFO} closable data-testid="alert" />);
        const closeButton = screen.getByRole("button");
        expect(closeButton).toBeInTheDocument();
    });

    it("Should call onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(<AlertProcess type={EAlertType.INFO} closable onClose={onClose} data-testid="alert" />);

        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("Should hide alert when closed", () => {
        const onClose = vi.fn();
        const { rerender } = render(
            <AlertProcess type={EAlertType.INFO} closable onClose={onClose} data-testid="alert" />,
        );

        expect(screen.getByTestId("alert")).toBeInTheDocument();

        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);

        rerender(<AlertProcess type={EAlertType.INFO} closable onClose={onClose} data-testid="alert" />);
        expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
    });

    it("Should render children content", () => {
        const testContent = "Test alert content";
        render(
            <AlertProcess type={EAlertType.INFO} data-testid="alert">
                {testContent}
            </AlertProcess>,
        );

        expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("Should render with custom data-tx attribute", () => {
        render(<AlertProcess type={EAlertType.INFO} data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveAttribute("data-tx");
    });
});

describe("AlertProcess.Spoiler", () => {
    it("Should render spoiler component", () => {
        render(
            <AlertProcess.Spoiler data-testid="spoiler">
                <div>Spoiler content</div>
            </AlertProcess.Spoiler>,
        );

        expect(screen.getByTestId("spoiler")).toBeInTheDocument();
        expect(screen.getByText("Spoiler content")).toBeInTheDocument();
    });

    it("Should call onOpen when expand button is clicked", () => {
        const onOpen = vi.fn();
        render(
            <AlertProcess.Spoiler onOpen={onOpen} data-testid="spoiler">
                <div>Spoiler content</div>
            </AlertProcess.Spoiler>,
        );

        const expandButton = screen.getByTestId("caret-icon").closest("button");
        fireEvent.click(expandButton!);

        expect(onOpen).toHaveBeenCalledWith(true);
    });
});
