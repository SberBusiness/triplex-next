import { describe, it, expect } from "vitest";
import { lockBodyScroll } from "../bodyScrollLock";

describe("lockBodyScroll", () => {
    it("adds the class to body and removes it on unlock", () => {
        const unlock = lockBodyScroll("lock-a");

        expect(document.body).toHaveClass("lock-a");

        unlock();

        expect(document.body).not.toHaveClass("lock-a");
    });

    it("keeps the class until the last lock with the same class is released", () => {
        const unlockFirst = lockBodyScroll("lock-a");
        const unlockSecond = lockBodyScroll("lock-a");

        unlockFirst();

        expect(document.body).toHaveClass("lock-a");

        unlockSecond();

        expect(document.body).not.toHaveClass("lock-a");
    });

    it("ignores repeated unlock calls", () => {
        const unlockFirst = lockBodyScroll("lock-a");
        const unlockSecond = lockBodyScroll("lock-a");

        unlockFirst();
        unlockFirst();

        expect(document.body).toHaveClass("lock-a");

        unlockSecond();

        expect(document.body).not.toHaveClass("lock-a");
    });

    it("counts locks separately for each class", () => {
        const unlockA = lockBodyScroll("lock-a");
        const unlockB = lockBodyScroll("lock-b");

        unlockA();

        expect(document.body).not.toHaveClass("lock-a");
        expect(document.body).toHaveClass("lock-b");

        unlockB();

        expect(document.body).not.toHaveClass("lock-b");
    });
});
