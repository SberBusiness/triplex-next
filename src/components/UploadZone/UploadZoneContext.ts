import React from "react";
import { UploadZoneOnChangeType } from "@sberbusiness/triplex-next/components/UploadZone/types";

export interface IUploadZoneContext {
    /** Открытие диалогового окна выбора файла(ов). */
    openUploadDialog: () => void;
    /** Обработчик изменения значения. */
    onChange: UploadZoneOnChangeType;
    /** Установка ссылки на элемент поля. */
    setInputNode?: (inputNode: HTMLInputElement) => void;
    /** Ссылка на элемент поля. */
    inputNode?: HTMLInputElement;
}

export const UploadZoneContext = React.createContext<IUploadZoneContext>({
    onChange: () => void 0,
    openUploadDialog: () => void 0,
});
