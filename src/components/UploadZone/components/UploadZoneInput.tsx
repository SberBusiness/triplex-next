import React from "react";
import { UploadZoneContext } from "../UploadZoneContext";
import clsx from "clsx";
import styles from "../styles/UploadZone.module.less";

export interface IUploadZoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {}

/** Компонент поля для зоны загрузки файлов. */
export const UploadZoneInput: React.FC<IUploadZoneInputProps> = ({ className, ...restHtmlAttributes }) => {
    const context = React.useContext(UploadZoneContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.onChange(e.target.files, e);
    };

    /**
     * Обработчик нажатия пользователем на инпут (кнопку) выбора файла.
     *
     * @param {React.SyntheticEvent<HTMLInputElement>} e Событие.
     */
    const handleClick = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        /*
         *При прикладывании одного и того же файла (должен быть с тем же именем и по тому же пути),
         *пусть даже отличного по содержимому, не срабатывает событие onChange. Данный обработчик это фиксит.
         *Решение подсмотрено:
         *https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component
         */
        e.currentTarget.value = "";
    };

    return (
        <input
            {...restHtmlAttributes}
            type="file"
            className={clsx(className, styles.uploadZoneInput)}
            onChange={handleChange}
            onClick={handleClick}
            ref={context.setInputNode}
            key="uploadZoneInput"
        />
    );
};

UploadZoneInput.displayName = "UploadZone";
