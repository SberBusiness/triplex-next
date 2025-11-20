import React from "react";
import { IAccordionBaseProps } from "../types";
import { uniqueId } from "lodash-es";
import { ExpandAnimation } from "../../ExpandAnimation/ExpandAnimation";
import clsx from "clsx";

/**
 * Состояние AccordionBase.
 *
 * @prop {boolean} animating Анимируется в текущий момент.
 * @prop {boolean} controlled Управляемый аккордеон или неконтролируемый.
 * @prop {boolean} isOpen Флаг раскрытости.
 */
interface IAccordionState {
    animating: boolean;
    controlled: boolean;
    isOpen: boolean;
}

/**
 * Базовый компонент Accordion.
 */
export class AccordionBase extends React.Component<IAccordionBaseProps, IAccordionState> {
    public displayName = "AccordionBase";

    // Уникальный id, для передачи a11y aria-атрибутов в header и body.
    private instanceId = `AccordionBase-${uniqueId()}`;

    constructor(props: IAccordionBaseProps) {
        super(props);

        this.state = {
            animating: false,
            controlled: typeof props.isOpen !== "undefined",
            isOpen: Boolean(props.isOpen),
        };
    }

    public componentDidUpdate(prevProps: IAccordionBaseProps): void {
        const { isOpen } = this.props;
        const { isOpen: prevIsOpen } = prevProps;

        if (isOpen !== prevIsOpen) {
            this.setState({ animating: true });
        }
    }

    public render(): React.ReactElement {
        const header = this.renderHeader();
        const body = this.renderBody();

        return (
            <>
                {header}
                {body}
            </>
        );
    }

    private renderHeader = () => {
        const { renderHeader, isOpen: isOpenProps } = this.props;
        const { animating, controlled, isOpen: isOpenState } = this.state;
        const isOpen = Boolean(controlled ? isOpenProps : isOpenState);

        return renderHeader({
            animating,
            ariaAttributes: {
                controls: this.instanceId,
                expanded: isOpen.toString(),
            },
            isOpen,
            toggle: this.toggle,
        });
    };

    /**
     * Раскрывает/скрывает контент аккордеона.
     */
    private toggle = () => {
        const { controlled, isOpen: isOpenState } = this.state;
        const { toggle, isOpen: isOpenProps } = this.props;
        const isOpen = Boolean(controlled ? isOpenProps : isOpenState);

        if (controlled) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            toggle && toggle(!isOpen);
        } else {
            this.setState((prevState) => ({
                animating: true,
                isOpen: !prevState.isOpen,
            }));
        }
    };

    private handleAnimationEnd = () => {
        const { controlled, isOpen: isOpenState } = this.state;
        const { onToggle, isOpen: isOpenProps } = this.props;
        const isOpen = Boolean(controlled ? isOpenProps : isOpenState);

        this.setState({ animating: false }, () => {
            if (onToggle) {
                onToggle(isOpen);
            }
        });
    };

    private renderBody = () => {
        const { expandAnimationClassName, renderBody, isOpen: isOpenProps } = this.props;
        const { animating, controlled, isOpen: isOpenState } = this.state;
        const isOpen = Boolean(controlled ? isOpenProps : isOpenState);

        return (
            <ExpandAnimation
                className={clsx(expandAnimationClassName, {
                    "cssClass[globalExpandAnimationAnimating]": animating,
                    "cssClass[globalExpandAnimationOpened]": isOpen,
                })}
                expanded={isOpen}
                onEnd={this.handleAnimationEnd}
                id={this.instanceId}
            >
                {renderBody({
                    animating,
                    isOpen,
                    toggle: this.toggle,
                })}
            </ExpandAnimation>
        );
    };
}
