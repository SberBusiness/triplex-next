import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeaderPage } from "../components/HeaderPage";
import { EHeaderPageType } from "../components/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("HeaderPage", () => {
    it("type FIRST оборачивает контент в Island и пробрасывает size", () => {
        const { container } = render(
            <HeaderPage type={EHeaderPageType.FIRST} size={EComponentSize.LG}>
                content
            </HeaderPage>,
        );

        // Island добавляет класс размера; Header — внутренний.
        expect(screen.getByText("content")).toBeInTheDocument();
        const island = container.firstElementChild as HTMLElement;
        expect(island.className).toMatch(/island/i);
        expect(island.className).toMatch(/lg/i);
        expect(island).toHaveClass("headerPageTypeFirst");
    });

    it("type SECOND рендерит контент без обёртки Island", () => {
        const { container } = render(<HeaderPage type={EHeaderPageType.SECOND}>content</HeaderPage>);

        const root = container.firstElementChild as HTMLElement;
        expect(root.className).not.toMatch(/island/i);
        expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("type FIRST + sticky добавляет класс sticky на корневой Island", () => {
        const { container } = render(
            <HeaderPage type={EHeaderPageType.FIRST} sticky>
                content
            </HeaderPage>,
        );

        const island = container.firstElementChild as HTMLElement;
        expect(island).toHaveClass("sticky");
    });

    it("type FIRST без sticky не добавляет класс sticky", () => {
        const { container } = render(<HeaderPage type={EHeaderPageType.FIRST}>content</HeaderPage>);

        const island = container.firstElementChild as HTMLElement;
        expect(island).not.toHaveClass("sticky");
    });

    it("мёрджит пользовательский className на корневой элемент (type FIRST)", () => {
        const { container } = render(
            <HeaderPage type={EHeaderPageType.FIRST} className="custom-class">
                content
            </HeaderPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("custom-class");
        expect(root).toHaveClass("headerPageTypeFirst");
    });

    it("мёрджит пользовательский className на корневой элемент (type SECOND)", () => {
        const { container } = render(
            <HeaderPage type={EHeaderPageType.SECOND} className="custom-class">
                content
            </HeaderPage>,
        );

        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveClass("custom-class");
    });

    it("forwardRef указывает на корневой div (type FIRST → Island)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <HeaderPage type={EHeaderPageType.FIRST} ref={ref}>
                content
            </HeaderPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).toMatch(/island/i);
    });

    it("forwardRef указывает на корневой div (type SECOND → Header)", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <HeaderPage type={EHeaderPageType.SECOND} ref={ref}>
                content
            </HeaderPage>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.className).not.toMatch(/island/i);
    });

    it("экспортирует составные части (Title / Tabs / Subhead / LayoutSidebar)", () => {
        expect(HeaderPage.Title).toBeDefined();
        expect(HeaderPage.Tabs).toBeDefined();
        expect(HeaderPage.Subhead).toBeDefined();
        expect(HeaderPage.LayoutSidebar).toBeDefined();
    });
});
