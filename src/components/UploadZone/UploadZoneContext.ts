import React from "react";
import { UploadZoneOnChangeType } from "@sberbusiness/triplex-next/components/UploadZone/types";

/** Значение контекста зоны загрузки файлов. */
export interface IUploadZoneContext {
    /** Открытие диалогового окна выбора файла(ов). */
    openUploadDialog: () => void;
    /** Обработчик изменения значения. */
    onChange: UploadZoneOnChangeType;
    /** Установка ссылки на элемент поля. */
    setInputNode: (inputNode: HTMLInputElement | null) => void;
}

/** Контекст, через который UploadZone связывается со своим полем выбора файлов. */
export const UploadZoneContext = React.createContext<IUploadZoneContext>({
    onChange: () => void 0,
    openUploadDialog: () => void 0,
    setInputNode: () => void 0,
});
