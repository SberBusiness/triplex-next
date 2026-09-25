import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UploadZone } from "../UploadZone";
import { UploadZoneInput } from "../components/UploadZoneInput";

/**
 * Создаёт минимальный объект, похожий на FileList, для целей тестирования.
 * В JSDOM нет конструктора FileList/DataTransfer в Node-среде,
 * поэтому эмулируем ровно ту часть структуры, которую использует компонент.
 */
const createTestFileList = (files: File[]): FileList => {
    const fileList: Partial<FileList> & { [index: number]: File } = {
        length: files.length,
        item: (i: number) => files[i] ?? null,
    };
    files.forEach((f, i) => (fileList[i] = f));

    return fileList as FileList;
};

const renderInput = (props: React.ComponentProps<typeof UploadZoneInput> = {}, onChange = vi.fn()) => {
    render(
        <UploadZone onChange={onChange}>
            {() => <UploadZoneInput data-testid="uploadzone-input" {...props} />}
        </UploadZone>,
    );

    return { input: screen.getByTestId("uploadzone-input"), onChange };
};

describe("UploadZoneInput", () => {
    it("Should render file input", () => {
        const { input } = renderInput();

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "file");
        expect(input).toHaveClass("uploadZoneInput");
    });

    it("Should merge custom className", () => {
        const { input } = renderInput({ className: "custom-class" });

        expect(input).toHaveClass("custom-class");
        expect(input).toHaveClass("uploadZoneInput");
    });

    it("Should spread rest html attributes", () => {
        const { input } = renderInput({ multiple: true, accept: ".png" });

        expect(input).toHaveAttribute("multiple");
        expect(input).toHaveAttribute("accept", ".png");
    });

    it("Should forward ref to the input element", () => {
        const ref = React.createRef<HTMLInputElement>();

        render(
            <UploadZone onChange={vi.fn()}>
                {() => <UploadZoneInput ref={ref} data-testid="uploadzone-input" />}
            </UploadZone>,
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(screen.getByTestId("uploadzone-input"));
    });

    it("Should support callback ref", () => {
        const setRef = vi.fn();

        render(
            <UploadZone onChange={vi.fn()}>
                {() => <UploadZoneInput ref={setRef} data-testid="uploadzone-input" />}
            </UploadZone>,
        );

        expect(setRef).toHaveBeenCalledWith(screen.getByTestId("uploadzone-input"));
    });

    it("Should call onChange of UploadZone with files and event", () => {
        const { input, onChange } = renderInput({ multiple: true });
        const files = createTestFileList([new File(["hello"], "hello.txt", { type: "text/plain" })]);

        fireEvent.change(input, { target: { files } });

        expect(onChange).toHaveBeenCalledTimes(1);
        const [filesArg, eventArg] = onChange.mock.calls[0];
        expect((filesArg as FileList)[0].name).toBe("hello.txt");
        expect((eventArg as React.SyntheticEvent).target).toBe(input);
    });

    it("Should reset value on click to allow selecting the same file twice", () => {
        const { input } = renderInput();

        // Поле не даёт выставить value программно на непустое значение (security),
        // поэтому проверяем сам факт сброса: обработчик клика обнуляет value.
        const setValue = vi.fn();
        Object.defineProperty(input, "value", {
            configurable: true,
            get: () => "C:\\fakepath\\hello.txt",
            set: setValue,
        });

        fireEvent.click(input);

        expect(setValue).toHaveBeenCalledWith("");
    });

    it("Should render without UploadZone provider", () => {
        render(<UploadZoneInput data-testid="uploadzone-input" />);

        const input = screen.getByTestId("uploadzone-input");
        const files = createTestFileList([new File(["hello"], "hello.txt", { type: "text/plain" })]);

        // Дефолтное значение контекста — no-op, поэтому изменение не должно бросать исключение.
        expect(() => fireEvent.change(input, { target: { files } })).not.toThrow();
    });
});
