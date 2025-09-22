import React from "react";
import { createRoot } from 'react-dom/client';
import clsx from "clsx";
import styles from "./styles/UploadZone.module.less";
// Не менять import на абсолютный.
import { UploadZoneInput } from "./components/UploadZoneInput";

export type UploadZoneOnChangeType = (files: FileList | null, e: React.SyntheticEvent) => void;

export interface IUploadZoneChildrenProvideProps {
    /** Открытие диалогового окна выбора файла(ов). */
    openUploadDialog: () => void;
}

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

/** Состояния компонента UploadZone. */
interface IUploadZoneState {
    /** Состояние ховера при перетаскивании. */
    hoverOnDrag: boolean;
    /** Ссылка на элемент поля. */
    inputNode?: HTMLInputElement;
}

/** Компонент зоны загрузки файлов. */
export class UploadZone extends React.PureComponent<IUploadZoneProps, IUploadZoneState> {
    public static displayName = "UploadZone";
    public static Input = UploadZoneInput;

    // Описание - https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element.
    // Если counter > 0 - означает, что перетаскиваемый объект в пределах окна браузера.
    /** Каунтер для подсчёта drag-перемещений по странице. */
    private counter = 0;

    /** Элемент-обёртка для дроп-зоны. */
    private dropZoneWrapperDiv: HTMLDivElement | null = null;

    state: IUploadZoneState = {
        hoverOnDrag: false,
        inputNode: undefined,
    };

    componentDidMount(): void {
        this.addListeners(this.props.dropZoneContainer);
    }

    componentDidUpdate(prevProps: Readonly<IUploadZoneProps>, prevState: Readonly<IUploadZoneState>): void {
        const { dropZoneContainer } = this.props;
        const { hoverOnDrag } = this.state;

        if (dropZoneContainer !== prevProps.dropZoneContainer) {
            this.removeListeners(prevProps.dropZoneContainer);
            this.addListeners(dropZoneContainer);
        }

        if (hoverOnDrag !== prevState.hoverOnDrag && dropZoneContainer) {
            if (hoverOnDrag) {
                this.dropZoneWrapperDiv = this.createDropZoneDiv();
                dropZoneContainer.appendChild(this.dropZoneWrapperDiv);
            } else {
                this.dropZoneWrapperDiv && dropZoneContainer.removeChild(this.dropZoneWrapperDiv);
            }
        }
    }

    componentWillUnmount(): void {
        this.removeListeners(this.props.dropZoneContainer);
    }

    render() {
        const { children, className, onChange, renderContainerContent, dropZoneContainer, ...rest } = this.props;
        const { inputNode } = this.state;

        return (
            <UploadZoneContext.Provider
                value={{
                    inputNode,
                    onChange,
                    openUploadDialog: this.openUploadDialog,
                    setInputNode: (node) => {
                        this.setState({ inputNode: node });
                    },
                }}
            >
                <div className={styles.uploadZone} data-tx={process.env.npm_package_version}>
                    <div
                        className={clsx(styles.uploadZoneDragArea, className)}
                        onClick={this.handleAreaClick}
                        {...rest}
                        key="uploadZoneDragArea"
                        role="none"
                    />
                    {children({ openUploadDialog: this.openUploadDialog })}
                </div>
            </UploadZoneContext.Provider>
        );
    }

    private addListeners = (dropZoneContainer: HTMLElement | null | undefined) => {
        if (!dropZoneContainer) {
            return;
        }

        dropZoneContainer.addEventListener("dragenter", this.handleDragEnter);
        dropZoneContainer.addEventListener("dragleave", this.handleDragLeave);
    };

    private removeListeners = (dropZoneContainer: HTMLElement | null | undefined) => {
        if (!dropZoneContainer) {
            return;
        }

        dropZoneContainer.removeEventListener("dragenter", this.handleDragEnter);
        dropZoneContainer.removeEventListener("dragleave", this.handleDragLeave);
    };

    private createDropZoneDiv = (): HTMLDivElement => {
        const { children, className, onChange, renderContainerContent, dropZoneContainer, ...restHtmlAttributes } =
            this.props;
        const wrapperDiv = document.createElement("div");
        createRoot(wrapperDiv).render(  
            <div
                className={clsx(styles.uploadZoneContainerDragArea, className)}
                onDragOver={this.handlePreventDefault}
                onDrop={this.fileDrop}
                {...restHtmlAttributes}
                key="uploadZoneDragArea"
                role="none"
            >
                {renderContainerContent?.()}
            </div>
        );

        return wrapperDiv;
    };

    private handleAreaClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        this.openUploadDialog();
    };

    private openUploadDialog = () => {
        const { inputNode } = this.state;
        inputNode?.click();
    };

    private handlePreventDefault = (e: React.DragEvent<HTMLDivElement>) => {
        const { onDragOver } = this.props;

        e.preventDefault();
        onDragOver?.(e);
    };

    private handleDragEnter = () => {
        this.counter++;
        if (this.counter === 1) {
            this.setState({ hoverOnDrag: true });
        }
    };

    private handleDragLeave = () => {
        this.counter--;
        if (this.counter === 0) {
            this.setState({ hoverOnDrag: false });
        }
    };

    private fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const { onDrop, onChange } = this.props;

        e.preventDefault();
        onDrop?.(e);

        onChange(e.dataTransfer.files, e);
        this.setState({ hoverOnDrag: false });
        this.counter = 0;
    };
}
