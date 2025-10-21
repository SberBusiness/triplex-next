import React, { useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import styles from "./styles/ExpandAnimation.module.less";
import { clsx } from "clsx";

/** Свойства компонента ExpandAnimation. */
export interface IExpandAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Время анимации (мс). */
    animationTime?: number;
    /** Развёрнут ли компонент. */
    expanded: boolean;
    /** Коллбэк на начало анимации. */
    onStart?: () => void;
    /** Коллбэк на окончание анимации. */
    onEnd?: () => void;
    /** Свойства компонента Transition (react-transition-group). */
    transitionProps?: React.ComponentProps<typeof Transition<HTMLDivElement>>;
}

// Время исполнения анимации по-умолчанию.
const TIMEOUT_DEFAULT = 300;

/** Компонент анимации сворачивания/разворачивания контента. */
export const ExpandAnimation = React.forwardRef<HTMLDivElement, IExpandAnimationProps>(
    (
        {
            children,
            className,
            expanded,
            animationTime = TIMEOUT_DEFAULT,
            style,
            onStart,
            onEnd,
            transitionProps,
            ...rest
        },
        ref,
    ) => {
        const transitionStylesRef = useRef<Record<TransitionStatus, React.CSSProperties>>({
            entering: { height: undefined, overflow: "hidden" },
            entered: {},
            exiting: { height: 0, overflow: "hidden" },
            exited: { height: 0, overflow: "hidden", visibility: "hidden" },
            unmounted: {},
        });
        const nodeRef = useRef<HTMLDivElement | null>(null);

        const handleEnter = (appearing: boolean) => {
            if (nodeRef.current) {
                transitionStylesRef.current["entering"].height = nodeRef.current.scrollHeight;
            }

            onStart?.();
            transitionProps?.onEnter?.(appearing);
        };

        const handleEntered = (appearing: boolean) => {
            onEnd?.();
            transitionProps?.onEntered?.(appearing);
        };

        const handleExit = () => {
            if (nodeRef.current) {
                nodeRef.current.style.height = nodeRef.current.scrollHeight + "px";
                // trigger reflow
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                nodeRef.current.scrollHeight;
            }

            onStart?.();
            transitionProps?.onExit?.();
        };

        const handleExited = () => {
            onEnd?.();
            transitionProps?.onExited?.();
        };

        const setRef = (instance: HTMLDivElement | null) => {
            nodeRef.current = instance;

            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <Transition
                in={expanded}
                timeout={animationTime}
                nodeRef={nodeRef}
                {...transitionProps}
                onEnter={handleEnter}
                onEntered={handleEntered}
                onExit={handleExit}
                onExited={handleExited}
            >
                {(state) => (
                    <div
                        className={clsx(styles.expandAnimation, className)}
                        style={{
                            transitionDuration: animationTime + "ms",
                            ...transitionStylesRef.current[state],
                            ...style,
                        }}
                        {...rest}
                        ref={setRef}
                    >
                        {children}
                    </div>
                )}
            </Transition>
        );
    },
);

ExpandAnimation.displayName = "ExpandAnimation";
