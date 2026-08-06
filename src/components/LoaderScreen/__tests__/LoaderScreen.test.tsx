import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { LoaderScreen, ILoaderScreenProps } from "../LoaderScreen";

const ROOT_TEST_ID = "loader-screen";

const renderLoaderScreen = (props: ILoaderScreenProps) =>
    render(<LoaderScreen data-testid={ROOT_TEST_ID} {...props} />);

const getRoot = () => screen.getByTestId(ROOT_TEST_ID);
const getLoader = () => screen.getByRole("status", { name: "loading" });

describe("LoaderScreen", () => {
    it("Should render LoaderSmall with default props", () => {
        render(<LoaderScreen type="small" />);

        const loader = getLoader();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("md");
    });

    it("Should render LoaderSmall in different sizes", () => {
        render(<LoaderScreen type="small" size={EComponentSize.SM} />);

        const loader = getLoader();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderSmall");
        expect(loader).toHaveClass("brand");
        expect(loader).toHaveClass("sm");
    });

    it.each([EComponentSize.SM, EComponentSize.MD, EComponentSize.LG])(
        "Should apply size class %s to LoaderSmall",
        (size) => {
            renderLoaderScreen({ type: "small", size });

            expect(getLoader()).toHaveClass(size);
        },
    );

    it("Should render LoaderMiddle", () => {
        render(<LoaderScreen type="middle" />);

        const loader = getLoader();
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass("loaderMiddle");
    });

    it("Should ignore size for type middle", () => {
        renderLoaderScreen({ type: "middle", size: EComponentSize.LG });

        const loader = getLoader();
        expect(loader).toHaveClass("loaderMiddle");
        expect(loader).not.toHaveClass("lg");
    });

    it("Should apply backdrop class matching the type", () => {
        const { unmount } = renderLoaderScreen({ type: "small" });

        expect(getRoot()).toHaveClass("loaderScreen", "loaderSmallBackdrop");
        expect(getRoot()).not.toHaveClass("loaderMiddleBackdrop");

        unmount();
        renderLoaderScreen({ type: "middle" });

        expect(getRoot()).toHaveClass("loaderScreen", "loaderMiddleBackdrop");
        expect(getRoot()).not.toHaveClass("loaderSmallBackdrop");
    });

    it("Should render description when provided", () => {
        render(<LoaderScreen type="middle" description="Loading data..." />);
        expect(screen.getByText("Loading data...")).toBeInTheDocument();
        expect(getLoader()).toBeInTheDocument();
    });

    it("Should render controls when provided", () => {
        render(<LoaderScreen type="middle" controls={<button type="button">Cancel</button>} />);
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });

    it("Should render description and controls together", () => {
        render(
            <LoaderScreen type="middle" description="Please wait" controls={<button type="button">Retry</button>} />,
        );
        expect(screen.getByText("Please wait")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("Should render neither description nor controls when they are not provided", () => {
        renderLoaderScreen({ type: "middle" });

        expect(getRoot()).toHaveTextContent("");
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("Should merge custom className with the base class", () => {
        renderLoaderScreen({ type: "small", className: "custom-class" });

        expect(getRoot()).toHaveClass("loaderScreen", "loaderSmallBackdrop", "custom-class");
    });

    it("Should spread rest props to the root element", async () => {
        const onClick = vi.fn();
        renderLoaderScreen({ type: "small", id: "loader-screen-id", "aria-busy": true, onClick });

        const root = getRoot();
        expect(root).toHaveAttribute("id", "loader-screen-id");
        expect(root).toHaveAttribute("aria-busy", "true");

        await userEvent.click(root);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should forward ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<LoaderScreen ref={ref} type="small" data-testid={ROOT_TEST_ID} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });
});
