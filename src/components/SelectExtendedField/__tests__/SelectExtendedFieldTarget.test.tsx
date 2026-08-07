import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { SelectExtendedFieldTarget } from "../index";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { EFormFieldStatus } from "../../FormField/enums";

/** Имена svg-иконок каретки по размерам поля. */
const CARET_ICON_NAME_BY_SIZE = {
    [EComponentSize.SM]: "CaretdownStrokeSrvIcon16",
    [EComponentSize.MD]: "CaretdownStrokeSrvIcon20",
    [EComponentSize.LG]: "CaretdownStrokeSrvIcon24",
};

describe("SelectExtendedFieldTarget", () => {
    const mockSetOpened = vi.fn();
    const mockOnClick = vi.fn();
    const mockOnKeyDown = vi.fn();
    const mockOnClear = vi.fn();

    const renderTarget = (props: Partial<React.ComponentProps<typeof SelectExtendedFieldTarget>> = {}) =>
        render(
            <SelectExtendedFieldTarget
                fieldLabel="Заголовок поля"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
                {...props}
            />,
        );

    const getRoot = () => screen.getByTestId("target");

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render with required props", () => {
        const { container } = renderTarget();

        expect(getRoot()).toBeInTheDocument();
        expect(getRoot()).toHaveClass("selectExtendedFieldTarget");
        expect(screen.getByText("Заголовок поля")).toBeInTheDocument();
        // Размер по умолчанию — MD.
        expect(container.querySelector(`[name="${CARET_ICON_NAME_BY_SIZE[EComponentSize.MD]}"]`)).toBeInTheDocument();
    });

    it("Should apply custom className without dropping the base one", () => {
        renderTarget({ className: "custom-target-class" });

        expect(getRoot()).toHaveClass("selectExtendedFieldTarget", "custom-target-class");
    });

    it("Should apply opened state class", () => {
        const { rerender } = renderTarget();

        expect(getRoot()).not.toHaveClass("selectOpened");

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Заголовок поля"
                opened
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        expect(getRoot()).toHaveClass("selectOpened");
    });

    it("Should apply disabled state class", () => {
        renderTarget({ status: EFormFieldStatus.DISABLED });

        expect(getRoot()).toHaveClass("disabled");
    });

    it("Should render loader instead of caret when loading", () => {
        const { container } = renderTarget({ loading: true });

        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(container.querySelector('[name^="CaretdownStrokeSrvIcon"]')).not.toBeInTheDocument();
    });

    it("Should not reference CSS classes missing from the LESS module", () => {
        // Регресс: clsx получал ключи styles.loading / styles.placeholder / styles.label,
        // которых нет в SelectExtendedFieldTarget.module.less. В сборке такой ключ равен
        // undefined, и в атрибут class попадал литерал "undefined". В тестах CSS-модуль
        // подменяется прокси, возвращающей имя свойства, поэтому мёртвая ссылка проявляется
        // как лишний класс с этим именем — его и проверяем.
        const { container } = renderTarget({ loading: true, label: "Выбранное значение" });

        expect(getRoot()).not.toHaveClass("loading");
        expect(getRoot()).not.toHaveClass("undefined");
        expect(container.querySelector(".label, .placeholder, .undefined")).not.toBeInTheDocument();
    });

    it("Should render label as the field value", () => {
        renderTarget({ label: "Выбранное значение" });

        expect(screen.getByText("Выбранное значение")).toBeInTheDocument();
    });

    it("Should render placeholder when there is no label", () => {
        renderTarget({ placeholder: "Выберите значение" });

        expect(screen.getByText("Выберите значение")).toBeInTheDocument();
    });

    it("Should not render placeholder when label is set", () => {
        renderTarget({ label: "Выбранное значение", placeholder: "Выберите значение" });

        expect(screen.getByText("Выбранное значение")).toBeInTheDocument();
        expect(screen.queryByText("Выберите значение")).not.toBeInTheDocument();
    });

    it.each([EComponentSize.SM, EComponentSize.MD, EComponentSize.LG])(
        "Should render caret icon for size %s",
        (size) => {
            const { container } = renderTarget({ size });

            expect(container.querySelector(`[name="${CARET_ICON_NAME_BY_SIZE[size]}"]`)).toBeInTheDocument();
        },
    );

    it("Should open dropdown on click", () => {
        renderTarget({ onClick: mockOnClick });

        fireEvent.click(getRoot());

        expect(mockSetOpened).toHaveBeenCalledWith(true);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("Should close opened dropdown on click", () => {
        renderTarget({ opened: true });

        fireEvent.click(getRoot());

        expect(mockSetOpened).toHaveBeenCalledWith(false);
    });

    it("Should not respond to clicks when loading", () => {
        renderTarget({ loading: true, onClick: mockOnClick });

        fireEvent.click(getRoot());

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("Should not respond to clicks when disabled", () => {
        renderTarget({ status: EFormFieldStatus.DISABLED, onClick: mockOnClick });

        fireEvent.click(getRoot());

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it.each([
        ["Space", EVENT_KEY_CODES.SPACE],
        ["Enter", EVENT_KEY_CODES.ENTER],
        ["ArrowDown", EVENT_KEY_CODES.ARROW_DOWN],
        ["ArrowUp", EVENT_KEY_CODES.ARROW_UP],
    ])("Should open dropdown on %s key", (_name, keyCode) => {
        renderTarget({ onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getRoot(), { keyCode });

        expect(mockSetOpened).toHaveBeenCalledWith(true);
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should not reopen dropdown by keyboard when it is already opened", () => {
        renderTarget({ opened: true, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getRoot(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should not respond to keyboard events when loading", () => {
        renderTarget({ loading: true, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getRoot(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not respond to keyboard events when disabled", () => {
        renderTarget({ status: EFormFieldStatus.DISABLED, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getRoot(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not open dropdown on unrelated key", () => {
        renderTarget({ onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getRoot(), { keyCode: EVENT_KEY_CODES.X });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should prevent default scrolling on the keys that open the dropdown", () => {
        renderTarget();

        const prevented = !fireEvent.keyDown(getRoot(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(prevented).toBe(true);
    });

    it("Should apply correct ARIA attributes", () => {
        const { rerender } = renderTarget({ opened: true });

        expect(getRoot()).toHaveAttribute("aria-expanded", "true");
        expect(getRoot()).toHaveAttribute("aria-haspopup", "listbox");

        rerender(
            <SelectExtendedFieldTarget
                fieldLabel="Заголовок поля"
                opened={false}
                setOpened={mockSetOpened}
                data-testid="target"
            />,
        );

        expect(getRoot()).toHaveAttribute("aria-expanded", "false");
    });

    it("Should forward ref to the value element", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderTarget({ ref, label: "Выбранное значение" });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formFieldTarget", "target");
        expect(ref.current).toHaveTextContent("Выбранное значение");
    });

    it("Should render clear button and call onClear", () => {
        renderTarget({ onClear: mockOnClear, label: "Выбранное значение" });

        fireEvent.click(screen.getByRole("button"));

        expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it("Should not render clear button without onClear", () => {
        renderTarget({ label: "Выбранное значение" });

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("Should render prefix and postfix", () => {
        renderTarget({
            prefix: <span data-testid="custom-prefix" />,
            postfix: <span data-testid="custom-postfix" />,
        });

        expect(screen.getByTestId("custom-prefix")).toBeInTheDocument();
        expect(screen.getByTestId("custom-postfix")).toBeInTheDocument();
    });

    it("Should pass through data attributes", () => {
        renderTarget({ "data-custom": "target-value" } as Partial<
            React.ComponentProps<typeof SelectExtendedFieldTarget>
        >);

        expect(getRoot()).toHaveAttribute("data-custom", "target-value");
        expect(getRoot()).toHaveAttribute("data-tx");
    });
});
