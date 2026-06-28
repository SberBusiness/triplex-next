import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ModalWindow } from "../ModalWindow";

/**
 * Регрессия на ошибку focus-trap "must have at least one container with at least one
 * tabbable node" при открытии модального окна.
 *
 * В отличие от ModalWindow.test.tsx здесь НЕ мокается focus-trap-react — используется
 * настоящая ловушка фокуса, чтобы реально воспроизвести падение в `activate()`.
 *
 * После рефакторинга 1.28.0 FocusTrap активируется синхронно при открытии. Если в этот
 * момент внутри dialog ещё нет tabbable-узлов (контент грузится асинхронно, показан лоадер,
 * closeButton отрисуется тиком позже), focus-trap без `fallbackFocus` бросает исключение.
 * ModalWindow задаёт `fallbackFocus` на сам dialog-узел — это должно предотвращать падение.
 */

// react-transition-group мокается, чтобы дети монтировались синхронно при isOpen=true
// (без таймеров анимации) — так FocusTrap активируется внутри render().
type CSSTransitionMockProps = {
    in?: boolean;
    onEnter?: () => void;
    children?: React.ReactNode;
};

vi.mock("react-transition-group", () => ({
    CSSTransition: (props: CSSTransitionMockProps) => {
        if (props.in && props.onEnter) {
            props.onEnter();
        }
        return props.in ? <div data-testid="css-transition">{props.children}</div> : null;
    },
}));

vi.mock("../../Portal/Portal", () => ({
    Portal: ({ children }: { children: React.ReactNode }) => <div data-testid="portal">{children}</div>,
}));

vi.mock("../components/ModalWindowViewManager", () => ({
    ModalWindowViewManager: () => <div data-testid="view-manager" />,
}));

vi.mock("../../ThemeProvider/useToken", () => ({
    useToken: () => ({ scopeClassName: "theme-scope" }),
}));

// В jsdom нет настоящего layout, поэтому tabbable со стандартным displayCheck считает все
// элементы нескрытыми/нетабуемыми по-разному. Принудительно отключаем display-проверку,
// чтобы tabbable-узлы определялись по разметке, а сценарий "ноль tabbable-узлов" был честным.
const focusTrapProps = {
    focusTrapOptions: {
        tabbableOptions: { displayCheck: "none" as const },
        // Фокус сразу, без setTimeout — чтобы не оставлять висящих таймеров после теста.
        delayInitialFocus: false,
    },
};

// Контент без интерактивных (tabbable) элементов — имитирует лоадер/асинхронную загрузку.
const NonTabbableContent = () => <div data-testid="loader">Загрузка…</div>;

describe("ModalWindow — focus trap activation (real focus-trap)", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        document.body.className = "";
    });

    afterEach(() => {
        cleanup();
        document.body.innerHTML = "";
        document.body.className = "";
    });

    it("не падает с ошибкой focus-trap при открытии модалки без tabbable-узлов", () => {
        expect(() =>
            render(
                <ModalWindow isOpen={true} closeButton={null} focusTrapProps={focusTrapProps}>
                    <NonTabbableContent />
                </ModalWindow>,
            ),
        ).not.toThrow();

        // Окно действительно открылось.
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("dialog получает фокус как fallback, когда внутри нет tabbable-узлов", () => {
        render(
            <ModalWindow isOpen={true} closeButton={null} focusTrapProps={focusTrapProps}>
                <NonTabbableContent />
            </ModalWindow>,
        );

        expect(document.activeElement).toBe(screen.getByRole("dialog"));
    });

    it("обычная модалка с интерактивным содержимым открывается без ошибок", () => {
        expect(() =>
            render(
                <ModalWindow isOpen={true} closeButton={<button>Закрыть</button>} focusTrapProps={focusTrapProps}>
                    <button>OK</button>
                </ModalWindow>,
            ),
        ).not.toThrow();

        expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    });
});
