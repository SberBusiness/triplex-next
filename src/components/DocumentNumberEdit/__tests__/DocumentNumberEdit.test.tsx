import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DocumentNumberEdit, IDocumentNumberEditProps } from "../DocumentNumberEdit";

describe("DocumentNumberEdit", () => {
    const labels = {
        buttonLabel: "Изменить",
        emptyNumberButtonLabel: "Задать номер",
        emptyNumberLabel: "Номер документа будет присвоен автоматически",
        numberLabel: "Документ №",
    } satisfies Partial<IDocumentNumberEditProps>;

    const renderComponent = (props: Partial<IDocumentNumberEditProps> = {}) =>
        render(<DocumentNumberEdit {...labels} {...props} />);

    /** Рендер контролируемого компонента: значение хранится в state, изменения фиксируются в changedValues. */
    const renderControlled = (props: Partial<IDocumentNumberEditProps> = {}, initialValue = "") => {
        const onChange = vi.fn();
        const changedValues: string[] = [];

        const Harness = () => {
            const [value, setValue] = React.useState(initialValue);

            return (
                <DocumentNumberEdit
                    {...labels}
                    {...props}
                    value={value}
                    onChange={(event) => {
                        changedValues.push(event.target.value);
                        setValue(event.target.value);
                        onChange(event);
                    }}
                />
            );
        };

        render(<Harness />);

        return { onChange, changedValues };
    };

    const getEditButton = () => screen.getByRole("link");
    const getInput = () => screen.getByRole<HTMLInputElement>("textbox");

    const startEditing = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.click(getEditButton());

        return getInput();
    };

    describe("режим просмотра", () => {
        it("показывает текст об отсутствии номера и кнопку «Задать номер», когда номер не задан", () => {
            renderComponent();

            expect(screen.getByText(labels.emptyNumberLabel)).toBeInTheDocument();
            expect(getEditButton()).toHaveTextContent(labels.emptyNumberButtonLabel);
        });

        it("показывает подпись с номером и кнопку «Изменить», когда номер задан", () => {
            renderComponent({ value: "123456", onChange: () => {} });

            expect(screen.getByText("Документ № 123456")).toBeInTheDocument();
            expect(getEditButton()).toHaveTextContent(labels.buttonLabel);
        });

        it("поддерживает числовой номер", () => {
            renderComponent({ value: 123456, onChange: () => {} });

            expect(screen.getByText("Документ № 123456")).toBeInTheDocument();
        });

        it("не рендерит поле ввода до клика по кнопке", () => {
            renderComponent();

            expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        });
    });

    describe("переход в режим редактирования", () => {
        it("показывает поле ввода и оставляет в подписи только numberLabel", async () => {
            const user = userEvent.setup();
            renderComponent({ value: "123456", onChange: () => {} });

            const input = await startEditing(user);

            expect(input).toBeInTheDocument();
            expect(input).toHaveValue("123456");
            expect(screen.getByText(labels.numberLabel)).toBeInTheDocument();
            expect(screen.queryByText("Документ № 123456")).not.toBeInTheDocument();
            expect(screen.queryByRole("link")).not.toBeInTheDocument();
        });

        it("автоматически ставит фокус в поле ввода", async () => {
            const user = userEvent.setup();
            renderComponent();

            expect(await startEditing(user)).toHaveFocus();
        });

        it("по умолчанию ограничивает ввод шестью символами и показывает плейсхолдер из нулей", async () => {
            const user = userEvent.setup();
            renderComponent();

            const input = await startEditing(user);

            expect(input).toHaveAttribute("maxlength", "6");
            expect(input).toHaveAttribute("placeholder", "000000");
        });

        it("строит плейсхолдер и maxlength по prop maxLength", async () => {
            const user = userEvent.setup();
            renderComponent({ maxLength: 3 });

            const input = await startEditing(user);

            expect(input).toHaveAttribute("maxlength", "3");
            expect(input).toHaveAttribute("placeholder", "000");
        });

        it("прокидывает остальные props в поле ввода", async () => {
            const user = userEvent.setup();
            renderComponent({ id: "document-number", "aria-label": "Номер документа" });

            const input = await startEditing(user);

            expect(input).toHaveAttribute("id", "document-number");
            expect(input).toHaveAccessibleName("Номер документа");
        });
    });

    describe("фильтрация значения", () => {
        it("отбрасывает нецифровые символы и передаёт в onChange уже отфильтрованное значение", async () => {
            const user = userEvent.setup();
            const { onChange, changedValues } = renderControlled();

            const input = await startEditing(user);
            await user.type(input, "1a2");

            expect(changedValues).toEqual(["1", "1", "12"]);
            expect(input).toHaveValue("12");
            expect(onChange).toHaveBeenCalledTimes(3);
            expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ type: "change", target: input }));
        });

        it("сохраняет позицию курсора, когда нецифровой символ вводится в середину номера", async () => {
            const user = userEvent.setup();
            const { changedValues } = renderControlled({}, "1234");

            const input = await startEditing(user);
            await user.type(input, "a", { initialSelectionStart: 2, initialSelectionEnd: 2 });

            expect(changedValues).toEqual(["1234"]);
            expect(input).toHaveValue("1234");
            // Введённый символ отброшен, поэтому курсор остаётся там, где он был, а не уезжает в конец значения.
            expect(input.selectionStart).toBe(2);
        });

        it("не пропускает значение, состоящее только из нецифровых символов", async () => {
            const user = userEvent.setup();
            const { changedValues } = renderControlled();

            const input = await startEditing(user);
            await user.type(input, "ab");

            expect(changedValues).toEqual(["", ""]);
            expect(input).toHaveValue("");
        });
    });

    describe("выход из режима редактирования", () => {
        it("завершает редактирование по Enter и вызывает onKeyDown", async () => {
            const user = userEvent.setup();
            const onKeyDown = vi.fn();
            renderComponent({ value: "123456", onChange: () => {}, onKeyDown });

            await startEditing(user);
            await user.keyboard("{Enter}");

            expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
            expect(getEditButton()).toHaveTextContent(labels.buttonLabel);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
            expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: "keydown", code: "Enter" }));
        });

        it("не завершает редактирование по другим клавишам", async () => {
            const user = userEvent.setup();
            const onKeyDown = vi.fn();
            renderControlled({ onKeyDown });

            const input = await startEditing(user);
            await user.keyboard("{Escape}");

            expect(input).toBeInTheDocument();
            expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: "keydown", code: "Escape" }));
        });

        it("завершает редактирование при потере фокуса и вызывает onBlur", async () => {
            const user = userEvent.setup();
            const onBlur = vi.fn();
            renderComponent({ onBlur });

            const input = await startEditing(user);
            await user.tab();

            expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
            expect(getEditButton()).toHaveTextContent(labels.emptyNumberButtonLabel);
            expect(onBlur).toHaveBeenCalledTimes(1);
            expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: "blur", target: input }));
        });
    });

    describe("корневой элемент", () => {
        it("мерджит className с собственным классом", () => {
            const { container } = renderComponent({ className: "custom-class" });

            expect(container.firstElementChild).toHaveClass("documentNumberEdit", "custom-class");
        });

        it("пробрасывает ref на корневой элемент", () => {
            const ref = React.createRef<HTMLDivElement>();

            render(<DocumentNumberEdit {...labels} ref={ref} />);

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toHaveClass("documentNumberEdit");
        });
    });
});
