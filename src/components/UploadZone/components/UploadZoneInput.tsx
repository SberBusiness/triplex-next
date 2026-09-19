import React, { forwardRef, useCallback, useContext } from "react";
import clsx from "clsx";
import { UploadZoneContext } from "../UploadZoneContext";
import styles from "../styles/UploadZone.module.less";

/** Свойства компонента UploadZoneInput. */
export interface IUploadZoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {}

/**
 * Скрытое поле выбора файлов зоны загрузки.
 * Обработчик изменения берётся из контекста UploadZone — prop `onChange` у поля не поддерживается.
 */
export const UploadZoneInput = forwardRef<HTMLInputElement, IUploadZoneInputProps>(
    ({ className, ...restHtmlAttributes }, ref) => {
        const { onChange, setInputNode } = useContext(UploadZoneContext);

        const setRef = useCallback(
            (instance: HTMLInputElement | null) => {
                setInputNode(instance);

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            },
            [ref, setInputNode],
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.files, e);
        };

        /**
         * При прикладывании одного и того же файла (с тем же именем и по тому же пути),
         * пусть даже отличного по содержимому, не срабатывает событие onChange. Сброс значения это фиксит.
         * Решение подсмотрено:
         * https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component
         */
        const handleClick = (e: React.SyntheticEvent<HTMLInputElement>) => {
            e.currentTarget.value = "";
        };

        return (
            <input
                {...restHtmlAttributes}
                type="file"
                className={clsx(className, styles.uploadZoneInput)}
                onChange={handleChange}
                onClick={handleClick}
                ref={setRef}
            />
        );
    },
);

UploadZoneInput.displayName = "UploadZoneInput";
