import React from "react";
import { TooltipDesktopBase } from "@sberbusiness/triplex-next/components/Tooltip/components/desktop/components/TooltipDesktopBase";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ITooltipDesktopProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Десктоп версия компонента Tooltip. */
export class TooltipDesktop extends React.Component<ITooltipDesktopProps> {
    public static displayName = "TooltipDesktop";
    public static contextType = TooltipContext;

    declare context: React.ContextType<typeof TooltipContext>;

    private tooltip: Element | null = null;
    private timeout?: number;

    public render(): JSX.Element {
        const { children, toggleType, ...rest } = this.props;

        return <TooltipDesktopBase {...rest} setTooltipRef={this.setTooltipRef} />;
    }

    public componentDidMount(): void {
        const { toggleType, targetRef } = this.props;

        // Если Tooltip открывается по клику, то должен уметь закрываться по клику вне и по Esc.
        if (this.props.isOpen) {
            document.addEventListener("click", this.closeIfOuterAction);
            document.addEventListener("keydown", this.closeIfEscapeKey);
        }

        if (targetRef.current && toggleType === "hover") {
            this.addHoverListeners(targetRef.current);
        }
    }

    public componentDidUpdate(prevProps: Readonly<ITooltipDesktopProps>): void {
        const { targetRef } = this.props;
        const isOpen = !prevProps.isOpen && this.props.isOpen;
        const isClosed = prevProps.isOpen && !this.props.isOpen;

        // Tooltip открылся.
        if (isOpen) {
            document.addEventListener("mousedown", this.closeIfOuterAction);
            document.addEventListener("keydown", this.closeIfEscapeKey);
        }

        // Tooltip закрылся.
        if (isClosed) {
            document.removeEventListener("mousedown", this.closeIfOuterAction);
            document.removeEventListener("keydown", this.closeIfEscapeKey);

            if (this.props.toggleType === "hover") {
                this.removeHoverListeners(this.tooltip!);
            }
        }

        if (targetRef.current && prevProps.toggleType != this.props.toggleType) {
            if (this.props.toggleType === "hover") {
                this.addHoverListeners(targetRef.current);
            } else if (prevProps.toggleType === "hover") {
                this.removeHoverListeners(targetRef.current);
            }
        }
    }

    public componentWillUnmount(): void {
        const { toggleType, targetRef } = this.props;

        document.removeEventListener("mousedown", this.closeIfOuterAction);
        document.removeEventListener("keydown", this.closeIfEscapeKey);

        if (targetRef.current && toggleType === "hover") {
            this.removeHoverListeners(targetRef.current);
        }

        clearTimeout(this.timeout);
    }

    private setTooltipRef = (node: HTMLDivElement | null) => {
        const { toggleType } = this.props;

        if (node && toggleType === "hover") {
            this.addHoverListeners(node);
        }

        this.tooltip = node;
    };

    // Закрываем Tooltip при клике за его пределами.
    private closeIfOuterAction = (event: Event) => {
        const { targetRef } = this.props;
        const { setTooltipOpen } = this.context;

        if (targetRef.current && this.tooltip) {
            const outOfTarget = !targetRef.current.contains(event.target as Node);
            const outOfTooltip = !this.tooltip.contains(event.target as Node);

            if (outOfTarget && outOfTooltip) {
                setTooltipOpen(false);
            }
        }
    };

    // Закрываем Tooltip по нажатию Esc
    private closeIfEscapeKey = (event: KeyboardEvent) => {
        const key = event.code || event.keyCode;

        if (isKey(key, "ESCAPE")) {
            this.context.setTooltipOpen(false);
        }
    };

    private addHoverListeners = (element: Element) => {
        element.addEventListener("mouseenter", this.handleMouseEnter);
        element.addEventListener("mouseleave", this.handleMouseLeave);
    };

    private removeHoverListeners = (element: Element) => {
        element.removeEventListener("mouseenter", this.handleMouseEnter);
        element.removeEventListener("mouseleave", this.handleMouseLeave);
    };

    private handleMouseEnter = () => {
        const { tooltipOpen, targetHoveredRef, setTooltipOpen } = this.context;

        if (!tooltipOpen) {
            setTooltipOpen(true);
            targetHoveredRef.current = true;
        }
        clearTimeout(this.timeout);
    };

    private handleMouseLeave = () => {
        const { setTooltipOpen } = this.context;

        this.timeout = window.setTimeout(() => {
            setTooltipOpen(false);
        }, 500);
    };
}
