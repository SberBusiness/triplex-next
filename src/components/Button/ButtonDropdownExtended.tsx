import React from "react";
import { Dropdown } from "@sberbusiness/triplex-next/components/Dropdown/Dropdown";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { DropdownList } from "@sberbusiness/triplex-next/components/Dropdown/desktop/DropdownList";
import clsx from "clsx";
import styles from "./styles/ButtonDropdownExtended.module.less";

/** Состояния кнопки с выпадающим блоком. */
interface IButtonDropdownExtendedState {
    /** Состояние контролируемости. */
    isControlled: boolean;
    /** Состояние открытости. */
    isOpened?: boolean;
}

/** Свойства встроенной кнопки. */
export interface IButtonDropdownExtendedButtonProvideProps {
    /** Контролируемое состояние открытости. */
    opened: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened: (opened: boolean) => void;
}

/** Свойства встроенного выпадающего блока. */
export interface IButtonDropdownExtendedDropdownProvideProps {
    /** Контролируемое состояние открытости. */
    opened: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened: (opened: boolean) => void;
    /** Пробрасываемый стилевой класс. */
    className: string;
}

/** Свойства кнопки с выпадающим блоком. */
export interface IButtonDropdownExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытости. */
    opened?: boolean;
    /** Функция, контролирующая состояние открытости. */
    setOpened?: (opened: boolean) => void;
    /** Функция, отрисовывающая кнопку. */
    renderButton: (props: IButtonDropdownExtendedButtonProvideProps) => React.ReactNode;
    /** Функция, отрисовывающая выпадающий блок. */
    renderDropdown: (props: IButtonDropdownExtendedDropdownProvideProps) => React.ReactNode;
    /** Ссылка на выпадающий блок. */
    dropdownRef: React.RefObject<HTMLElement>;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. */
    closeOnTab?: boolean;
}

/**
 * Компонент "Кнопка с выпадающим блоком".
 * Позволяет кастомизировать кнопку открытия Dropdown и сам Dropdown.
 * */
export class ButtonDropdownExtended extends React.Component<
    IButtonDropdownExtendedProps,
    IButtonDropdownExtendedState
> {
    public static Dropdown = Dropdown;
    public static DropdownList = DropdownList;

    constructor(props: IButtonDropdownExtendedProps) {
        super(props);

        this.state = {
            isControlled: props.opened !== undefined,
            isOpened: props.opened === undefined ? false : undefined,
        };
    }

    private ref = React.createRef<HTMLDivElement>();

    private getOpened = (): boolean => {
        const { opened } = this.props;
        const { isControlled, isOpened } = this.state;

        return !!(isControlled ? opened : isOpened);
    };

    private handleOpen = (opened: boolean) => {
        const { setOpened } = this.props;
        const { isControlled } = this.state;

        isControlled ? setOpened!(opened) : this.setState({ isOpened: opened });
    };

    private handleKeyDown = (event: KeyboardEvent) => {
        const { closeOnTab } = this.props;
        const key = event.code || event.keyCode;

        if (this.getOpened()) {
            if (isKey(key, "ESCAPE") || (closeOnTab && isKey(key, "TAB"))) {
                this.handleOpen(false);
            }
        }
    };

    private handleClickOutside = (event: UIEvent) => {
        const { current: button } = this.ref;
        const { current: dropdown } = this.props.dropdownRef;

        if (this.getOpened()) {
            if (!button?.contains(event.target as Node) && !dropdown?.contains(event.target as Node)) {
                this.handleOpen(false);
            }
        }
    };

    private addListeners(): void {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("touchstart", this.handleClickOutside);
    }

    private removeListeners(): void {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("touchstart", this.handleClickOutside);
    }

    public componentDidMount(): void {
        if (this.getOpened()) {
            this.addListeners();
        }
    }

    public componentDidUpdate(
        prevProps: Readonly<IButtonDropdownExtendedProps>,
        prevState: Readonly<IButtonDropdownExtendedState>
    ): void {
        const { opened } = this.props;
        const { isOpened, isControlled } = this.state;
        const { opened: prevOpened } = prevProps;
        const { isOpened: prevIsOpened } = prevState;

        if (isControlled) {
            if (opened && !prevOpened) {
                this.addListeners();
            } else if (!opened && prevOpened) {
                this.removeListeners();
            }
        } else {
            if (isOpened && !prevIsOpened) {
                this.addListeners();
            } else if (!isOpened && prevIsOpened) {
                this.removeListeners();
            }
        }
    }

    public componentWillUnmount(): void {
        if (this.getOpened()) {
            this.removeListeners();
        }
    }

    public render(): JSX.Element {
        const { className, opened, setOpened, renderButton, renderDropdown, dropdownRef, closeOnTab, ...props } =
            this.props;
        const classNames = clsx(styles.buttonDropdownExtended, className);

        return (
            <div className={classNames} ref={this.ref} {...props}>
                {renderButton({ opened: this.getOpened(), setOpened: this.handleOpen })}
                {renderDropdown({
                    className: styles.buttonDropdownExtendedBlock,
                    opened: this.getOpened(),
                    setOpened: this.handleOpen,
                })}
            </div>
        );
    }
}
