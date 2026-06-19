import React from "react";
import { render, screen } from "@testing-library/react";
import { FooterPage } from "../components/FooterPage";
import { EFooterPageType } from "../components/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("FooterPage", () => {
    it("type FIRST оборачивает контент в Island и пробрасывает size", () => {
        const { container } = render(
            <FooterPage type={EFooterPageType.FIRST} size={EComponentSize.LG}>
                content
            </FooterPage>,
        );

        // Island добавляет класс размера; Footer — внутренний.
        expect(screen.getByText("content")).toBeInTheDocument();
        const island = container.firstElementChild as HTMLElement;
        expect(island.className).toMatch(/island/i);
        expect(island.className).toMatch(/lg/i);
        expect(island).toHaveClass("footerPageTypeFirst");
    });

    it("type SECOND рендерит контент без обёртки Island", () => {
        const { container } = render(<FooterPage type={EFooterPageType.SECOND}>content</FooterPage>);

        const root = container.firstElementChild as HTMLElement;
        expect(root.className).not.toMatch(/island/i);
        expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("type FIRST + sticky добавляет класс sticky на корневой Island", () => {
        const { container } = render(
            <FooterPage type={EFooterPageType.FIRST} sticky>
                content
            </FooterPage>,
        );

        const island = container.firstElementChild as HTMLElement;
        expect(island).toHaveClass("sticky");
    });

    it("type FIRST без sticky не добавляет класс sticky", () => {
        const { container } = render(<FooterPage type={EFooterPageType.FIRST}>content</FooterPage>);

        const island = container.firstElementChild as HTMLElement;
        expect(island).not.toHaveClass("sticky");
    });

    it("мёрджит пользовательский className на корневой элемент (type FIRST)", () => {
        const { container } = render(
            <FooterPage type={EFooterPageType.FIRST} className="custom-class">
                content
            </FooterPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveClass("footerPageTypeFirst");
    });

    it("мёрджит пользовательский className на корневой элемент (type SECOND)", () => {
        const { container } = render(
            <FooterPage type={EFooterPageType.SECOND} className="custom-class">
                content
            </FooterPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("custom-class");
    });

    it("forwardRef указывает на корневой div (type FIRST → Island)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <FooterPage type={EFooterPageType.FIRST} ref={ref}>
                content
            </FooterPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).toMatch(/island/i);
    });

    it("forwardRef указывает на корневой div (type SECOND → Footer)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <FooterPage type={EFooterPageType.SECOND} ref={ref}>
                content
            </FooterPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).not.toMatch(/island/i);
    });

    it("экспортирует составные части Description (Content / Controls)", () => {
        expect(FooterPage.Description).toBeDefined();
        expect(FooterPage.Description.Content).toBeDefined();
        expect(FooterPage.Description.Controls).toBeDefined();
    });
});
