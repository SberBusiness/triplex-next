import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EFormFieldStatus, FormField, FormFieldMaskedInput } from "@sberbusiness/triplex-next/components";
import { presets } from "../components/FormFieldMaskedInputPresets";

describe("FormFieldMaskedInput", () => {
    it("exposes mask presets as a static property", () => {
        expect(FormFieldMaskedInput.presets).toBe(presets);
        expect(FormFieldMaskedInput.presets.masks.date).toHaveLength(10);
        expect(FormFieldMaskedInput.presets.placeholderMasks.date).toBe("дд.мм.гггг");
    });

    it("applies the mask to the passed value", () => {
        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.date} value="12012024" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toHaveValue("12.01.2024");
    });

    it("applies the mask to a partially entered value", () => {
        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.date} value="1201" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toHaveValue("12.01.");
    });

    it("renders the remaining part of the placeholder mask as aria-hidden", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    placeholderMask={presets.placeholderMasks.date}
                    value="1201"
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        const placeholder = document.querySelector(".formFieldMaskedInputPlaceholder");

        expect(placeholder).toHaveAttribute("aria-hidden", "true");
        expect(placeholder).toHaveTextContent("12.01.гггг");
    });

    it("splits the placeholder mask into the entered and the remaining parts", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    placeholderMask={presets.placeholderMasks.date}
                    value="1201"
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        const [entered, remaining] = Array.from(
            document.querySelectorAll(".formFieldMaskedInputPlaceholder span"),
        ) as HTMLElement[];

        // Уже введённая часть скрыта прозрачным текстом — под ней находится реальное значение инпута.
        expect(entered).toHaveClass("transparentText");
        expect(entered).toHaveTextContent("12.01.");
        expect(remaining).toHaveTextContent("гггг");
    });

    it("uses placeholderChar for the remaining part without placeholderMask", () => {
        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.date} value="1201" onChange={vi.fn()} />
            </FormField>,
        );

        expect(document.querySelector(".formFieldMaskedInputPlaceholder")).toHaveTextContent("12.01.0000");
    });

    it("does not render the mask layer for an empty and unfocused field", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    placeholderMask={presets.placeholderMasks.date}
                    value=""
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        expect(document.querySelector(".formFieldMaskedInputPlaceholder")).toBeNull();
    });

    it("renders the mask layer for an empty field in focus", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    placeholderMask={presets.placeholderMasks.date}
                    value=""
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        fireEvent.focus(screen.getByRole("textbox"));

        expect(document.querySelector(".formFieldMaskedInputPlaceholder")).toHaveTextContent("дд.мм.гггг");
    });

    it("does not render the mask layer when the placeholder prop is shown", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    placeholderMask={presets.placeholderMasks.date}
                    placeholder="Дата"
                    value=""
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        fireEvent.focus(screen.getByRole("textbox"));

        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Дата");
        expect(document.querySelector(".formFieldMaskedInputPlaceholder")).toBeNull();
    });

    it("calls onChange with the masked value", () => {
        // Значение читается синхронно в обработчике: после ре-рендера в DOM возвращается неизменившийся value.
        const changedValues: string[] = [];
        const handleChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => {
            changedValues.push(event.target.value);
        });

        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.date} value="" onChange={handleChange} />
            </FormField>,
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "1201" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(changedValues).toEqual(["12.01."]);
    });

    it("does not call onChange when the value has not changed", () => {
        const handleChange = vi.fn();

        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.time} value="" onChange={handleChange} />
            </FormField>,
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

        expect(handleChange).not.toHaveBeenCalled();
    });

    it("uppercases the value for the swiftCode mask", () => {
        const changedValues: string[] = [];
        const handleChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => {
            changedValues.push(event.target.value);
        });

        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.swiftCode} value="" onChange={handleChange} />
            </FormField>,
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "sabr" } });

        expect(changedValues).toEqual(["SABR"]);
    });

    it("expands the first digit into the country code for the phone mask", () => {
        const changedValues: string[] = [];
        const handleChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => {
            changedValues.push(event.target.value);
        });

        render(
            <FormField>
                <FormFieldMaskedInput mask={presets.masks.phone} value="" onChange={handleChange} />
            </FormField>,
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "8" } });

        expect(changedValues).toEqual(["+7 ("]);
    });

    it("is disabled for the disabled status", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldMaskedInput mask={presets.masks.date} value="" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("merges custom className into the wrapper", () => {
        render(
            <FormField>
                <FormFieldMaskedInput
                    className="custom-masked-input"
                    mask={presets.masks.date}
                    value=""
                    onChange={vi.fn()}
                />
            </FormField>,
        );

        const wrapper = document.querySelector(".formFieldMaskedInputWrapper");

        expect(wrapper).toHaveClass("custom-masked-input");
    });

    it("forwards ref to the wrapper and forwardedRef to the input", () => {
        const wrapperRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();

        render(
            <FormField>
                <FormFieldMaskedInput
                    mask={presets.masks.date}
                    value=""
                    onChange={vi.fn()}
                    ref={wrapperRef}
                    forwardedRef={inputRef}
                />
            </FormField>,
        );

        expect(wrapperRef.current).toBeInstanceOf(HTMLDivElement);
        expect(wrapperRef.current).toHaveClass("formFieldMaskedInputWrapper");
        expect(inputRef.current).toBe(screen.getByRole("textbox"));
    });
});
