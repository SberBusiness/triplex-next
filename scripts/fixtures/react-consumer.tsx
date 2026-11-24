import { useRef, useState, version } from "react";
import { createRoot } from "react-dom/client";
import {
    Button,
    ButtonDropdownExtended,
    DatePickerExtended,
    Dropdown,
    EButtonTheme,
    EComponentSize,
    ModalWindow,
    ThemeProvider,
} from "@sberbusiness/triplex-next";

function recordRef(name: string) {
    function record(event: string) {
        const key = name + "Ref";
        document.body.dataset[key] = (document.body.dataset[key] ?? "") + event + " ";
    }

    return (node: HTMLDivElement | null) => {
        record(node ? "attach" : "null");
        if (node && version.startsWith("19.")) {
            return () => record("cleanup");
        }
    };
}

const modalRef = recordRef("modal");
const pickerRef = recordRef("picker");
const buttonRef = recordRef("button");

function Consumer() {
    const scopeRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);

    return (
        <div ref={scopeRef}>
            <ThemeProvider scopeRef={scopeRef}>
                <Button
                    ref={targetRef}
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.MD}
                    onClick={() => setOpened(true)}
                >
                    Open
                </Button>
                <Dropdown opened={false} setOpened={() => {}} targetRef={targetRef} />
                {opened && (
                    <>
                        <DatePickerExtended
                            ref={pickerRef}
                            pickedDate={null}
                            onDateChange={() => {}}
                            renderTarget={() => null}
                            renderDropdownHeaderTarget={() => null}
                        />
                        <ButtonDropdownExtended
                            ref={buttonRef}
                            dropdownRef={dropdownRef}
                            renderButton={() => null}
                            renderDropdown={() => null}
                        />
                    </>
                )}
                <ModalWindow
                    ref={modalRef}
                    isOpen={opened}
                    closeButton={<button onClick={() => setOpened(false)}>Close</button>}
                >
                    <div>Content</div>
                </ModalWindow>
            </ThemeProvider>
        </div>
    );
}

createRoot(document.body.appendChild(document.createElement("div"))).render(<Consumer />);
