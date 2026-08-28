import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../Footer";
import { FooterDescription } from "../components/FooterDescription";

const getRoot = () => screen.getByTestId("footer");

describe("Footer", () => {
    describe("Рендер и проброс props", () => {
        it("Should render children inside the root element", () => {
            render(<Footer data-testid="footer">Content</Footer>);

            expect(getRoot()).toBeInTheDocument();
            expect(screen.getByText("Content")).toBeInTheDocument();
        });

        it("Should render root as div without own class", () => {
            render(<Footer data-testid="footer" />);

            const root = getRoot();
            expect(root.tagName).toBe("DIV");
            expect(root).not.toHaveAttribute("class");
        });

        it("Should pass custom className to the root element", () => {
            render(<Footer className="custom-class" data-testid="footer" />);

            expect(getRoot()).toHaveClass("custom-class");
        });

        it("Should spread rest props on the root element", () => {
            render(<Footer id="footer-id" role="contentinfo" aria-label="Footer" data-testid="footer" />);

            const root = getRoot();
            expect(root).toHaveAttribute("id", "footer-id");
            expect(root).toHaveAttribute("role", "contentinfo");
            expect(root).toHaveAttribute("aria-label", "Footer");
        });

        it("Should set data-tx attribute and not let rest props override it", () => {
            render(<Footer data-testid="footer" data-tx="overridden" />);

            const root = getRoot();
            expect(root).not.toHaveAttribute("data-tx", "overridden");
            expect(root).toHaveAttribute("data-tx", process.env.npm_package_version);
        });

        it("Should forward object ref to the root div", () => {
            const ref = React.createRef<HTMLDivElement>();

            render(<Footer ref={ref} data-testid="footer" />);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(getRoot());
        });

        it("Should forward callback ref to the root div", () => {
            const ref = vi.fn();

            render(<Footer ref={ref} data-testid="footer" />);

            expect(ref).toHaveBeenCalledWith(getRoot());
        });
    });

    describe("Составной компонент", () => {
        it("Should expose FooterDescription as static Description", () => {
            expect(Footer.Description).toBe(FooterDescription);
        });

        it("Should render composed structure", () => {
            render(
                <Footer data-testid="footer">
                    <Footer.Description data-testid="description">
                        <Footer.Description.Content data-testid="content">Description</Footer.Description.Content>
                        <Footer.Description.Controls data-testid="controls">
                            <button type="button">Save</button>
                        </Footer.Description.Controls>
                    </Footer.Description>
                </Footer>,
            );

            expect(screen.getByTestId("description")).toHaveClass("footerDescription");
            expect(screen.getByTestId("content")).toHaveClass("footerDescriptionContent");
            expect(screen.getByTestId("controls")).toHaveClass("footerDescriptionControls");
            expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
        });

        it("Should set displayName", () => {
            expect(Footer.displayName).toBe("Footer");
        });
    });
});
