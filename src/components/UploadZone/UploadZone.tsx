import React, { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { UploadZoneInput } from "./components/UploadZoneInput";
import { UploadZoneContext } from "./UploadZoneContext";
import { UploadZoneOnChangeType } from "./types";
import { MobileView } from "../MobileView";
import { Button, EButtonTheme } from "../Button";
import { EComponentSize } from "../../enums/EComponentSize";
import { ETextSize, Text } from "../Typography";
import { HelpBox } from "../HelpBox";
import { ETooltipSize } from "../Tooltip";
import styles from "./styles/UploadZone.module.less";

export interface IUploadZoneChildrenProvideProps {
    /** Открытие диалогового окна выбора файла(ов). */
    openUploadDialog: () => void;
}

/** Свойства компонента UploadZone. */
interface IUploadZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
    /** В качестве чилда передаётся функция. */
    children: (props: IUploadZoneChildrenProvideProps) => React.ReactNode;
    /** Обработчик изменения значения. */
    onChange: UploadZoneOnChangeType;
    /** Контейнер для дроп-зоны. */
    dropZoneContainer?: HTMLElement | null;
    /** Рендер-функция контента над контейнером. */
    renderContainerContent?: () => JSX.Element;
}

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
        const [inputNode, setInputNode] = useState<HTMLInputElement | undefined>(undefined);

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

        const addListeners = useCallback(
            (dropZoneContainer: HTMLElement | null | undefined) => {
                if (!dropZoneContainer) {
                    return;
                }

                dropZoneContainer.addEventListener("dragenter", handleDragEnter);
                dropZoneContainer.addEventListener("dragleave", handleDragLeave);
            },
            [handleDragEnter, handleDragLeave],
        );

        const removeListeners = useCallback(
            (dropZoneContainer: HTMLElement | null | undefined) => {
                if (!dropZoneContainer) {
                    return;
                }

                dropZoneContainer.removeEventListener("dragenter", handleDragEnter);
                dropZoneContainer.removeEventListener("dragleave", handleDragLeave);
            },
            [handleDragEnter, handleDragLeave],
        );

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
                    key="uploadZoneDragArea"
                    role="none"
                >
                    {renderContainerContent?.()}
                </div>,
                wrapperDiv,
            );

            return wrapperDiv;
        }, [className, handlePreventDefault, fileDrop, renderContainerContent, restHtmlAttributes]);

        useEffect(() => {
            addListeners(dropZoneContainer);
            return () => {
                removeListeners(dropZoneContainer);
            };
        }, [dropZoneContainer, addListeners, removeListeners]);

        useEffect(() => {
            if (!dropZoneContainer) {
                return;
            }

            if (hoverOnDrag) {
                dropZoneWrapperDivRef.current = createDropZoneDiv();
                dropZoneContainer.appendChild(dropZoneWrapperDivRef.current);
            } else if (dropZoneWrapperDivRef.current) {
                dropZoneContainer.removeChild(dropZoneWrapperDivRef.current);
            }
        }, [hoverOnDrag, dropZoneContainer, createDropZoneDiv]);

        const openUploadDialog = () => {
            inputNode?.click();
        };

        const handleAreaClick = (e: React.SyntheticEvent) => {
            e.stopPropagation();
            openUploadDialog();
        };

        const renderUploadZoneDesktop = () => (
            <div className={styles.uploadZoneDesktop} data-tx={process.env.npm_package_version} ref={ref}>
                <div
                    className={clsx(styles.uploadZoneDragArea, className)}
                    onClick={handleAreaClick}
                    {...restHtmlAttributes}
                    key="uploadZoneDragArea"
                    role="none"
                />
                {children({ openUploadDialog })}
            </div>
        );

        const renderUploadZoneMobile = () => (
            <div className={styles.uploadZoneMobile} data-tx={process.env.npm_package_version} ref={ref}>
                <div className={styles.uploadZoneMobileHeader}>
                    <Text size={ETextSize.B3}>Файлы для импорта</Text>
                    <HelpBox tooltipSize={ETooltipSize.SM}>Helpbox text</HelpBox>
                </div>

                <div className={styles.uploadZoneInput}>{children({ openUploadDialog })}</div>

                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={handleAreaClick}>
                    Загрузить
                </Button>
            </div>
        );

        return (
            <UploadZoneContext.Provider
                value={{
                    inputNode,
                    onChange,
                    openUploadDialog,
                    setInputNode,
                }}
            >
                <MobileView fallback={renderUploadZoneDesktop()}>{renderUploadZoneMobile()}</MobileView>
            </UploadZoneContext.Provider>
        );
    }),
    {
        Input: UploadZoneInput,
    },
);

UploadZone.displayName = "UploadZone";
