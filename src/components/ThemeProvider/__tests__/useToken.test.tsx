import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../ThemeProvider";
import { useToken } from "../useToken";
import { ETriplexNextTheme } from "../ETriplexNextTheme";
import { DesignTokensCore, DesignTokensComponents } from "../../DesignTokens";

type TUseTokenResult = ReturnType<typeof useToken>;

/** Читает результат useToken и отдаёт его наружу теста. */
const createTokenReader = () => {
    const results: TUseTokenResult[] = [];

    const TokenReader: React.FC = () => {
        results.push(useToken());

        return null;
    };

    return { TokenReader, getLastResult: () => results[results.length - 1] };
};

const createScopeRef = (): React.RefObject<HTMLElement> => ({ current: document.createElement("div") });

describe("useToken", () => {
    it("вне ThemeProvider возвращает светлую тему и токены по умолчанию", () => {
        const { TokenReader, getLastResult } = createTokenReader();

        render(<TokenReader />);

        expect(getLastResult().scopeClassName).toBe("");
        expect(getLastResult().theme).toBe(ETriplexNextTheme.LIGHT);
        expect(getLastResult().tokens).toEqual({ ...DesignTokensCore, ...DesignTokensComponents });
    });

    it("возвращает тему и scopeClassName ближайшего ThemeProvider", () => {
        const { TokenReader, getLastResult } = createTokenReader();

        render(
            <ThemeProvider scopeRef={createScopeRef()} scopeClassName="scope-a" theme={ETriplexNextTheme.DARK}>
                <TokenReader />
            </ThemeProvider>,
        );

        expect(getLastResult().scopeClassName).toBe("scope-a");
        expect(getLastResult().theme).toBe(ETriplexNextTheme.DARK);
    });

    it("возвращает переопределённые потребителем токены", () => {
        const { TokenReader, getLastResult } = createTokenReader();

        render(
            <ThemeProvider scopeRef={createScopeRef()} tokens={{ ColorBrand: { 50: { value: "blue" } } }}>
                <TokenReader />
            </ThemeProvider>,
        );

        expect(getLastResult().tokens.ColorBrand[50]).toEqual({ value: "blue" });
    });

    it("возвращает значения ближайшего вложенного ThemeProvider", () => {
        const { TokenReader, getLastResult } = createTokenReader();

        render(
            <ThemeProvider scopeRef={createScopeRef()} scopeClassName="outer" theme={ETriplexNextTheme.LIGHT}>
                <ThemeProvider scopeRef={createScopeRef()} scopeClassName="inner" theme={ETriplexNextTheme.DARK}>
                    <TokenReader />
                </ThemeProvider>
            </ThemeProvider>,
        );

        expect(getLastResult().scopeClassName).toBe("inner");
        expect(getLastResult().theme).toBe(ETriplexNextTheme.DARK);
    });
});
