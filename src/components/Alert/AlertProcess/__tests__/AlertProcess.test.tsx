import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertProcess } from "../AlertProcess";
import { EAlertType } from "../../EAlertType";

vi.mock("@sberbusiness/icons-next/CloseSrvxIcon16", () => ({
    CloseSrvxIcon16: () => <div data-testid="close-icon">CloseIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/CaretdownSrvxIcon16", () => ({
    CaretdownSrvxIcon16: () => <div data-testid="caret-icon">CaretIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/InfoStsIcon16", () => ({
    InfoStsIcon16: () => <div data-testid="info-icon">InfoIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/WarningStsIcon16", () => ({
    WarningStsIcon16: () => <div data-testid="warning-icon">WarningIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/ErrorStsIcon16", () => ({
    ErrorStsIcon16: () => <div data-testid="error-icon">ErrorIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/SystemStsIcon16", () => ({
    SystemStsIcon16: () => <div data-testid="system-icon">SystemIcon</div>,
}));

vi.mock("@sberbusiness/icons-next/DefaulticonPrdIcon20", () => ({
    DefaulticonPrdIcon20: () => <div data-testid="feature-icon">FeatureIcon</div>,
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
        expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    });

    it("Should call onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(<AlertProcess type={EAlertType.INFO} closable onClose={onClose} data-testid="alert" />);

        const closeButton = screen.getByTestId("close-icon").closest("button");
        fireEvent.click(closeButton!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("Should render expandable content when provided", () => {
        const expandableContent = <div data-testid="expandable-content">Expandable content</div>;
        render(<AlertProcess type={EAlertType.INFO} expandableContent={expandableContent} data-testid="alert" />);

        expect(screen.getByTestId("expandable-content")).toBeInTheDocument();
        expect(screen.getByTestId("caret-icon")).toBeInTheDocument();
    });

    it("Should toggle expandable content when expand button is clicked", () => {
        const expandableContent = <div data-testid="expandable-content">Expandable content</div>;
        render(<AlertProcess type={EAlertType.INFO} expandableContent={expandableContent} data-testid="alert" />);

        const expandButton = screen.getByTestId("caret-icon").closest("button");
        const expandableContentElement = screen.getByTestId("expandable-content").parentElement;

        expect(expandableContentElement).not.toHaveClass("expanded");

        fireEvent.click(expandButton!);
        expect(expandableContentElement).toHaveClass("expanded");

        fireEvent.click(expandButton!);
        expect(expandableContentElement).not.toHaveClass("expanded");
    });

    it("Should start expanded when expandableContentOpen is true", () => {
        const expandableContent = <div data-testid="expandable-content">Expandable content</div>;
        render(
            <AlertProcess
                type={EAlertType.INFO}
                expandableContent={expandableContent}
                expandableContentOpen={true}
                data-testid="alert"
            />,
        );

        const expandableContentElement = screen.getByTestId("expandable-content").parentElement;
        expect(expandableContentElement).toHaveClass("expanded");
    });
});
