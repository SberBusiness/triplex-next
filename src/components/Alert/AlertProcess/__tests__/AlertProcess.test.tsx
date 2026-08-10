import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertProcess } from "../AlertProcess";
import { EAlertProcessBorderRadius } from "../enums";
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
        expect(screen.queryByTestId("info-icon")).not.toBeInTheDocument();
    });

    it("Should fall back to the default icon when renderIcon is falsy", () => {
        render(<AlertProcess type={EAlertType.INFO} renderIcon={null} data-testid="alert" />);
        expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });

    it("Should apply custom className", () => {
        render(<AlertProcess type={EAlertType.INFO} className="custom-class" data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveClass("custom-class");
    });

    it("Should keep base classes when custom className is passed", () => {
        render(<AlertProcess type={EAlertType.INFO} className="custom-class" data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveClass("alertProcess");
        expect(alert).toHaveClass("alertTypeInfo");
    });

    it.each<[EAlertProcessBorderRadius, string]>([
        [EAlertProcessBorderRadius.MD, "md"],
        [EAlertProcessBorderRadius.LG, "lg"],
    ])("Should apply border radius class for %s", (borderRadius, expectedClass) => {
        render(<AlertProcess type={EAlertType.INFO} borderRadius={borderRadius} data-testid="alert" />);
        expect(getAlert()).toHaveClass(expectedClass);
    });

    it("Should apply MD border radius class by default", () => {
        render(<AlertProcess type={EAlertType.INFO} data-testid="alert" />);
        const alert = getAlert();
        expect(alert).toHaveClass("md");
        expect(alert).not.toHaveClass("lg");
    });

    it("Should not render close button when closable is not set", () => {
        render(<AlertProcess type={EAlertType.INFO} data-testid="alert" />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
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
        expect(onClose).toHaveBeenCalledWith();
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

    it("Should stay closed even when closable is switched off after closing", () => {
        const { rerender } = render(<AlertProcess type={EAlertType.INFO} closable data-testid="alert" />);

        fireEvent.click(screen.getByRole("button"));

        rerender(<AlertProcess type={EAlertType.INFO} closable={false} data-testid="alert" />);
        expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
    });

    it("Should close without onClose passed", () => {
        render(<AlertProcess type={EAlertType.INFO} closable data-testid="alert" />);

        fireEvent.click(screen.getByRole("button"));

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

    it("Should pass through additional props to the root element", () => {
        render(<AlertProcess type={EAlertType.INFO} id="alert-id" aria-label="Alert label" data-testid="alert" />);

        const alert = getAlert();
        expect(alert).toHaveAttribute("id", "alert-id");
        expect(alert).toHaveAttribute("aria-label", "Alert label");
    });

    it("Should forward ref to the root div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<AlertProcess type={EAlertType.INFO} ref={ref} data-testid="alert" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getAlert());
    });

    it("Should expose Spoiler as a static property", () => {
        expect(AlertProcess.Spoiler).toBeDefined();
    });

    it("Should add withSpoiler class while a Spoiler is mounted", () => {
        render(
            <AlertProcess type={EAlertType.INFO} data-testid="alert">
                <AlertProcess.Spoiler data-testid="spoiler">Spoiler content</AlertProcess.Spoiler>
            </AlertProcess>,
        );

        expect(getAlert()).toHaveClass("withSpoiler");
    });

    it("Should not add withSpoiler class when there is no Spoiler", () => {
        render(
            <AlertProcess type={EAlertType.INFO} data-testid="alert">
                Plain content
            </AlertProcess>,
        );

        expect(getAlert()).not.toHaveClass("withSpoiler");
    });

    it("Should remove withSpoiler class when the Spoiler unmounts", () => {
        const { rerender } = render(
            <AlertProcess type={EAlertType.INFO} data-testid="alert">
                <AlertProcess.Spoiler data-testid="spoiler">Spoiler content</AlertProcess.Spoiler>
            </AlertProcess>,
        );

        expect(getAlert()).toHaveClass("withSpoiler");

        rerender(
            <AlertProcess type={EAlertType.INFO} data-testid="alert">
                Plain content
            </AlertProcess>,
        );

        expect(getAlert()).not.toHaveClass("withSpoiler");
    });
});
