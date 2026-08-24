import React, { useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { clsx } from "clsx";
import styles from "./styles/ExpandAnimation.module.less";

/** Свойства компонента ExpandAnimation. */
export interface IExpandAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Время анимации (мс). По умолчанию 300. */
    animationTime?: number;
    /** Развёрнут ли компонент. */
    expanded: boolean;
    /** Коллбэк на начало анимации. Вызывается и при разворачивании, и при сворачивании. */
    onStart?: () => void;
    /** Коллбэк на окончание анимации. Вызывается и при разворачивании, и при сворачивании. */
    onEnd?: () => void;
    /** Свойства компонента Transition (react-transition-group). */
    transitionProps?: React.ComponentProps<typeof Transition<HTMLDivElement>>;
}

/** Время исполнения анимации по умолчанию (мс). */
const TIMEOUT_DEFAULT = 300;

/**
 * Инлайн-стили корневого элемента по фазам анимации.
 *
 * Карта живёт в ref и мутируется: `entering.height` проставляется в `onEnter`
 * реальной высотой контента (`scrollHeight`) до того, как Transition отрисует
 * фазу `entering`. Свёрнутое состояние (`exited`) дополнительно скрывается
 * через `visibility: hidden`, чтобы контент не получал фокус по Tab.
 */
const createTransitionStyles = (): Record<TransitionStatus, React.CSSProperties> => ({
    entering: { height: undefined, overflow: "hidden" },
    entered: {},
    exiting: { height: 0, overflow: "hidden" },
    exited: { height: 0, overflow: "hidden", visibility: "hidden" },
    unmounted: {},
});

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
        // Ленивая инициализация: карта создаётся один раз и дальше мутируется, поэтому
        // пересоздавать её на каждом рендере нельзя — потерялась бы измеренная высота.
        const transitionStylesRef = useRef<Record<TransitionStatus, React.CSSProperties> | null>(null);

        if (transitionStylesRef.current === null) {
            transitionStylesRef.current = createTransitionStyles();
        }

        const transitionStyles = transitionStylesRef.current;
        const nodeRef = useRef<HTMLDivElement | null>(null);

        const handleEnter = (appearing: boolean) => {
            if (nodeRef.current) {
                // Высота контента измеряется до отрисовки фазы entering — иначе анимировать не от чего.
                transitionStyles.entering.height = nodeRef.current.scrollHeight;
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
                // Фиксируем текущую высоту вместо auto, чтобы браузеру было от какого значения анимировать к 0.
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
                            ...transitionStyles[state],
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
