import { designTokensRefs } from "../../../generated/refTokenTypes";

/** Строковое значение токена. */
export interface IDesignTokenValueString {
    /** Строковое значение токена, например "#000000", или "16px". */
    value: string;
    // Это свойство обязательно, оно исключает попадание под тип IDesignTokenValueRef.
    ref?: never;
}

/** Значение токена ссылается на другой токен. */
export interface IDesignTokenValueRef {
    /** Ссылка на другой токен. */
    ref: (typeof designTokensRefs)[number];
    // Это свойство обязательно, оно исключает попадание под тип IDesignTokenValueString.
    value?: never;
}

/** Значение токена. */
export type TDesignTokenValue = IDesignTokenValueString | IDesignTokenValueRef;

/** Значение токена в светлой и темной теме. */
export type TDesignTokenValues = [TDesignTokenValue, TDesignTokenValue];
