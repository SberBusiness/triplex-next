import React from "react";
import { render, screen } from "@testing-library/react";
import { BodyPage } from "../components/BodyPage";
import { EBodyPageType, EBodyPageVerticalMargin } from "../components/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("BodyPage", () => {
    it("type FIRST оборачивает контент в Island и пробрасывает size", () => {
        const { container } = render(
            <BodyPage type={EBodyPageType.FIRST} size={EComponentSize.LG}>
                content
            </BodyPage>,
        );

        // Island добавляет класс размера; Body — внутренний.
        expect(screen.getByText("content")).toBeInTheDocument();
        const island = container.firstElementChild as HTMLElement;
        expect(island.className).toMatch(/island/i);
        expect(island.className).toMatch(/lg/i);
    });

    it("type SECOND рендерит контент без обёртки Island", () => {
        const { container } = render(<BodyPage type={EBodyPageType.SECOND}>content</BodyPage>);

        const root = container.firstElementChild as HTMLElement;
        expect(root.className).not.toMatch(/island/i);
        expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("verticalMargin по умолчанию LARGE → класс отступа 24px", () => {
        const { container } = render(<BodyPage type={EBodyPageType.SECOND}>content</BodyPage>);

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("verticalMargin24");
    });

    it("verticalMargin SMALL → класс отступа 16px", () => {
        const { container } = render(
            <BodyPage type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                content
            </BodyPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("verticalMargin16");
    });

    it("мёрджит пользовательский className на корневой элемент", () => {
        const { container } = render(
            <BodyPage type={EBodyPageType.SECOND} className="custom-class">
                content
            </BodyPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveClass("bodyPage");
    });

    it("forwardRef указывает на корневой div (type FIRST → Island)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <BodyPage type={EBodyPageType.FIRST} ref={ref}>
                content
            </BodyPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).toMatch(/island/i);
    });

    it("forwardRef указывает на корневой div (type SECOND → Body)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <BodyPage type={EBodyPageType.SECOND} ref={ref}>
                content
            </BodyPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).not.toMatch(/island/i);
    });
});
