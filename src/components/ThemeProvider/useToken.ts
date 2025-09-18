import { useContext } from 'react';
import { TDesignTokens } from '../DesignTokens/types/DesignTokensTypes';
import { ThemeProviderContext } from '@sberbusiness/triplex-next/components/ThemeProvider/ThemeProviderContext';
import { ETriplexNextTheme } from './ETriplexNextTheme';

/**
 * Хук, возвращающий текущую тему и токены.
 */
export const useToken = (): { scopeClassName: string; theme: ETriplexNextTheme; tokens: TDesignTokens } => {
    const { scopeClassName, theme, tokens } = useContext(ThemeProviderContext);

    return { scopeClassName, theme, tokens };
};
