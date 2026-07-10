import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ModalWindow } from "../ModalWindow";

// CSSTransition и FocusTrap мокаем (они не влияют на проверяемый механизм портала), но
// Portal используем НАСТОЯЩИЙ — через реальный createPortal. Это ключ к тесту: если
// mountNode откреплён от документа, контент не окажется в document.body, и getByTestId упадёт.
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
        return props.in ? <div>{props.children}</div> : null;
    },
}));

// focus-trap-react 10 (release-0) импортируется как default, 11 (main) — как именованный экспорт.
vi.mock("focus-trap-react", () => {
    const FocusTrap = (props: { children?: React.ReactNode }) => <div>{props.children}</div>;
    return { FocusTrap, default: FocusTrap };
});

vi.mock("../components/ModalWindowViewManager", () => ({
    ModalWindowViewManager: () => <div />,
}));

vi.mock("../../ThemeProvider/useToken", () => ({
    useToken: () => ({ scopeClassName: "theme-scope" }),
}));

const TestContent = () => <div data-testid="test-content">Modal Content</div>;
const TestCloseButton = () => <button data-testid="close-button">Close</button>;

describe("ModalWindow — StrictMode", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        document.body.className = "";
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
        document.body.innerHTML = "";
        document.body.className = "";
    });

    it("остаётся видимым после mount → unmount → mount цикла StrictMode", () => {
        // React 18 StrictMode (dev) монтирует, размонтирует и монтирует компонент заново.
        // На искусственном размонтировании cleanup открепляет mountNode; без повторной
        // привязки Portal продолжает рендерить модалку в висящий вне DOM узел → пусто на экране.
        render(
            <React.StrictMode>
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>
            </React.StrictMode>,
        );

        // Контент реально присутствует в документе — значит портальный узел прикреплён.
        expect(screen.getByTestId("test-content")).toBeInTheDocument();
        expect(screen.getByRole("dialog").isConnected).toBe(true);
    });
});
