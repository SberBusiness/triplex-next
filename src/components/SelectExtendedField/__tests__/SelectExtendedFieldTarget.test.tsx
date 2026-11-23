import React from "react";
import { createPortal } from "react-dom";
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

/** Props для renderTarget; в отличие от ISelectExtendedFieldTargetProps, включают ref. */
type TTargetProps = Partial<React.ComponentProps<typeof SelectExtendedFieldTarget>>;

/** Клавиши, открывающие выпадающий блок: [название, keyCode]. */
const OPEN_DROPDOWN_KEYS: Array<[string, number]> = [
    ["Space", EVENT_KEY_CODES.SPACE],
    ["Enter", EVENT_KEY_CODES.ENTER],
    ["ArrowDown", EVENT_KEY_CODES.ARROW_DOWN],
    ["ArrowUp", EVENT_KEY_CODES.ARROW_UP],
];

describe("SelectExtendedFieldTarget", () => {
    const mockSetOpened = vi.fn();
    const mockOnClick = vi.fn();
    const mockOnKeyDown = vi.fn();
    const mockOnClear = vi.fn();

    const renderTarget = (props: TTargetProps = {}) =>
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
    /** Фокусируемый элемент со значением: доступное имя поля принадлежит ему. */
    const getValueElement = () => screen.getByLabelText("Заголовок поля");

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should keep the accessible name of the field without using a label element", () => {
        const { container } = renderTarget();

        // Значение поля — div, поэтому лейбл рендерится тегом span, а имя даёт aria-labelledby.
        expect(container.querySelector("label")).toBeNull();
        // Доступное имя принадлежит фокусируемому элементу со значением, а не корню поля.
        expect(screen.getByLabelText("Заголовок поля")).toHaveAttribute("tabindex", "0");
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

    it.each(OPEN_DROPDOWN_KEYS)("Should open dropdown on %s key", (_name, keyCode) => {
        renderTarget({ onKeyDown: mockOnKeyDown });

        // keydown приходит от элемента в фокусе — элемента со значением.
        // user-event не выставляет keyCode, по которому поле распознаёт клавишу, поэтому fireEvent.
        fireEvent.keyDown(getValueElement(), { keyCode });

        expect(mockSetOpened).toHaveBeenCalledWith(true);
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should not reopen dropdown by keyboard when it is already opened", () => {
        renderTarget({ opened: true, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getValueElement(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should not respond to keyboard events when loading", () => {
        renderTarget({ loading: true, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getValueElement(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not respond to keyboard events when disabled", () => {
        renderTarget({ status: EFormFieldStatus.DISABLED, onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getValueElement(), { keyCode: EVENT_KEY_CODES.SPACE });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).not.toHaveBeenCalled();
    });

    it("Should not open dropdown on unrelated key", () => {
        renderTarget({ onKeyDown: mockOnKeyDown });

        fireEvent.keyDown(getValueElement(), { keyCode: EVENT_KEY_CODES.X });

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    });

    it("Should prevent default scrolling on the keys that open the dropdown", () => {
        renderTarget();

        const prevented = !fireEvent.keyDown(getValueElement(), { keyCode: EVENT_KEY_CODES.SPACE });

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

    it("Should call onClear with the click event without propagating it to onClick", () => {
        renderTarget({ onClear: mockOnClear, onClick: mockOnClick });

        const clearButton = screen.getByRole("button");
        fireEvent.click(clearButton);

        expect(mockOnClear).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ type: "click", target: clearButton }),
        );
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    describe.each<[string, TTargetProps]>([
        ["clear button", { onClear: mockOnClear }],
        ["postfix button", { postfix: <button type="button">Подсказка</button> }],
        // Так устроены теги в MultiselectField: кнопка удаления тега лежит внутри элемента со значением.
        ["button inside the value element", { label: <button type="button">Удалить</button> }],
    ])("Nested %s", (_place, props) => {
        it.each(OPEN_DROPDOWN_KEYS)("Should not intercept %s key", (_name, keyCode) => {
            renderTarget({ ...props, onKeyDown: mockOnKeyDown });

            const notPrevented = fireEvent.keyDown(screen.getByRole("button"), { keyCode });

            expect(notPrevented).toBe(true);
            expect(mockSetOpened).not.toHaveBeenCalled();
            expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
        });

        it("Should not toggle dropdown on click", () => {
            renderTarget(props);

            fireEvent.click(screen.getByRole("button"));

            expect(mockSetOpened).not.toHaveBeenCalled();
        });
    });

    it.each<[string, TTargetProps, () => Element]>([
        ["the value element", { label: "Выбранное значение" }, () => screen.getByText("Выбранное значение")],
        ["the field label", {}, () => screen.getByText("Заголовок поля")],
        // Каретка рендерится всегда, кроме состояния загрузки, — наличие проверяет тест "Should render caret icon".
        ["the caret icon", {}, () => document.querySelector(`[name="${CARET_ICON_NAME_BY_SIZE[EComponentSize.MD]}"]`)!],
        [
            "non-interactive postfix content",
            { postfix: <span data-testid="custom-postfix" /> },
            () => screen.getByTestId("custom-postfix"),
        ],
        [
            "postfix element with negative tabIndex",
            {
                postfix: (
                    <button type="button" tabIndex={-1}>
                        Подсказка
                    </button>
                ),
            },
            () => screen.getByRole("button"),
        ],
    ])("Should open dropdown on click at %s", (_place, props, getElement) => {
        renderTarget(props);

        fireEvent.click(getElement());

        expect(mockSetOpened).toHaveBeenCalledWith(true);
    });

    it("Should not toggle dropdown on click inside a focusable non-button postfix element", () => {
        renderTarget({
            onClick: mockOnClick,
            postfix: (
                <span role="button" tabIndex={0}>
                    <span data-testid="postfix-icon" />
                </span>
            ),
        });

        fireEvent.click(screen.getByTestId("postfix-icon"));

        expect(mockSetOpened).not.toHaveBeenCalled();
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("Should ignore events from postfix content rendered in a portal", () => {
        renderTarget({ postfix: createPortal(<div data-testid="portal-content" />, document.body) });

        const portalContent = screen.getByTestId("portal-content");
        fireEvent.keyDown(portalContent, { keyCode: EVENT_KEY_CODES.ENTER });
        fireEvent.click(portalContent);

        expect(mockSetOpened).not.toHaveBeenCalled();
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
        renderTarget({ "data-custom": "target-value" } as TTargetProps);

        expect(getRoot()).toHaveAttribute("data-custom", "target-value");
        expect(getRoot()).toHaveAttribute("data-tx");
    });
});
