import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusTracker } from "@sberbusiness/triplex-next/components/StatusTracker";
import { StatusTrackerMedia } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerMedia";
import { StatusTrackerHeader } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerHeader";
import { StatusTrackerBody } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerBody";
import { StatusTrackerFooter } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerFooter";
import { StatusTrackerButton } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerButton";
import { StatusTrackerAlert } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerAlert";
import { StatusTrackerStatus } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerStatus";
import { StatusTrackerDescription } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerDescription";
import { StatusTrackerTitle } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerTitle";
import { StatusTrackerSum } from "@sberbusiness/triplex-next/components/StatusTracker/components/StatusTrackerSum";
import {
    EStatusTrackerType,
    EStatusTrackerVerticalAlign,
} from "@sberbusiness/triplex-next/components/StatusTracker/enums";
import { EMarkerStatus } from "@sberbusiness/triplex-next/components/Marker/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EAlertType } from "@sberbusiness/triplex-next/components/Alert/EAlertType";
import { EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { IButtonGeneralProps } from "@sberbusiness/triplex-next/components/Button/Button";

const getStatusTracker = () => screen.getByTestId("status-tracker");

describe("StatusTracker", () => {
    it("Should render with default props", () => {
        render(
            <StatusTracker type={EStatusTrackerType.WAITING} data-testid="status-tracker">
                <StatusTracker.Media>Media</StatusTracker.Media>
            </StatusTracker>,
        );
        const tracker = getStatusTracker();
        expect(tracker).toBeInTheDocument();
        expect(tracker).toHaveClass("statusTrackerWrapper");
    });

    it("Should apply type classes correctly", () => {
        const { rerender } = render(
            <StatusTracker type={EStatusTrackerType.WAITING} data-testid="status-tracker">
                Content
            </StatusTracker>,
        );
        let tracker = getStatusTracker();
        let background = tracker.querySelector('[class*="statusTrackerBackground"]');
        expect(background).toHaveClass("waiting");

        rerender(
            <StatusTracker type={EStatusTrackerType.REJECTED} data-testid="status-tracker">
                Content
            </StatusTracker>,
        );
        tracker = getStatusTracker();
        background = tracker.querySelector('[class*="statusTrackerBackground"]');
        expect(background).toHaveClass("rejected");

        rerender(
            <StatusTracker type={EStatusTrackerType.WARNING} data-testid="status-tracker">
                Content
            </StatusTracker>,
        );
        tracker = getStatusTracker();
        background = tracker.querySelector('[class*="statusTrackerBackground"]');
        expect(background).toHaveClass("warning");

        rerender(
            <StatusTracker type={EStatusTrackerType.APPROVED} data-testid="status-tracker">
                Content
            </StatusTracker>,
        );
        tracker = getStatusTracker();
        background = tracker.querySelector('[class*="statusTrackerBackground"]');
        expect(background).toHaveClass("approved");
    });

    it("Should apply verticalAlign classes correctly", () => {
        const { rerender } = render(
            <StatusTracker
                type={EStatusTrackerType.WAITING}
                verticalAlign={EStatusTrackerVerticalAlign.TOP}
                data-testid="status-tracker"
            >
                Content
            </StatusTracker>,
        );
        const tracker = getStatusTracker();
        const content = tracker.querySelector(
            '[class*="statusTracker"]:not([class*="Wrapper"]):not([class*="Background"]):not([class*="Color"])',
        );
        expect(content).not.toHaveClass("verticalAlignMiddle");
        expect(content).not.toHaveClass("verticalAlignBottom");

        rerender(
            <StatusTracker
                type={EStatusTrackerType.WAITING}
                verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}
                data-testid="status-tracker"
            >
                Content
            </StatusTracker>,
        );
        expect(content).toHaveClass("verticalAlignMiddle");

        rerender(
            <StatusTracker
                type={EStatusTrackerType.WAITING}
                verticalAlign={EStatusTrackerVerticalAlign.BOTTOM}
                data-testid="status-tracker"
            >
                Content
            </StatusTracker>,
        );
        expect(content).toHaveClass("verticalAlignBottom");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTracker
                type={EStatusTrackerType.WAITING}
                className="custom-class"
                id="tracker-id"
                data-testid="status-tracker"
            >
                Content
            </StatusTracker>,
        );
        const tracker = getStatusTracker();
        expect(tracker).toHaveClass("custom-class");
        expect(tracker).toHaveAttribute("id", "tracker-id");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <StatusTracker type={EStatusTrackerType.WAITING} ref={ref} data-testid="status-tracker">
                Content
            </StatusTracker>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should render composition: Media, Header, Body, Footer", () => {
        render(
            <StatusTracker type={EStatusTrackerType.WAITING} data-testid="status-tracker">
                <StatusTracker.Media>
                    <div data-testid="media">Media</div>
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <div data-testid="header">Header</div>
                </StatusTracker.Header>
                <StatusTracker.Body>
                    <div data-testid="body">Body</div>
                </StatusTracker.Body>
                <StatusTracker.Footer>
                    <div data-testid="footer">Footer</div>
                </StatusTracker.Footer>
            </StatusTracker>,
        );
        expect(screen.getByTestId("media")).toBeInTheDocument();
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("body")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});

describe("StatusTrackerMedia", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerMedia data-testid="media">
                <div>Icon</div>
            </StatusTrackerMedia>,
        );
        const media = screen.getByTestId("media");
        expect(media).toBeInTheDocument();
        expect(media).toHaveClass("statusTrackerChild");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerMedia className="custom-class" id="media-id" data-testid="media">
                Icon
            </StatusTrackerMedia>,
        );
        const media = screen.getByTestId("media");
        expect(media).toHaveClass("custom-class");
        expect(media).toHaveAttribute("id", "media-id");
    });
});

describe("StatusTrackerHeader", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerHeader data-testid="header">
                <div>Header Content</div>
            </StatusTrackerHeader>,
        );
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass("statusTrackerChild");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerHeader className="custom-class" id="header-id" data-testid="header">
                Header
            </StatusTrackerHeader>,
        );
        const header = screen.getByTestId("header");
        expect(header).toHaveClass("custom-class");
        expect(header).toHaveAttribute("id", "header-id");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <StatusTrackerHeader ref={ref} data-testid="header">
                Header
            </StatusTrackerHeader>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should render composition: Title, Sum, Description", () => {
        render(
            <StatusTrackerHeader>
                <StatusTrackerHeader.Title data-testid="title">Title</StatusTrackerHeader.Title>
                <StatusTrackerHeader.Sum amountProps={{ value: "1000", currency: "₽" }} data-testid="sum" />
                <StatusTrackerHeader.Description data-testid="description">Description</StatusTrackerHeader.Description>
            </StatusTrackerHeader>,
        );
        expect(screen.getByTestId("title")).toBeInTheDocument();
        expect(screen.getAllByTestId("sum")[0]).toBeInTheDocument();
        expect(screen.getByTestId("description")).toBeInTheDocument();
    });
});

describe("StatusTrackerTitle", () => {
    it("Should render correctly", () => {
        render(<StatusTrackerTitle data-testid="title">Test Title</StatusTrackerTitle>);
        const title = screen.getByTestId("title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("statusTrackerTitle");
        expect(title).toHaveTextContent("Test Title");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerTitle className="custom-class" id="title-id" data-testid="title">
                Title
            </StatusTrackerTitle>,
        );
        const title = screen.getByTestId("title");
        expect(title).toHaveClass("custom-class");
        expect(title).toHaveAttribute("id", "title-id");
    });
});

describe("StatusTrackerSum", () => {
    it("Should render correctly with amount", () => {
        render(<StatusTrackerSum amountProps={{ value: "1000", currency: "₽" }} data-testid="sum" />);
        const sums = screen.getAllByTestId("sum");
        const sum = sums[0]; // Get the outer Title element
        expect(sum).toBeInTheDocument();
        expect(sum).toHaveClass("statusTrackerSum");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerSum
                amountProps={{ value: "1000", currency: "₽" }}
                className="custom-class"
                id="sum-id"
                data-testid="sum"
            />,
        );
        const sums = screen.getAllByTestId("sum");
        const sum = sums[0]; // Get the outer Title element
        expect(sum).toHaveClass("custom-class");
        expect(sum).toHaveAttribute("id", "sum-id");
    });
});

describe("StatusTrackerDescription", () => {
    it("Should render correctly", () => {
        render(<StatusTrackerDescription data-testid="description">Test Description</StatusTrackerDescription>);
        const description = screen.getByTestId("description");
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("statusTrackerDescription");
        expect(description).toHaveTextContent("Test Description");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerDescription className="custom-class" id="desc-id" data-testid="description">
                Description
            </StatusTrackerDescription>,
        );
        const description = screen.getByTestId("description");
        expect(description).toHaveClass("custom-class");
        expect(description).toHaveAttribute("id", "desc-id");
    });
});

describe("StatusTrackerBody", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerBody data-testid="body">
                <div>Body Content</div>
            </StatusTrackerBody>,
        );
        const body = screen.getByTestId("body");
        expect(body).toBeInTheDocument();
        expect(body).toHaveClass("statusTrackerChild");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerBody className="custom-class" id="body-id" data-testid="body">
                Body
            </StatusTrackerBody>,
        );
        const body = screen.getByTestId("body");
        expect(body).toHaveClass("custom-class");
        expect(body).toHaveAttribute("id", "body-id");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <StatusTrackerBody ref={ref} data-testid="body">
                Body
            </StatusTrackerBody>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should render composition: Alert, Status", () => {
        render(
            <StatusTrackerBody>
                <StatusTrackerBody.Alert type={EAlertType.INFO} data-testid="alert">
                    Alert message
                </StatusTrackerBody.Alert>
                <StatusTrackerBody.Status status={EMarkerStatus.SUCCESS} data-testid="status">
                    Status
                </StatusTrackerBody.Status>
            </StatusTrackerBody>,
        );
        expect(screen.getByTestId("alert")).toBeInTheDocument();
        expect(screen.getByTestId("status")).toBeInTheDocument();
    });
});

describe("StatusTrackerAlert", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerAlert type={EAlertType.INFO} data-testid="alert">
                Alert message
            </StatusTrackerAlert>,
        );
        const alert = screen.getByTestId("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveClass("statusTrackerAlert");
        expect(alert).toHaveTextContent("Alert message");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerAlert type={EAlertType.WARNING} className="custom-class" id="alert-id" data-testid="alert">
                Alert
            </StatusTrackerAlert>,
        );
        const alert = screen.getByTestId("alert");
        expect(alert).toHaveClass("custom-class");
        expect(alert).toHaveAttribute("id", "alert-id");
    });
});

describe("StatusTrackerStatus", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerStatus status={EMarkerStatus.SUCCESS} data-testid="status">
                Status text
            </StatusTrackerStatus>,
        );
        const status = screen.getByTestId("status");
        expect(status).toBeInTheDocument();
        expect(status).toHaveClass("statusTrackerStatus");
        expect(status).toHaveTextContent("Status text");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerStatus
                status={EMarkerStatus.SUCCESS}
                className="custom-class"
                id="status-id"
                data-testid="status"
            >
                Status
            </StatusTrackerStatus>,
        );
        const status = screen.getByTestId("status");
        expect(status).toHaveClass("custom-class");
        expect(status).toHaveAttribute("id", "status-id");
    });

    it("Should pass status prop to MarkerStatus", () => {
        const { rerender } = render(
            <StatusTrackerStatus status={EMarkerStatus.SUCCESS} data-testid="status">
                Status
            </StatusTrackerStatus>,
        );
        const status = screen.getByTestId("status");
        expect(status).toHaveClass("success");

        rerender(
            <StatusTrackerStatus status={EMarkerStatus.ERROR} data-testid="status">
                Status
            </StatusTrackerStatus>,
        );
        expect(status).toHaveClass("error");

        rerender(
            <StatusTrackerStatus status={EMarkerStatus.WARNING} data-testid="status">
                Status
            </StatusTrackerStatus>,
        );
        expect(status).toHaveClass("warning");

        rerender(
            <StatusTrackerStatus status={EMarkerStatus.WAITING} data-testid="status">
                Status
            </StatusTrackerStatus>,
        );
        expect(status).toHaveClass("waiting");
    });

    it("Should pass size prop to MarkerStatus", () => {
        render(
            <StatusTrackerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG} data-testid="status">
                Status
            </StatusTrackerStatus>,
        );
        const status = screen.getByTestId("status");
        expect(status).toHaveClass("lg");
    });
});

describe("StatusTrackerFooter", () => {
    it("Should render correctly", () => {
        render(
            <StatusTrackerFooter data-testid="footer">
                <div>Footer Content</div>
            </StatusTrackerFooter>,
        );
        const footer = screen.getByTestId("footer");
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass("statusTrackerChild");
        expect(footer).toHaveClass("statusTrackerFooterWrapper");
    });

    it("Should merge custom className and pass through attributes", () => {
        render(
            <StatusTrackerFooter className="custom-class" id="footer-id" data-testid="footer">
                Footer
            </StatusTrackerFooter>,
        );
        const footer = screen.getByTestId("footer");
        expect(footer).toHaveClass("custom-class");
        expect(footer).toHaveAttribute("id", "footer-id");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <StatusTrackerFooter ref={ref} data-testid="footer">
                Footer
            </StatusTrackerFooter>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should render composition: Button, Description", () => {
        render(
            <StatusTrackerFooter>
                <StatusTrackerFooter.Button data-testid="button" size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Button
                </StatusTrackerFooter.Button>
                <StatusTrackerFooter.Description data-testid="description">Description</StatusTrackerFooter.Description>
            </StatusTrackerFooter>,
        );
        expect(screen.getByTestId("button")).toBeInTheDocument();
        expect(screen.getByTestId("description")).toBeInTheDocument();
    });
});

describe("StatusTrackerButton", () => {
    it("Should render correctly", () => {
        const buttonProps = {
            theme: EButtonTheme.GENERAL,
            size: EComponentSize.MD,
        } as IButtonGeneralProps;
        render(
            <StatusTrackerButton
                {...(buttonProps as unknown as React.ComponentProps<typeof StatusTrackerButton>)}
                data-testid="button"
            >
                Button text
            </StatusTrackerButton>,
        );
        const button = screen.getByTestId("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("statusTrackerButton");
        expect(button).toHaveTextContent("Button text");
    });

    it("Should merge custom className and pass through attributes", () => {
        const buttonProps = {
            theme: EButtonTheme.GENERAL,
            size: EComponentSize.MD,
        } as IButtonGeneralProps;
        render(
            <StatusTrackerButton
                {...(buttonProps as unknown as React.ComponentProps<typeof StatusTrackerButton>)}
                className="custom-class"
                id="button-id"
                data-testid="button"
            >
                Button
            </StatusTrackerButton>,
        );
        const button = screen.getByTestId("button");
        expect(button).toHaveClass("custom-class");
        expect(button).toHaveAttribute("id", "button-id");
    });

    it("Should pass Button props correctly", () => {
        const buttonProps = {
            theme: EButtonTheme.GENERAL,
            size: EComponentSize.MD,
            disabled: true,
        } as IButtonGeneralProps;
        render(
            <StatusTrackerButton
                {...(buttonProps as unknown as React.ComponentProps<typeof StatusTrackerButton>)}
                data-testid="button"
            >
                Disabled
            </StatusTrackerButton>,
        );
        const button = screen.getByTestId("button");
        expect(button).toBeDisabled();
    });
});
