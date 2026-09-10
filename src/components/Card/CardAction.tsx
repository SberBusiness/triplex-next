import React from "react";
import { ICardActionProps } from "@sberbusiness/triplex-next/components/Card/types";
import { CardContent } from "@sberbusiness/triplex-next/components/Card/components/CardContent/CardContent";
import { CardMedia } from "@sberbusiness/triplex-next/components/Card/components/CardMedia";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";
import { EFocusSource } from "@sberbusiness/triplex-next/enums/EFocusSource";
import {
    mapCardRoundingSizeToCssClass,
    mapCardThemeToCssClass,
} from "@sberbusiness/triplex-next/components/Card/utils";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import clsx from "clsx";
import actionStyles from "./styles/Action.module.less";
import cardStyles from "./styles/Card.module.less";

/** Состояние интерактивной карточки. */
interface ICardActionState {
    /** Выбрана карточка или нет. Используется только в неконтролируемом режиме. */
    isSelected: boolean;
    /** Контролируется ли состояние выбора извне. Определяется один раз при монтировании по наличию prop selected. */
    isControlled: boolean;
    /** Источник фокуса. Обводка фокуса показывается только для EFocusSource.KEYBOARD. */
    focusSource: EFocusSource;
}

/**
 * Компонент "Интерактивная карточка".
 * Работает в двух режимах: неконтролируемом — состояние выбора хранится внутри компонента, и
 * контролируемом (передан prop selected) — состояние задаётся снаружи, а компонент сообщает о
 * запросе на его смену через prop toggle.
 */
export class CardAction extends React.Component<ICardActionProps, ICardActionState> {
    public static displayName = "CardAction";

    /** Контент карточки. */
    public static Content = CardContent;
    /** Медийный элемент карточки. */
    public static Media = CardMedia;

    public state = {
        focusSource: EFocusSource.NONE,
        isControlled: this.props.selected !== undefined,
        isSelected: !!this.props.selected,
    };

    /** Ссылка на корневой элемент карточки. */
    private ref = React.createRef<HTMLDivElement>();

    public componentDidUpdate(prevProps: Readonly<ICardActionProps>): void {
        const { selected, onToggle } = this.props;

        if (selected !== prevProps.selected) {
            onToggle?.(!!selected);
        }
    }

    public render(): JSX.Element {
        const {
            children,
            className,
            // Обработчики вызываются из собственных handle*-методов, поэтому не попадают в attributes напрямую.
            onClick,
            onMouseDown,
            onKeyDown,
            onFocus,
            onBlur,
            roundingSize = ECardRoundingSize.MD,
            // onToggle и toggle не являются DOM-атрибутами и исключаются из attributes.
            onToggle,
            selected,
            toggle,
            theme = ECardTheme.GENERAL,
            ...attributes
        } = this.props;
        const { isControlled, isSelected, focusSource } = this.state;
        const classNames = clsx(
            cardStyles.card,
            actionStyles.action,
            mapCardThemeToCssClass[theme],
            mapCardRoundingSizeToCssClass[roundingSize],
            {
                [actionStyles.focusVisible]: focusSource === EFocusSource.KEYBOARD,
                [actionStyles.selected]: isControlled ? !!selected : isSelected,
            },
            className,
        );

        return (
            <div
                className={classNames}
                tabIndex={0}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                role="button"
                {...attributes}
                ref={this.ref}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        );
    }

    /** Обработчик клика по карточке. Переключает состояние выбора. */
    public handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        const { onClick } = this.props;

        onClick?.(event);
        this.handleToggle();
    };

    /** Обработчик нажатия мышью. Запоминает источник фокуса, чтобы не показывать обводку фокуса. */
    public handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        const { onMouseDown } = this.props;
        const { focusSource } = this.state;

        onMouseDown?.(event);
        if (focusSource === EFocusSource.NONE) {
            this.setState({ focusSource: EFocusSource.MOUSE });
        }
    };

    /** Обработчик нажатия клавиши. Space и Enter переключают состояние выбора, Space гасит прокрутку страницы. */
    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const { onKeyDown } = this.props;

        onKeyDown?.(event);
        if (isKey(event.keyCode, "SPACE")) {
            event.preventDefault();
            this.handleToggle();
        } else if (isKey(event.keyCode, "ENTER")) {
            this.handleToggle();
        }
    };

    /** Обработчик получения фокуса. Фокус на самой карточке без предшествующего клика считается клавиатурным. */
    public handleFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
        const { onFocus } = this.props;
        const { focusSource } = this.state;
        const { current } = this.ref;

        onFocus?.(event);
        if (focusSource === EFocusSource.NONE && current === event.target) {
            this.setState({ focusSource: EFocusSource.KEYBOARD });
        }
    };

    /** Обработчик потери фокуса. Сбрасывает источник фокуса, когда карточка перестала быть активным элементом. */
    public handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
        const { onBlur } = this.props;
        const { current } = this.ref;

        onBlur?.(event);
        if (current !== document.activeElement && current === event.target) {
            this.setState({ focusSource: EFocusSource.NONE });
        }
    };

    /**
     * Переключает состояние выбора. В контролируемом режиме только вызывает toggle со следующим значением,
     * в неконтролируемом — меняет внутреннее состояние и вызывает onToggle.
     */
    public handleToggle = (): void => {
        const { toggle, selected, onToggle } = this.props;
        const { isControlled } = this.state;

        if (isControlled) {
            toggle?.(!selected);
        } else {
            // Колбэк setState выполняется после применения обновления, поэтому onToggle
            // получает актуальное состояние, а не снимок, сделанный до вызова.
            this.setState(
                (prevState) => ({ isSelected: !prevState.isSelected }),
                () => onToggle?.(this.state.isSelected),
            );
        }
    };
}
