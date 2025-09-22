import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UploadZone } from "../UploadZone";

const getDragArea = () => screen.getByTestId("uploadzone-drag-area");
const getInput = () => screen.getByTestId("uploadzone-input");

/**
 * Создаёт минимальный объект, похожий на FileList, для целей тестирования.
 * В JSDOM нет конструктора FileList/DataTransfer в Node-среде,
 * поэтому эмулируем ровно ту часть структуры, которую использует компонент.
 */
const createTestFileList = (files: File[]): FileList => {
    const fileList: Partial<FileList> & { [index: number]: File } = { length: files.length, item: (i: number) => files[i] ?? null };
    files.forEach((f, i) => (fileList[i] = f));
    return fileList as FileList;
};

describe("UploadZone", () => {
    /**
     * Smoke-тест: базовая структура присутствует и скрытый input отрендерен.
     */
    it("Should render drag area and input", () => {
        const onChange = vi.fn();

        render(
            <UploadZone onChange={onChange} data-testid="uploadzone-drag-area">
                {() => <UploadZone.Input data-testid="uploadzone-input" />}
            </UploadZone>
        );

        const area = getDragArea();
        expect(area).toBeInTheDocument();

        const input = getInput();
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "file");
    });

    it("Should open file dialog when drag area is clicked", () => {
        const onChange = vi.fn();
        const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => { });

        render(
            <UploadZone onChange={onChange} data-testid="uploadzone-drag-area">
                {() => <UploadZone.Input data-testid="uploadzone-input" />}
            </UploadZone>
        );

        fireEvent.click(getDragArea());
        expect(clickSpy).toHaveBeenCalledTimes(1);
        clickSpy.mockRestore();
    });

    it("Should open file dialog when children call openUploadDialog", () => {
        const onChange = vi.fn();
        const clickSpy = vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => { });

        render(
            <UploadZone onChange={onChange}>
                {({ openUploadDialog }) => (
                    <div>
                        {/**
                         * Важно: добавить UploadZone.Input, чтобы компонент установил ref на input,
                         * и openUploadDialog() смог вызвать input.click().
                         */}
                        <UploadZone.Input data-testid="uploadzone-input" />
                        <button type="button" onClick={openUploadDialog} data-testid="opener">Open</button>
                    </div>
                )}
            </UploadZone>
        );

        fireEvent.click(screen.getByTestId("opener"));
        expect(clickSpy).toHaveBeenCalledTimes(1);
        clickSpy.mockRestore();
    });

    it("Should call onChange when input value changes", () => {
        const onChange = vi.fn();

        render(
            <UploadZone onChange={onChange}>
                {() => <UploadZone.Input multiple data-testid="uploadzone-input" />}
            </UploadZone>
        );

        const input = getInput();
        const file = new File(["hello"], "hello.txt", { type: "text/plain" });
        // Мокаем FileList, так как DataTransfer недоступен в JSDOM.
        const files = createTestFileList([file]);

        fireEvent.change(input, { target: { files } });

        expect(onChange).toHaveBeenCalledTimes(1);
        const [filesArg] = onChange.mock.calls[0];
        expect((filesArg as FileList).length).toBe(1);
        expect((filesArg as FileList)[0].name).toBe("hello.txt");
    });

    it("Should show overlay on dragenter and handle drop with onDrop and onChange", async () => {
        const onChange = vi.fn();
        const onDrop = vi.fn();

        // Create external container to attach drag listeners and overlay
        const externalContainer = document.createElement("div");
        document.body.appendChild(externalContainer);

        render(
            <UploadZone onChange={onChange} onDrop={onDrop} dropZoneContainer={externalContainer}>
                {() => <UploadZone.Input data-testid="uploadzone-input" />}
            </UploadZone>
        );

        // Инициируем dragenter, чтобы смонтировать overlay.
        // Компонент вешает слушатели на переданный dropZoneContainer и рендерит overlay внутрь него.
        act(() => {
            externalContainer.dispatchEvent(new Event("dragenter", { bubbles: true }));
        });

        const getOverlay = () => externalContainer.querySelector("div[class*='uploadZoneContainerDragArea']") as HTMLDivElement | null;
        await waitFor(() => expect(getOverlay()).toBeTruthy());
        const overlay = getOverlay()!;

        // Делаем drop на overlay. Здесь проверяем только onDrop и жизненный цикл overlay,
        // так как поддержка DataTransfer в JSDOM ограничена.
        const droppedFiles = createTestFileList([new File(["content"], "file.png", { type: "image/png" })]);
        act(() => {
            fireEvent.drop(overlay, { dataTransfer: { files: droppedFiles } });
        });

        expect(onDrop).toHaveBeenCalledTimes(1);

        // Overlay должен удалиться после последовательности drag-leave/drop.
        // Компонент использует счётчик drag-событий; убедимся, что он обнуляется.
        act(() => {
            externalContainer.dispatchEvent(new Event("dragleave", { bubbles: true }));
        });
        await waitFor(() => expect(externalContainer.querySelector("div[class*='uploadZoneContainerDragArea']")).toBeNull());
    });

    it("Should call onDragOver prop when dragging over the overlay", async () => {
        const onDragOver = vi.fn();

        const externalContainer = document.createElement("div");
        document.body.appendChild(externalContainer);

        render(
            <UploadZone onChange={vi.fn()} onDragOver={onDragOver} dropZoneContainer={externalContainer}>
                {() => <UploadZone.Input />}
            </UploadZone>
        );

        // Монтируем overlay через dragenter.
        act(() => {
            externalContainer.dispatchEvent(new Event("dragenter", { bubbles: true }));
        });
        const getOverlay2 = () => externalContainer.querySelector("div[class*='uploadZoneContainerDragArea']");
        await waitFor(() => expect(getOverlay2()).toBeTruthy());
        const overlay = getOverlay2()!;

        // onDragOver из props проксируется оверлеем; проверяем, что он вызывается.
        fireEvent.dragOver(overlay);
        expect(onDragOver).toHaveBeenCalledTimes(1);
    });
});



