import React from "react";
import { render, screen } from "@testing-library/react";
import { FormGroup } from "../FormGroup";

describe("FormGroup", () => {
    it("renders children directly in the root element without extra wrappers", () => {
        render(
            <FormGroup data-testid="form-group">
                <div data-testid="field">field</div>
                <div data-testid="description">description</div>
            </FormGroup>,
        );

        const root = screen.getByTestId("form-group");

        expect(root.tagName).toBe("DIV");
        expect(root.children).toHaveLength(2);
        expect(root.firstElementChild).toBe(screen.getByTestId("field"));
        expect(root.lastElementChild).toBe(screen.getByTestId("description"));
    });

    it("renders without children", () => {
        render(<FormGroup data-testid="form-group" />);

        expect(screen.getByTestId("form-group")).toBeEmptyDOMElement();
    });

    it("applies custom className to the root element", () => {
        render(<FormGroup className="custom" data-testid="form-group" />);

        expect(screen.getByTestId("form-group").getAttribute("class")).toBe("custom");
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<FormGroup ref={ref}>content</FormGroup>);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.textContent).toBe("content");
    });

    it("passes through arbitrary attributes and event handlers", () => {
        const onClick = vi.fn();

        render(<FormGroup aria-label="group" data-testid="form-group" id="group-id" onClick={onClick} role="group" />);

        const root = screen.getByTestId("form-group");

        expect(root).toHaveAttribute("id", "group-id");
        expect(root).toHaveAttribute("role", "group");
        expect(root).toHaveAttribute("aria-label", "group");

        root.click();

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ target: root }));
    });
});
