import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ModalWindowClose } from "../components/ModalWindowClose";

afterEach(() => {
    cleanup();
});

describe("ModalWindowClose", () => {
    it("renders a button element", () => {
        render(<ModalWindowClose onClick={() => {}} />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("calls onClick when the button is clicked", () => {
        const onClick = vi.fn();

        render(<ModalWindowClose onClick={onClick} />);

        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("forwards title prop to the underlying button", () => {
        render(<ModalWindowClose onClick={() => {}} title="Custom title" />);

        expect(screen.getByRole("button")).toHaveAttribute("title", "Custom title");
    });
});
