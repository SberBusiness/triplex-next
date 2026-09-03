import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MultiselectField } from "../MultiselectField";
import { MultiselectFieldDropdown } from "../components/MultiselectFieldDropdown";
import { SelectExtendedFieldTarget } from "../../SelectExtendedField";
import { EComponentSize } from "../../../enums/EComponentSize";

describe("MultiselectField", () => {
    const mockRenderTarget = vi.fn();
    const mockRenderDropdown = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockRenderTarget.mockReturnValue(<div data-testid="target">Target</div>);
        mockRenderDropdown.mockReturnValue(<div data-testid="dropdown">Dropdown</div>);
    });

    it("Should render with default props", () => {
        render(
            <MultiselectField renderTarget={mockRenderTarget} data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(screen.getByTestId("multiselect-field")).toBeInTheDocument();
        expect(screen.getByTestId("target")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    });

    it("Should pass open state and setter to both render functions", () => {
        render(<MultiselectField renderTarget={mockRenderTarget}>{mockRenderDropdown}</MultiselectField>);

        expect(mockRenderTarget).toHaveBeenCalledWith({
            opened: false,
            setOpened: expect.any(Function),
        });
        expect(mockRenderDropdown).toHaveBeenCalledWith({
            opened: false,
            setOpened: expect.any(Function),
            targetRef: expect.any(Object),
            dropdownRef: expect.any(Object),
        });
    });

    it("Should apply custom className to the root element", () => {
        render(
            <MultiselectField renderTarget={mockRenderTarget} className="custom-class" data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(screen.getByTestId("multiselect-field")).toHaveClass("custom-class");
    });

    it("Should forward ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <MultiselectField renderTarget={mockRenderTarget} ref={ref} data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("multiselect-field"));
    });

    it("Should pass through unknown html attributes to the root element", () => {
        render(
            <MultiselectField renderTarget={mockRenderTarget} id="multiselect-id" data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(screen.getByTestId("multiselect-field")).toHaveAttribute("id", "multiselect-id");
    });

    it("Should call onMouseDown with the original event", () => {
        const onMouseDown = vi.fn();

        render(
            <MultiselectField renderTarget={mockRenderTarget} onMouseDown={onMouseDown} data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        fireEvent.mouseDown(screen.getByTestId("multiselect-field"));

        expect(onMouseDown).toHaveBeenCalledTimes(1);
        expect(onMouseDown).toHaveBeenCalledWith(expect.objectContaining({ type: "mousedown" }));
    });

    it("Should not fail on mouse down when onMouseDown is not passed", () => {
        render(
            <MultiselectField renderTarget={mockRenderTarget} data-testid="multiselect-field">
                {mockRenderDropdown}
            </MultiselectField>,
        );

        expect(() => fireEvent.mouseDown(screen.getByTestId("multiselect-field"))).not.toThrow();
    });

    describe("size", () => {
        const renderWithContent = (size?: EComponentSize) =>
            render(
                <MultiselectField renderTarget={mockRenderTarget} size={size}>
                    {() => (
                        <MultiselectField.Dropdown.Content data-testid="content">
                            Content
                        </MultiselectField.Dropdown.Content>
                    )}
                </MultiselectField>,
            );

        it("Should share MD size with dropdown parts by default", () => {
            renderWithContent();

            expect(screen.getByTestId("content")).toHaveClass("md");
        });

        // Здесь проверяется только то, что MultiselectField кладёт свой size в контекст
        // и части его видят. Полный перебор размеров — в тестах Content, где живёт
        // соответствие «размер → класс».
        it("Should share the passed size with dropdown parts", () => {
            renderWithContent(EComponentSize.SM);

            expect(screen.getByTestId("content")).toHaveClass("sm");
        });
    });

    it("Should expose Target and Dropdown as static properties", () => {
        expect(MultiselectField.Target).toBe(SelectExtendedFieldTarget);
        expect(MultiselectField.Dropdown).toBe(MultiselectFieldDropdown);
    });

    it("Should have displayName", () => {
        expect(MultiselectField.displayName).toBe("MultiselectField");
    });
});
