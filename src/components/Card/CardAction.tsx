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

/** Состояния интерактивной карточки. */
interface ICardActionState {
    /** Выбрана или нет. */
    isSelected: boolean;
    /** Контролируемая или нет. */
    isControlled: boolean;
    /** Источник фокуса. */
    focusSource: EFocusSource;
}

/** Компонент "Интерактивная карточка". */
export class CardAction extends React.Component<ICardActionProps, ICardActionState> {
    public static displayName = "CardAction";

    public static Content = CardContent;
    public static Media = CardMedia;

    public state = {
        focusSource: EFocusSource.NONE,
        isControlled: this.props.selected !== undefined,
        isSelected: !!this.props.selected,
    };

    public componentDidUpdate(prevProps: Readonly<ICardActionProps>): void {
        const { selected, onToggle } = this.props;

        if (selected !== prevProps.selected) {
            onToggle?.(!!selected);
        }
    }

    private ref = React.createRef<HTMLDivElement>();

    public render(): JSX.Element {
        const {
            children,
            className,
            onClick,
            onMouseDown,
            onKeyDown,
            onFocus,
            onBlur,
            roundingSize = ECardRoundingSize.MD,
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

    public handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        const { onClick } = this.props;

        onClick?.(event);
        this.handleToggle();
    };

    public handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        const { onMouseDown } = this.props;
        const { focusSource } = this.state;

        onMouseDown?.(event);
        if (!focusSource) {
            this.setState({ focusSource: EFocusSource.MOUSE });
        }
    };

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

    public handleFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
        const { onFocus } = this.props;
        const { focusSource } = this.state;
        const { current } = this.ref;

        onFocus?.(event);
        if (!focusSource && current === event.target) {
            this.setState({ focusSource: EFocusSource.KEYBOARD });
        }
    };

    public handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
        const { onBlur } = this.props;
        const { current } = this.ref;

        onBlur?.(event);
        if (current !== document.activeElement && current === event.target) {
            this.setState({ focusSource: EFocusSource.NONE });
        }
    };

    public handleToggle = (): void => {
        const { toggle, selected, onToggle } = this.props;
        const { isControlled, isSelected } = this.state;

        if (isControlled) {
            toggle?.(!selected);
        } else {
            this.setState(
                (prevState) => ({ isSelected: !prevState.isSelected }),
                () => onToggle?.(!isSelected),
            );
        }
    };
}
