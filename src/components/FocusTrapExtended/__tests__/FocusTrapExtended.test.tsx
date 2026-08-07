import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import { FocusTrapExtended } from "../FocusTrapExtended";
import { setupDOMElementMocks, restoreDOMElementMocks, setupTestUser } from "./utils";

describe("FocusTrapExtended", () => {
    beforeAll(() => {
        setupDOMElementMocks();
    });

    afterAll(() => {
        restoreDOMElementMocks();
    });

    it("should keep focus inside the trap on Tab navigation", async () => {
        const user = setupTestUser();
        render(
            <FocusTrapExtended>
                <div>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </FocusTrapExtended>,
        );

        const first = screen.getByRole("button", { name: "First" });
        const second = screen.getByRole("button", { name: "Second" });

        first.focus();
        expect(document.activeElement).toBe(first);

        await user.tab();
        expect(document.activeElement).toBe(second);

        await user.tab();
        expect(document.activeElement).toBe(first);
    });

    it("should suppress return focus when deactivation happens via outside click", async () => {
        const user = setupTestUser();

        const TestComponent = () => {
            const [opened, setOpened] = useState(true);
            return (
                <div>
                    <button>Open Trigger</button>
                    {opened && (
                        <FocusTrapExtended>
                            <div>
                                <button>Inside</button>
                            </div>
                        </FocusTrapExtended>
                    )}
                    <button
                        onClick={(event) => {
                            setOpened(false);
                            event.currentTarget.focus();
                        }}
                    >
                        Outside Element
                    </button>
                </div>
            );
        };

        render(<TestComponent />);

        const outsideBtn = screen.getByRole("button", { name: "Outside Element" });
        const insideBtn = screen.getByRole("button", { name: "Inside" });

        insideBtn.focus();
        expect(document.activeElement).toBe(insideBtn);

        await user.click(outsideBtn);
        expect(document.activeElement).toBe(outsideBtn);
    });

    it("should pause the top trap on outside click and prevent lower traps from stealing focus", async () => {
        const user = setupTestUser();

        const NestedTrapComponent = () => {
            return (
                <div>
                    <FocusTrapExtended>
                        <div>
                            <button>Lower Trigger</button>
                        </div>
                    </FocusTrapExtended>
                    <FocusTrapExtended
                        focusTrapOptions={{
                            allowOutsideClick: (event) => {
                                return event.target instanceof HTMLElement
                                    ? event.target.textContent === "Portal Option"
                                    : false;
                            },
                        }}
                    >
                        <div>
                            <button>Top Inside</button>
                            <label>
                                Search
                                <input placeholder="Type here..." />
                            </label>
                        </div>
                    </FocusTrapExtended>
                    <button>Portal Option</button>
                </div>
            );
        };

        render(<NestedTrapComponent />);

        const topInput = screen.getByRole("textbox", { name: "Search" });
        const portalOption = screen.getByRole("button", { name: "Portal Option" });

        await user.click(topInput);
        expect(document.activeElement).toBe(topInput);

        await user.click(portalOption);
        expect(document.activeElement).toBe(portalOption);
    });

    it("should clean up paused state and allow clicks on secondary activation without unmount", async () => {
        const user = setupTestUser();

        const PersistentComponent = () => {
            const [active, setActive] = useState(true);
            return (
                <div>
                    <FocusTrapExtended active={active}>
                        <div>
                            <button>Inside</button>
                        </div>
                    </FocusTrapExtended>
                    <button onClick={() => setActive((prev) => !prev)}>Toggle Active</button>
                    <button>External</button>
                </div>
            );
        };

        render(<PersistentComponent />);

        const trapBtn = screen.getByRole("button", { name: "Inside" });
        const toggleBtn = screen.getByRole("button", { name: "Toggle Active" });
        const extBtn = screen.getByRole("button", { name: "External" });

        trapBtn.focus();
        expect(document.activeElement).toBe(trapBtn);

        await user.click(extBtn);
        await user.click(toggleBtn);
        await user.click(toggleBtn);

        trapBtn.focus();
        expect(document.activeElement).toBe(trapBtn);

        await user.tab();
        expect(document.activeElement).toBe(trapBtn);
    });

    it("should return focus normally if outside click was rejected by custom predicate but trap is closed later", async () => {
        const user = setupTestUser();

        const RejectedClickComponent = () => {
            const [active, setActive] = useState(false);
            return (
                <div>
                    <button onClick={() => setActive(true)}>Trigger</button>
                    <FocusTrapExtended
                        active={active}
                        focusTrapOptions={{
                            clickOutsideDeactivates: () => false,
                        }}
                    >
                        <div>
                            <button>Inside</button>
                        </div>
                    </FocusTrapExtended>
                    <button>Outside Element</button>
                </div>
            );
        };

        render(<RejectedClickComponent />);

        const trigger = screen.getByRole("button", { name: "Trigger" });
        const insideBtn = screen.getByRole("button", { name: "Inside" });
        const outsideBtn = screen.getByRole("button", { name: "Outside Element" });

        trigger.focus();
        expect(document.activeElement).toBe(trigger);

        await user.click(trigger);
        expect(document.activeElement).toBe(insideBtn);

        await user.click(outsideBtn);
        await user.keyboard("{Escape}");
        expect(document.activeElement).toBe(trigger);
    });

    it("should respect external paused prop and override internal state changes", async () => {
        const user = setupTestUser();
        let currentPausedState: boolean | undefined = undefined;

        const ExternalControlComponent = () => {
            const [extPaused, setExtPaused] = useState<boolean | undefined>(undefined);
            return (
                <div>
                    <FocusTrapExtended
                        paused={extPaused}
                        focusTrapOptions={{
                            onPause: () => {
                                currentPausedState = true;
                            },
                            onUnpause: () => {
                                currentPausedState = false;
                            },
                        }}
                    >
                        <div>
                            <button>Inside</button>
                        </div>
                    </FocusTrapExtended>
                    <button>Outside</button>
                    <button onClick={() => setExtPaused(true)}>Pause True</button>
                    <button onClick={() => setExtPaused(false)}>Pause False</button>
                </div>
            );
        };

        render(<ExternalControlComponent />);

        const insideBtn = screen.getByRole("button", { name: "Inside" });
        const outsideBtn = screen.getByRole("button", { name: "Outside" });
        const pauseTrueBtn = screen.getByRole("button", { name: "Pause True" });
        const pauseFalseBtn = screen.getByRole("button", { name: "Pause False" });

        insideBtn.focus();

        await user.click(pauseTrueBtn);
        expect(currentPausedState).toBe(true);

        await user.click(pauseFalseBtn);
        expect(currentPausedState).toBe(false);

        await user.click(outsideBtn);
        expect(currentPausedState).toBe(false);
    });
});
