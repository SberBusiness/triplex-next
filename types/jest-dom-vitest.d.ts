// Типы матчеров jest-dom для vitest 5.
//
// @testing-library/jest-dom/vitest (7.0.1 и ниже) расширяет `Assertion<T>`, а в
// vitest 5 это `Assertion<R, T>`: tsc падает с TS2428. Upstream:
// https://github.com/testing-library/jest-dom/issues/738. Пока не исправлено,
// расширяем `Matchers<R, T>` — интерфейс vitest для пользовательских матчеров.
// Рантайм-регистрация матчеров остаётся в vitest.setup.ts.
//
// Снять вместе с правкой tsconfig, когда jest-dom выпустит поддержку vitest 5.
import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
    // Параметры типа должны совпадать с объявлением vitest, поэтому T нужен,
    // хотя не используется.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extends TestingLibraryMatchers<any, R> {}
}
