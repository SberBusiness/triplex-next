import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tag } from "@sberbusiness/triplex-next/components/Tag";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

vi.mock("@sberbusiness/icons-next", () => ({
    CrossStrokeSrvIcon16: () => <span data-testid="cross-icon-16" />,
    CrossStrokeSrvIcon20: () => <span data-testid="cross-icon-20" />,
    CrossStrokeSrvIcon24: () => <span data-testid="cross-icon-24" />,
    EditStrokeSrvIcon16: () => <span data-testid="edit-icon-16" />,
    EditStrokeSrvIcon20: () => <span data-testid="edit-icon-20" />,
    EditStrokeSrvIcon24: () => <span data-testid="edit-icon-24" />,
}));

describe("Tag", () => {
    const defaultProps = {
        children: "Test Tag",
        size: EComponentSize.MD as const,
        id: "test-id",
    };

    it("renders correctly with basic props", () => {
        render(<Tag {...defaultProps} />);

        expect(screen.getByText("Test Tag")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders different sizes correctly", () => {
        const { rerender } = render(<Tag {...defaultProps} size={EComponentSize.SM} />);
        expect(screen.getByTestId("cross-icon-16")).toBeInTheDocument();

        rerender(<Tag {...defaultProps} size={EComponentSize.LG} />);
        expect(screen.getByTestId("cross-icon-24")).toBeInTheDocument();
    });

    it("handles remove button click", () => {
        const onRemove = vi.fn();
        render(<Tag {...defaultProps} onRemove={onRemove} />);

        fireEvent.click(screen.getByRole("button"));
        expect(onRemove).toHaveBeenCalledWith("test-id");
    });

    it("handles edit button click", () => {
        const onEdit = vi.fn();
        render(<Tag {...defaultProps} onEdit={onEdit} />);

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(onEdit).toHaveBeenCalledWith("test-id");
    });

    it("applies disabled state correctly", () => {
        render(<Tag {...defaultProps} disabled />);

        const buttons = screen.getAllByRole("button");
        buttons.forEach((button) => {
            expect(button).toBeDisabled();
        });
    });

    it("passes additional props to buttons", () => {
        const editButtonProps = { "data-testid": "edit-button", "aria-label": "edit tag" };
        const removeButtonProps = { "data-testid": "remove-button", "aria-label": "remove tag" };

        render(
            <Tag
                {...defaultProps}
                onEdit={vi.fn()}
                editButtonProps={editButtonProps}
                removeButtonProps={removeButtonProps}
            />,
        );

        expect(screen.getByTestId("edit-button")).toHaveAttribute("aria-label", "edit tag");
        expect(screen.getByTestId("remove-button")).toHaveAttribute("aria-label", "remove tag");
    });

    it("forwards ref correctly", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<Tag {...defaultProps} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies custom className", () => {
        const { container } = render(<Tag {...defaultProps} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("does not render edit button when onEdit is not provided", () => {
        render(<Tag {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(1);
    });

    it("handles button event callbacks correctly", () => {
        const onRemove = vi.fn();
        const onEdit = vi.fn();
        const handleRemoveClick = vi.fn();
        const handleEditClick = vi.fn();

        render(
            <Tag
                {...defaultProps}
                onRemove={onRemove}
                onEdit={onEdit}
                removeButtonProps={{ onClick: handleRemoveClick }}
                editButtonProps={{ onClick: handleEditClick }}
            />,
        );

        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[0]);
        expect(onEdit).toHaveBeenCalledWith("test-id");
        expect(handleEditClick).toHaveBeenCalled();

        fireEvent.click(buttons[1]);
        expect(onRemove).toHaveBeenCalledWith("test-id");
        expect(handleRemoveClick).toHaveBeenCalled();
    });

    it("renders correct icons for each size", () => {
        const { rerender } = render(<Tag {...defaultProps} size={EComponentSize.SM} onEdit={vi.fn()} />);
        expect(screen.getByTestId("edit-icon-16")).toBeInTheDocument();
        expect(screen.getByTestId("cross-icon-16")).toBeInTheDocument();

        rerender(<Tag {...defaultProps} size={EComponentSize.MD} onEdit={vi.fn()} />);
        expect(screen.getByTestId("edit-icon-20")).toBeInTheDocument();
        expect(screen.getByTestId("cross-icon-20")).toBeInTheDocument();

        rerender(<Tag {...defaultProps} size={EComponentSize.LG} onEdit={vi.fn()} />);
        expect(screen.getByTestId("edit-icon-24")).toBeInTheDocument();
        expect(screen.getByTestId("cross-icon-24")).toBeInTheDocument();
    });
});
