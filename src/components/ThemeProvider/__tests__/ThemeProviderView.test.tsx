import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProviderView } from "../components/ThemeProviderView";
import { ThemeProviderContext, IThemeProviderContext } from "../ThemeProviderContext";
import { ETriplexNextTheme } from "../ETriplexNextTheme";
import { TDesignTokensPartial } from "../../DesignTokens/types/DesignTokensTypes";
import {
    DesignTokensCore,
    DesignTokensCoreThemeDark,
    DesignTokensComponents,
    DesignTokensComponentsThemeDark,
} from "../../DesignTokens";

/** Читает значение контекста темы и отдаёт его наружу теста. */
const createContextReader = () => {
    const contextValues: IThemeProviderContext[] = [];

    const ContextReader: React.FC = () => {
        contextValues.push(React.useContext(ThemeProviderContext));

        return <div data-testid="context-reader" />;
    };

    return { ContextReader, getLastValue: () => contextValues[contextValues.length - 1] };
};

interface IRenderViewProps {
    scopeClassName: string;
    scopeRef: React.RefObject<HTMLElement>;
    theme: ETriplexNextTheme;
    tokens?: TDesignTokensPartial;
    children?: React.ReactNode;
}

const renderView = (props: IRenderViewProps) => render(<ThemeProviderView {...props} />);

const createScopeRef = (): React.RefObject<HTMLElement> => ({ current: document.createElement("div") });

describe("ThemeProviderView", () => {
    describe("Область видимости css-переменных", () => {
        it("добавляет scopeClassName на элемент из scopeRef", () => {
            const scopeRef = createScopeRef();

            renderView({
                scopeClassName: "scope-a",
                scopeRef,
                theme: ETriplexNextTheme.LIGHT,
                children: <div data-testid="child" />,
            });

            expect(scopeRef.current?.classList.contains("scope-a")).toBe(true);
            expect(screen.getByTestId("child")).toBeInTheDocument();
        });

        it("снимает scopeClassName при размонтировании", () => {
            const scopeRef = createScopeRef();

            const { unmount } = renderView({
                scopeClassName: "scope-a",
                scopeRef,
                theme: ETriplexNextTheme.LIGHT,
            });

            unmount();

            expect(scopeRef.current?.classList.contains("scope-a")).toBe(false);
        });

        it("заменяет предыдущий scopeClassName при его изменении", () => {
            const scopeRef = createScopeRef();

            const { rerender } = renderView({
                scopeClassName: "scope-a",
                scopeRef,
                theme: ETriplexNextTheme.LIGHT,
            });

            rerender(
                <ThemeProviderView scopeClassName="scope-b" scopeRef={scopeRef} theme={ETriplexNextTheme.LIGHT} />,
            );

            expect(scopeRef.current?.classList.contains("scope-a")).toBe(false);
            expect(scopeRef.current?.classList.contains("scope-b")).toBe(true);
        });

        it("не трогает classList при пустом scopeClassName", () => {
            const scopeRef = createScopeRef();

            renderView({ scopeClassName: "", scopeRef, theme: ETriplexNextTheme.LIGHT });

            expect(scopeRef.current?.classList.length).toBe(0);
        });

        it("не падает, если scopeRef не привязан к элементу", () => {
            const scopeRef: React.RefObject<HTMLElement> = { current: null };

            expect(() =>
                renderView({
                    scopeClassName: "scope-a",
                    scopeRef,
                    theme: ETriplexNextTheme.LIGHT,
                    children: <div data-testid="child" />,
                }),
            ).not.toThrow();

            expect(screen.getByTestId("child")).toBeInTheDocument();
        });
    });

    describe("Значение контекста", () => {
        it("передаёт scopeClassName и тему в контекст", () => {
            const { ContextReader, getLastValue } = createContextReader();

            renderView({
                scopeClassName: "scope-a",
                scopeRef: createScopeRef(),
                theme: ETriplexNextTheme.DARK,
                children: <ContextReader />,
            });

            expect(getLastValue().scopeClassName).toBe("scope-a");
            expect(getLastValue().theme).toBe(ETriplexNextTheme.DARK);
        });

        it("отдаёт токены светлой темы", () => {
            const { ContextReader, getLastValue } = createContextReader();

            renderView({
                scopeClassName: "scope-a",
                scopeRef: createScopeRef(),
                theme: ETriplexNextTheme.LIGHT,
                children: <ContextReader />,
            });

            expect(getLastValue().tokens).toEqual({ ...DesignTokensCore, ...DesignTokensComponents });
        });

        it("отдаёт токены тёмной темы", () => {
            const { ContextReader, getLastValue } = createContextReader();

            renderView({
                scopeClassName: "scope-a",
                scopeRef: createScopeRef(),
                theme: ETriplexNextTheme.DARK,
                children: <ContextReader />,
            });

            expect(getLastValue().tokens).toEqual({ ...DesignTokensCoreThemeDark, ...DesignTokensComponentsThemeDark });
        });

        it("переопределения потребителя имеют приоритет над токенами темы", () => {
            const { ContextReader, getLastValue } = createContextReader();

            renderView({
                scopeClassName: "scope-a",
                scopeRef: createScopeRef(),
                theme: ETriplexNextTheme.LIGHT,
                tokens: { ColorBrand: { 50: { value: "blue" } } },
                children: <ContextReader />,
            });

            const { tokens } = getLastValue();

            expect(tokens.ColorBrand[50]).toEqual({ value: "blue" });
            // Незаданные токены остаются из темы.
            expect(tokens.ColorBrand[0]).toEqual(DesignTokensCore.ColorBrand[0]);
        });
    });
});
