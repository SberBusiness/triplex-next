import React, { useState, useEffect, useRef, useCallback, useMemo, forwardRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { UploadZoneInput } from "./components/UploadZoneInput";
import { UploadZoneContext } from "./UploadZoneContext";
import { UploadZoneOnChangeType } from "./types";
import styles from "./styles/UploadZone.module.less";

/** Свойства, которые UploadZone передаёт в children-функцию. */
export interface IUploadZoneChildrenProvideProps {
    /** Открытие диалогового окна выбора файла(ов). */
    openUploadDialog: () => void;
}

/** Свойства компонента UploadZone. */
export interface IUploadZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
    /** В качестве чилда передаётся функция. */
    children: (props: IUploadZoneChildrenProvideProps) => React.ReactNode;
    /** Обработчик изменения значения. */
    onChange: UploadZoneOnChangeType;
    /** Контейнер для дроп-зоны. */
    dropZoneContainer?: HTMLElement | null;
    /** Рендер-функция контента над контейнером. */
    renderContainerContent?: () => JSX.Element;
}

/**
 * Зона загрузки файлов. Рендерит кликабельную область поверх своего содержимого и,
 * если передан `dropZoneContainer`, показывает поверх него дроп-зону во время перетаскивания файлов.
 */
export const UploadZone = Object.assign(
    forwardRef<HTMLDivElement, IUploadZoneProps>((props, ref) => {
        const {
            dropZoneContainer,
            children,
            className,
            onChange,
            renderContainerContent,
            onDrop,
            onDragOver,
            ...restHtmlAttributes
        } = props;

        const [hoverOnDrag, setHoverOnDrag] = useState(false);
        const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

        // Описание - https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element.
        // Если counter > 0 - означает, что перетаскиваемый объект в пределах окна браузера.
        /** Каунтер для подсчёта drag-перемещений по странице. */
        const counterRef = useRef(0);

        /** Элемент-обёртка для дроп-зоны. */
        const dropZoneWrapperDivRef = useRef<HTMLDivElement | null>(null);
        const handleDragEnter = useCallback(() => {
            counterRef.current += 1;
            if (counterRef.current === 1) {
                setHoverOnDrag(true);
            }
        }, []);

        const handleDragLeave = useCallback(() => {
            counterRef.current -= 1;
            if (counterRef.current === 0) {
                setHoverOnDrag(false);
            }
        }, []);

        const handlePreventDefault = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                onDragOver?.(e);
            },
            [onDragOver],
        );

        const fileDrop = useCallback(
            (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                onDrop?.(e);

                onChange(e.dataTransfer.files, e);
                setHoverOnDrag(false);
                counterRef.current = 0;
            },
            [onChange, onDrop],
        );

        const createDropZoneDiv = useCallback((): HTMLDivElement => {
            const wrapperDiv = document.createElement("div");

            ReactDOM.render(
                <div
                    className={clsx(styles.uploadZoneContainerDragArea, className)}
                    onDragOver={handlePreventDefault}
                    onDrop={fileDrop}
                    {...restHtmlAttributes}
                    role="none"
                >
                    {renderContainerContent?.()}
                </div>,
                wrapperDiv,
            );

            return wrapperDiv;
        }, [className, handlePreventDefault, fileDrop, renderContainerContent, restHtmlAttributes]);

        const cleanupDropZone = useCallback(() => {
            const dropZoneWrapperDiv = dropZoneWrapperDivRef.current;
            if (!dropZoneWrapperDiv) {
                return;
            }

            ReactDOM.unmountComponentAtNode(dropZoneWrapperDiv);

            if (dropZoneWrapperDiv.parentNode) {
                dropZoneWrapperDiv.parentNode.removeChild(dropZoneWrapperDiv);
            }

            dropZoneWrapperDivRef.current = null;
        }, []);

        useEffect(() => {
            if (!dropZoneContainer) {
                return;
            }

            dropZoneContainer.addEventListener("dragenter", handleDragEnter);
            dropZoneContainer.addEventListener("dragleave", handleDragLeave);

            return () => {
                dropZoneContainer.removeEventListener("dragenter", handleDragEnter);
                dropZoneContainer.removeEventListener("dragleave", handleDragLeave);
            };
        }, [dropZoneContainer, handleDragEnter, handleDragLeave]);

        useEffect(() => {
            if (!dropZoneContainer) {
                return;
            }

            if (hoverOnDrag) {
                const isDropZoneMounted =
                    dropZoneWrapperDivRef.current && dropZoneContainer.contains(dropZoneWrapperDivRef.current);

                if (!isDropZoneMounted) {
                    cleanupDropZone();
                    dropZoneWrapperDivRef.current = createDropZoneDiv();
                    dropZoneContainer.appendChild(dropZoneWrapperDivRef.current);
                }
            } else {
                cleanupDropZone();
            }
        }, [hoverOnDrag, dropZoneContainer, createDropZoneDiv, cleanupDropZone]);

        useEffect(
            () => () => {
                cleanupDropZone();
                counterRef.current = 0;
            },
            [cleanupDropZone],
        );

        const openUploadDialog = useCallback(() => {
            inputNode?.click();
        }, [inputNode]);

        const handleAreaClick = useCallback(
            (e: React.SyntheticEvent) => {
                e.stopPropagation();
                openUploadDialog();
            },
            [openUploadDialog],
        );

        // openUploadDialog в контекст не кладётся: наружу он уходит через children({ openUploadDialog }),
        // а UploadZoneInput читает из контекста только onChange и setInputNode.
        const contextValue = useMemo(() => ({ onChange, setInputNode }), [onChange]);

        return (
            <UploadZoneContext.Provider value={contextValue}>
                <div className={styles.uploadZone} data-tx={process.env.npm_package_version} ref={ref}>
                    <div
                        className={clsx(styles.uploadZoneDragArea, className)}
                        onClick={handleAreaClick}
                        {...restHtmlAttributes}
                        role="none"
                    />
                    {children({ openUploadDialog })}
                </div>
            </UploadZoneContext.Provider>
        );
    }),
    {
        Input: UploadZoneInput,
    },
);

UploadZone.displayName = "UploadZone";
