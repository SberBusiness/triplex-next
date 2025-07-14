import React from "react";
import { TDesignTokens } from "../DesignTokens/types/DesignTokensTypes";
import { ETriplexNextTheme } from "./ETriplexNextTheme";
import { DesignTokensCore, DesignTokensComponents } from "../DesignTokens";

export interface IThemeProviderContext {
    scopeClassName: string;
    theme: ETriplexNextTheme;
    tokens: TDesignTokens;
}

const contextInitial: IThemeProviderContext = {
    scopeClassName: "",
    theme: ETriplexNextTheme.LIGHT,
    tokens: { ...DesignTokensCore, ...DesignTokensComponents },
};

export const ThemeProviderContext = React.createContext<IThemeProviderContext>(contextInitial);
