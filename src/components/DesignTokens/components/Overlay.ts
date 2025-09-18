import {TDesignTokenValue, TDesignTokenValues} from '../types/DesignTokenTypes';

// Название токенов компонента Overlay.
export const designTokensComponentsOverlayKeys = ['Background', 'Panel_Background'] as const;
// Тип, содержащий названия токенов компонента Overlay.
export type TDesignTokensComponentsOverlayKeys = (typeof designTokensComponentsOverlayKeys)[number];
// Тип, содержащий названия токенов компонента Overlay и их значения.
export type TDesignTokensComponentsOverlayValue = Record<TDesignTokensComponentsOverlayKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Overlay и их значения в светлой и темной теме.
export type TDesignTokensComponentsOverlayValues = Record<TDesignTokensComponentsOverlayKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Overlay.
export type TDesignTokensComponentsOverlay = {Overlay: TDesignTokensComponentsOverlayValue};

// Токены компонента Overlay в светлой и темной темах.
export const Overlay_Tokens: TDesignTokensComponentsOverlayValues = {
    Background: [{value: 'rgba(255, 255, 255, .8)'}, {value: 'rgba(24, 24, 25, .8)'}], // var(--triplex-next-Overlay-Background)
    Panel_Background: [{ref: 'ColorNeutral.100'}, {ref: 'ColorNeutral.100'}], // var(--triplex-next-Overlay-Panel_Background)
};
