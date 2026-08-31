import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Link } from "../Link";

const getLink = () => screen.getByRole("link");
const renderContentBefore = () => <span data-testid="before-content">B</span>;
const renderContentAfter = () => <span data-testid="after-content">A</span>;
/** Неразрывный блок "слово + контент", в который обёрнут элемент contentBefore/contentAfter. */
const getWordWithContent = (testId: string) => screen.getByTestId(testId).closest(".wordWithContent");

describe("Link", () => {
    it("Should render with default props", () => {
        render(<Link data-testid="link">Click me</Link>);
        const link = getLink();

        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("Click me");
        expect(link).toHaveAttribute("role", "link");
        expect(link).toHaveClass("link");
    });

    it("Should apply custom className and merge with default classes", () => {
        render(
            <Link className="custom-class" data-testid="link">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveClass("custom-class");
        expect(link).toHaveClass("link");
    });

    it("Should forward ref to anchor element", () => {
        const ref = React.createRef<HTMLAnchorElement>();
        render(<Link ref={ref}>Link text</Link>);

        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
        expect(ref.current).toBe(getLink());
    });

    it("Should spread rest props to anchor element", () => {
        render(
            <Link href="https://example.com" title="Example">
                Link text
            </Link>,
        );
        const link = getLink();

        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveAttribute("title", "Example");
    });

    it("Should call onClick with click event", () => {
        const onClick = vi.fn();
        render(<Link onClick={onClick}>Link text</Link>);
        getLink().click();

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    // onBlur и onMouseDown раньше изымались из props и вешались на <a> вручную. Теперь они
    // доезжают в составе ...rest — тесты фиксируют, что обработчики не потерялись.
    it("Should call onBlur with blur event", () => {
        const onBlur = vi.fn();
        render(<Link onBlur={onBlur}>Link text</Link>);
        fireEvent.blur(getLink());

        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: "blur" }));
    });

    it("Should call onMouseDown with mousedown event", () => {
        const onMouseDown = vi.fn();
        render(<Link onMouseDown={onMouseDown}>Link text</Link>);
        fireEvent.mouseDown(getLink());

        expect(onMouseDown).toHaveBeenCalledTimes(1);
        expect(onMouseDown).toHaveBeenCalledWith(expect.objectContaining({ type: "mousedown" }));
    });

    describe("rel", () => {
        it("Should set rel=noopener for target=_blank to prevent reverse tabnabbing", () => {
            render(<Link target="_blank">Link text</Link>);

            expect(getLink()).toHaveAttribute("rel", "noopener");
        });

        it("Should keep rel provided by consumer for target=_blank", () => {
            render(
                <Link target="_blank" rel="nofollow">
                    Link text
                </Link>,
            );

            expect(getLink()).toHaveAttribute("rel", "nofollow");
        });

        it("Should not set rel without target=_blank", () => {
            render(<Link href="https://example.com">Link text</Link>);

            expect(getLink()).not.toHaveAttribute("rel");
        });
    });

    describe("contentBefore / contentAfter", () => {
        it("Should render children as is when no additional content provided", () => {
            const { container } = render(<Link>Some link text</Link>);

            expect(getLink()).toHaveTextContent("Some link text");
            expect(container.querySelector(".wordWithContent")).toBeNull();
        });

        it("Should render contentAfter when provided", () => {
            const contentAfter = () => <span data-testid="after-content">Content after</span>;
            render(
                <Link contentAfter={contentAfter} data-testid="link">
                    Link text
                </Link>,
            );
            const link = getLink();

            expect(link).toHaveTextContent("Link text");
            expect(screen.getByTestId("after-content")).toBeInTheDocument();
            expect(screen.getByTestId("after-content")).toHaveTextContent("Content after");
        });

        it("Should render contentBefore when provided", () => {
            const contentBefore = () => <span data-testid="before-content">Content before</span>;
            render(
                <Link contentBefore={contentBefore} data-testid="link">
                    Link text
                </Link>,
            );
            const link = getLink();

            expect(link).toHaveTextContent("Link text");
            expect(screen.getByTestId("before-content")).toBeInTheDocument();
            expect(screen.getByTestId("before-content")).toHaveTextContent("Content before");
        });

        it("Should render contentBefore and contentAfter when provided", () => {
            const contentBefore = () => <span data-testid="before-content">Content before</span>;
            const contentAfter = () => <span data-testid="after-content">Content after</span>;
            render(
                <Link contentBefore={contentBefore} contentAfter={contentAfter} data-testid="link">
                    Link text
                </Link>,
            );
            const link = getLink();

            expect(link).toHaveTextContent("Link text");
            expect(screen.getByTestId("before-content")).toBeInTheDocument();
            expect(screen.getByTestId("before-content")).toHaveTextContent("Content before");
            expect(screen.getByTestId("after-content")).toBeInTheDocument();
            expect(screen.getByTestId("after-content")).toHaveTextContent("Content after");
        });

        it("Should render zero-width space before contentBefore for correct alignment", () => {
            render(<Link contentBefore={renderContentBefore}>Link text</Link>);

            expect(getLink().textContent).toContain("\u200B");
        });
    });

    describe("string children: gluing content to words", () => {
        it("Should keep single word with both contents in one non-breaking block", () => {
            const { container } = render(
                <Link contentBefore={renderContentBefore} contentAfter={renderContentAfter}>
                    Word
                </Link>,
            );
            const wordWithContent = getWordWithContent("before-content");

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(1);
            expect(wordWithContent).toBe(getWordWithContent("after-content"));
            expect(wordWithContent).toHaveClass("before", "after");
            expect(wordWithContent).toHaveTextContent("Word");
        });

        it("Should keep two words with both contents in one non-breaking block", () => {
            const { container } = render(
                <Link contentBefore={renderContentBefore} contentAfter={renderContentAfter}>
                    One Two
                </Link>,
            );

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(1);
            expect(getWordWithContent("before-content")).toHaveTextContent("One Two");
            // Ключевое: оба контента внутри одного блока — ради этого в isSingleBlock живёт второе условие.
            expect(getWordWithContent("after-content")).toBe(getWordWithContent("before-content"));
        });

        it("Should glue contentBefore to first word and contentAfter to last word for three words", () => {
            const { container } = render(
                <Link contentBefore={renderContentBefore} contentAfter={renderContentAfter}>
                    One Two Three
                </Link>,
            );
            const firstWord = getWordWithContent("before-content");
            const lastWord = getWordWithContent("after-content");

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(2);
            expect(firstWord).not.toBe(lastWord);
            expect(firstWord).toHaveClass("before");
            expect(firstWord).not.toHaveClass("after");
            expect(firstWord).toHaveTextContent(/^\u200BBOne$/);
            expect(lastWord).toHaveClass("after");
            expect(lastWord).not.toHaveClass("before");
            expect(lastWord).toHaveTextContent(/^ThreeA$/);
            expect(getLink()).toHaveTextContent("One Two Three");
        });

        it("Should glue only first word when contentAfter is not provided", () => {
            const { container } = render(<Link contentBefore={renderContentBefore}>One Two Three</Link>);
            const firstWord = getWordWithContent("before-content");

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(1);
            expect(firstWord).toHaveClass("before");
            expect(firstWord).toHaveTextContent(/^\u200BBOne$/);
            expect(getLink()).toHaveTextContent("One Two Three");
        });

        it("Should glue only last word when contentBefore is not provided", () => {
            const { container } = render(<Link contentAfter={renderContentAfter}>One Two Three</Link>);
            const lastWord = getWordWithContent("after-content");

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(1);
            expect(lastWord).toHaveClass("after");
            expect(lastWord).toHaveTextContent(/^ThreeA$/);
            expect(getLink()).toHaveTextContent("One Two Three");
        });

        it("Should render two words with single content as separate first and last word", () => {
            const { container } = render(<Link contentBefore={renderContentBefore}>One Two</Link>);

            expect(container.querySelectorAll(".wordWithContent")).toHaveLength(1);
            expect(getWordWithContent("before-content")).toHaveTextContent(/^\u200BBOne$/);
            // \u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0441\u043B\u043E\u0432\u043E \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432\u043D\u0435 \u0441\u043A\u043B\u0435\u0435\u043D\u043D\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430.
            expect(getWordWithContent("before-content")).not.toHaveTextContent("Two");
            expect(getLink()).toHaveTextContent("One Two");
        });
    });

    describe("ReactNode children", () => {
        it("Should render contents around node children without gluing to words", () => {
            const { container } = render(
                <Link contentBefore={renderContentBefore} contentAfter={renderContentAfter}>
                    <span data-testid="child">Node</span>
                </Link>,
            );

            expect(container.querySelector(".wordWithContent")).toBeNull();
            expect(screen.getByTestId("child")).toBeInTheDocument();
            expect(getLink().textContent).toBe("BNodeA");
        });
    });
});
