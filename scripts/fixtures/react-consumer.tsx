import { useRef } from "react";
import { Button, Dropdown, EButtonTheme, EComponentSize, ModalWindow, ThemeProvider } from "@sberbusiness/triplex-next";

export function Consumer() {
    const scopeRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLButtonElement>(null);

    return (
        <div ref={scopeRef}>
            <ThemeProvider scopeRef={scopeRef}>
                <Button ref={targetRef} theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Open
                </Button>
                <Dropdown opened={false} setOpened={() => {}} targetRef={targetRef} />
                <ModalWindow isOpen={false} closeButton={<button>Close</button>}>
                    <div>Content</div>
                </ModalWindow>
            </ThemeProvider>
        </div>
    );
}
