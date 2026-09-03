import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { FocusTrapProps } from "focus-trap-react";
import { MultiselectField } from "../MultiselectField";
import { MultiselectFieldDropdown } from "../components/MultiselectFieldDropdown";
import { MultiselectFieldDropdownHeader } from "../components/MultiselectFieldDropdownHeader";
import { MultiselectFieldDropdownContent } from "../components/MultiselectFieldDropdownContent";
import { MultiselectFieldDropdownFooter } from "../components/MultiselectFieldDropdownFooter";
import { MultiselectFieldContext, IMultiselectFieldContext } from "../MultiselectFieldContext";
import { EComponentSize } from "../../../enums/EComponentSize";

// FocusTrap подменяется, чтобы проверить именно то, что вычисляет компонент — focusTrapOptions.
// Настоящий перехват фокуса — интеграция стороннего пакета, unit-тестами не покрывается.
vi.mock("focus-trap-react", () => ({
    FocusTrap: ({ children, focusTrapOptions }: FocusTrapProps) => (
        <div data-testid="focus-trap" data-focus-trap-options={JSON.stringify(focusTrapOptions)}>
            {children}
        </div>
    ),
}));

/** Опции focus-trap, с которыми отрендерился выпадающий блок. */
const getFocusTrapOptions = (): Record<string, unknown> =>
    JSON.parse(screen.getByTestId("focus-trap").getAttribute("data-focus-trap-options") || "{}");

describe("MultiselectFieldDropdown", () => {
    const mockSetOpened = vi.fn();
    const targetRef = React.createRef<HTMLDivElement>();

    const renderDropdown = (
        props: Partial<React.ComponentProps<typeof MultiselectFieldDropdown>> = {},
        contextValue?: IMultiselectFieldContext,
    ) => {
        const dropdown = (
            <MultiselectFieldDropdown opened setOpened={mockSetOpened} targetRef={targetRef} {...props}>
                <div data-testid="dropdown-content">Dropdown content</div>
            </MultiselectFieldDropdown>
        );

        return render(
            contextValue ? (
                <MultiselectFieldContext.Provider value={contextValue}>{dropdown}</MultiselectFieldContext.Provider>
            ) : (
                dropdown
            ),
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should not render content when closed", () => {
        renderDropdown({ opened: false });

        expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
    });

    it("Should render children through Portal when opened", () => {
        const { container } = renderDropdown();

        const content = screen.getByTestId("dropdown-content");

        expect(content).toBeInTheDocument();
        // Dropdown рендерится через Portal в document.body, вне контейнера рендера.
        expect(container).not.toContainElement(content);
    });

    it("Should wrap children into a presentation element inside focus trap", () => {
        renderDropdown();

        const presentation = screen.getByRole("presentation");

        expect(screen.getByTestId("focus-trap")).toContainElement(presentation);
        expect(presentation).toContainElement(screen.getByTestId("dropdown-content"));
    });

    it("Should forward ref to the dropdown container", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderDropdown({ ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toContainElement(screen.getByTestId("dropdown-content"));
    });

    it("Should pass through className and unknown html attributes", () => {
        renderDropdown({ className: "custom-dropdown", "data-testid": "custom-dropdown" } as Partial<
            React.ComponentProps<typeof MultiselectFieldDropdown>
        >);

        expect(screen.getByTestId("custom-dropdown")).toHaveClass("custom-dropdown");
    });

    describe("focusTrapOptions", () => {
        it("Should deactivate on outside click and prevent scroll", () => {
            renderDropdown();

            expect(getFocusTrapOptions()).toMatchObject({
                clickOutsideDeactivates: true,
                preventScroll: true,
            });
        });

        it("Should return focus on deactivate when the dropdown was not opened by mouse", () => {
            renderDropdown({}, { size: EComponentSize.MD, mouseUsedRef: { current: false } });

            expect(getFocusTrapOptions()).toMatchObject({ returnFocusOnDeactivate: true });
        });

        it("Should not return focus on deactivate when the dropdown was opened by mouse", () => {
            renderDropdown({}, { size: EComponentSize.MD, mouseUsedRef: { current: true } });

            expect(getFocusTrapOptions()).toMatchObject({ returnFocusOnDeactivate: false });
        });

        it("Should let consumer options override the defaults", () => {
            renderDropdown({
                focusTrapProps: { focusTrapOptions: { clickOutsideDeactivates: false, initialFocus: false } },
            } as Partial<React.ComponentProps<typeof MultiselectFieldDropdown>>);

            expect(getFocusTrapOptions()).toMatchObject({
                clickOutsideDeactivates: false,
                initialFocus: false,
                preventScroll: true,
            });
        });
    });

    describe("mouseUsedRef", () => {
        it("Should reset the mouse flag when the dropdown is closed", () => {
            const mouseUsedRef = { current: true };

            renderDropdown({ opened: false }, { size: EComponentSize.MD, mouseUsedRef });

            expect(mouseUsedRef.current).toBe(false);
        });

        it("Should keep the mouse flag while the dropdown is opened", () => {
            const mouseUsedRef = { current: true };

            renderDropdown({ opened: true }, { size: EComponentSize.MD, mouseUsedRef });

            expect(mouseUsedRef.current).toBe(true);
        });
    });

    describe("mobile version", () => {
        const originalMatchMedia = window.matchMedia;

        /** Заставляет MobileView считать, что ширина экрана мобильная. */
        const mockMobileWidth = () => {
            window.matchMedia = ((query: string) =>
                ({
                    matches: true,
                    media: query,
                    onchange: null,
                    addEventListener: () => {},
                    removeEventListener: () => {},
                    addListener: () => {},
                    removeListener: () => {},
                    dispatchEvent: () => false,
                }) as unknown as MediaQueryList) as typeof window.matchMedia;
        };

        afterEach(() => {
            window.matchMedia = originalMatchMedia;
        });

        // Мобильную версию приходится искать по классу чужого компонента: у DropdownMobile
        // нет ни role, ни aria-атрибутов, ни data-testid. Переименование класса
        // dropdownMobile в Dropdown/styles/DropdownMobile.module.less уронит эти тесты.
        it("Should render the desktop version on desktop width", () => {
            renderDropdown();

            expect(document.querySelector(".dropdownMobile")).toBeNull();
            expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
        });

        it("Should render the mobile version on mobile width even without mobileViewProps", () => {
            mockMobileWidth();

            renderDropdown();

            expect(document.querySelector(".dropdownMobile")).not.toBeNull();
            expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
        });

        it("Should render mobileViewProps children instead of dropdown children on mobile width", () => {
            mockMobileWidth();

            renderDropdown({
                mobileViewProps: { children: <div data-testid="mobile-content">Mobile content</div> },
            });

            expect(screen.getByTestId("mobile-content")).toBeInTheDocument();
            expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
        });
    });

    it("Should expose Header, Content and Footer as static properties", () => {
        expect(MultiselectFieldDropdown.Header).toBe(MultiselectFieldDropdownHeader);
        expect(MultiselectFieldDropdown.Content).toBe(MultiselectFieldDropdownContent);
        expect(MultiselectFieldDropdown.Footer).toBe(MultiselectFieldDropdownFooter);
    });

    it("Should have displayName", () => {
        expect(MultiselectFieldDropdown.displayName).toBe("MultiselectFieldDropdown");
    });

    // Сквозная связка через MultiselectFieldContext: признак «открыт мышью» ставит
    // MultiselectField, а читает его выпадающий блок. Собственная нетривиальная логика
    // компонента, поэтому проверяется на реальной паре, а не на подставленном контексте.
    describe("integration with MultiselectField", () => {
        const renderField = () =>
            render(
                <MultiselectField
                    renderTarget={({ setOpened }) => (
                        <button type="button" onClick={() => setOpened(true)}>
                            Target
                        </button>
                    )}
                    data-testid="multiselect-field"
                >
                    {({ opened, setOpened, targetRef: fieldTargetRef, dropdownRef }) => (
                        <MultiselectField.Dropdown
                            opened={opened}
                            setOpened={setOpened}
                            targetRef={fieldTargetRef}
                            ref={dropdownRef}
                        >
                            <div data-testid="dropdown-content">Dropdown content</div>
                        </MultiselectField.Dropdown>
                    )}
                </MultiselectField>,
            );

        /** Открывает блок так же, как это делает поле выбора — через setOpened из рендер-функции. */
        const openDropdown = () => fireEvent.click(screen.getByRole("button", { name: "Target" }));

        it("Should return focus on deactivate when opened without mouse down on the field", () => {
            renderField();

            openDropdown();

            expect(getFocusTrapOptions().returnFocusOnDeactivate).toBe(true);
        });

        it("Should not return focus on deactivate when opened after mouse down on the field", () => {
            renderField();

            fireEvent.mouseDown(screen.getByTestId("multiselect-field"));
            openDropdown();

            expect(getFocusTrapOptions().returnFocusOnDeactivate).toBe(false);
        });
    });
});
