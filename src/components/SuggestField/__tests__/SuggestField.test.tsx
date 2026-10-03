import { render, screen } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { SuggestField } from "../SuggestField";
import { ISuggestFieldOption, ISuggestFieldProps } from "../types";
import { FormFieldInput } from "../../FormField";

const OPTIONS: ISuggestFieldOption[] = [
    { id: "a", label: "First option" },
    { id: "b", label: "Second option" },
];

const renderField = (props: Partial<ISuggestFieldProps> = {}) =>
    render(
        <SuggestField
            value={undefined}
            options={OPTIONS}
            tooltipHint="Hint"
            tooltipOpen={false}
            inputProps={{}}
            onSelect={vi.fn()}
            onFilter={vi.fn()}
            {...props}
        />,
    );

/** Подменяет matchMedia так, чтобы MobileView считал экран мобильным. */
const mockMobileScreen = () => {
    vi.stubGlobal(
        "matchMedia",
        vi.fn().mockImplementation((query: string) => ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    );
};

// Поведение платформенных вариантов проверяется в SuggestFieldDesktop.test.tsx и
// SuggestFieldMobile.test.tsx. Здесь — только то, что делает сам SuggestField: выбор варианта
// по ширине экрана и проброс props.
describe("SuggestField", () => {
    describe("on desktop width", () => {
        it("renders the desktop variant with an editable input", () => {
            renderField();

            expect(screen.getByRole("combobox")).not.toHaveAttribute("readonly");
        });

        it("passes className and data-test-id to the desktop variant", () => {
            const { container } = renderField({ className: "custom-class", "data-test-id": "suggest" });

            expect(container.querySelector(".custom-class")).not.toBeNull();
            expect(container.querySelector('[data-test-id="suggest"]')).not.toBeNull();
        });
    });

    describe("on mobile width", () => {
        // useMatchMedia читает matchMedia на рендере, поэтому мока на этот describe достаточно.
        beforeAll(() => {
            mockMobileScreen();
        });

        afterAll(() => {
            vi.unstubAllGlobals();
        });

        it("renders the mobile variant with a read-only input", () => {
            renderField();

            expect(screen.getByRole("combobox")).toHaveAttribute("readonly");
        });

        it("passes className, id, data-test-id and renderInput to the mobile variant", () => {
            const { container } = renderField({
                className: "custom-class",
                id: "suggest-id",
                "data-test-id": "suggest",
                renderInput: (props) => <input {...props} data-testid="custom-input" />,
            });

            expect(container.querySelector(".custom-class")).not.toBeNull();
            expect(container.querySelector("#suggest-id")).not.toBeNull();
            expect(container.querySelector('[data-test-id="suggest"]')).not.toBeNull();
            expect(screen.getByTestId("custom-input")).toHaveAttribute("readonly");
        });
    });

    it("exposes FormFieldInput as SuggestField.Input", () => {
        expect(SuggestField.Input).toBe(FormFieldInput);
    });
});
