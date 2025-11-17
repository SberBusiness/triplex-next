import React from "react";
import { render, screen } from "@testing-library/react";
import { TagGroup } from "@sberbusiness/triplex-next/components/TagGroup/TagGroup";
import { Tag, ITagProps } from "@sberbusiness/triplex-next/components/Tag";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

vi.mock("@sberbusiness/triplex-next/components/Tag/Tag", () => ({
    Tag: (props: ITagProps) => <span data-testid="tag" {...props} />,
}));

describe("TagGroup", () => {
    const renderWithTags = (size: EComponentSize = EComponentSize.MD) => (
        <TagGroup size={size}>
            <Tag id="tag-1" size={size}>
                Tag 1
            </Tag>
            <Tag id="tag-2" size={size}>
                Tag 2
            </Tag>
            <Tag id="tag-3" size={size}>
                Tag 3
            </Tag>
        </TagGroup>
    );

    it("renders correctly with multiple tags", () => {
        render(renderWithTags());

        const tags = screen.getAllByTestId("tag");
        expect(tags).toHaveLength(3);
        expect(tags[0]).toHaveTextContent("Tag 1");
        expect(tags[1]).toHaveTextContent("Tag 2");
        expect(tags[2]).toHaveTextContent("Tag 3");
    });

    it("applies correct role attribute", () => {
        render(renderWithTags());

        expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("applies size classes correctly", () => {
        const { rerender } = render(renderWithTags(EComponentSize.SM));
        let group = screen.getByRole("group");

        expect(group).toHaveClass("sm");

        rerender(renderWithTags(EComponentSize.MD));
        group = screen.getByRole("group");
        expect(group).toHaveClass("md");

        rerender(renderWithTags(EComponentSize.LG));
        group = screen.getByRole("group");
        expect(group).toHaveClass("lg");
    });

    it("passes additional props to the div element", () => {
        render(<TagGroup id="test-id" aria-label="test-label" size={EComponentSize.MD} />);

        const group = screen.getByRole("group");
        expect(group).toHaveAttribute("id", "test-id");
        expect(group).toHaveAttribute("aria-label", "test-label");
    });

    it("applies custom className", () => {
        render(<TagGroup className="custom-class" size={EComponentSize.MD} />);

        const group = screen.getByRole("group");
        expect(group).toHaveClass("custom-class");
        expect(group).toHaveClass("tagGroup");
    });

    it("forwards ref correctly", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TagGroup size={EComponentSize.MD} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("group"));
    });
});
