import React from "react";
import clsx from "clsx";
import { setForwardedRef } from "../../helpers/setForwardedRef";
import { DEFAULT_BLUR, STATUS_CONFIG } from "./consts";
import { ESmartSpotAnimation, ESmartSpotStatus } from "./enums";
import { getSmartSpotDuration, getSmartSpotFrame } from "./utils";
import styles from "./styles/SmartSpot.module.less";

/** Свойства компонента SmartSpot. */
export interface ISmartSpotProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус, задающий фон и цвета пятен. */
    status: ESmartSpotStatus;
    /** Пресет анимации. */
    animation?: ESmartSpotAnimation;
    /** Размытие, px. */
    blur?: number;
    /** Дистанция движения слоя пятен (радиус по горизонтали), px. По умолчанию — значение пресета. Не влияет на Breathing. */
    distance?: number;
    /** Длительность одного цикла анимации, мс. По умолчанию — значение пресета. */
    duration?: number;
    /** Скрывает сплошной фон статуса, остаются только пятна. */
    hideBackground?: boolean;
}

interface IStyle extends React.CSSProperties {
    "--triplex-next-runtime-SmartSpot-Blur_Sigma": string;
}

interface ISpotStyle extends React.CSSProperties {
    "--triplex-next-runtime-SmartSpot-Spot_X": string;
    "--triplex-next-runtime-SmartSpot-Spot_Y": string;
    "--triplex-next-runtime-SmartSpot-Spot_Size": string;
    "--triplex-next-runtime-SmartSpot-Spot_Opacity": number;
}

/**
 * Подложка статуса: сплошной фон, поверх него четыре овальных пятна. Слой пятен размыт гауссом и медленно двигается.
 * Заполняет родителя; children отображаются поверх подложки.
 */
export const SmartSpot = React.forwardRef<HTMLDivElement, ISmartSpotProps>(
    (
        {
            status,
            animation = ESmartSpotAnimation.DRIFT,
            blur = DEFAULT_BLUR,
            distance,
            duration,
            hideBackground = false,
            className,
            style,
            children,
            ...restProps
        },
        ref,
    ) => {
        const moveRef = React.useRef<HTMLDivElement>(null);
        // Параметры движения читаются в каждом кадре, чтобы их смена не перезапускала анимацию.
        const motionRef = React.useRef({ distance, duration });
        motionRef.current = { distance, duration };
        const { spots } = STATUS_CONFIG[status];

        React.useEffect(() => {
            const move = moveRef.current;

            if (!move) {
                return undefined;
            }

            const apply = (t: number) => {
                const frame = getSmartSpotFrame(animation, t, motionRef.current);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_X", `${frame.x}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_Y", `${frame.y}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Spot_Scale", String(frame.scale));
            };

            apply(0);

            if (animation === ESmartSpotAnimation.NONE) {
                return undefined;
            }

            // Прогресс цикла (0..1) накапливается по кадрам, поэтому при смене duration движение продолжается
            // с текущей точки, а не перескакивает.
            let progress = 0;
            let last = performance.now();
            let rafId = requestAnimationFrame(function tick(now) {
                const period = getSmartSpotDuration(animation, motionRef.current.duration);

                if (period > 0) {
                    progress = (progress + (now - last) / period) % 1;
                }
                last = now;
                apply(progress * period);
                rafId = requestAnimationFrame(tick);
            });

            return () => cancelAnimationFrame(rafId);
        }, [animation]);

        const rootStyle: IStyle = {
            ...style,
            "--triplex-next-runtime-SmartSpot-Blur_Sigma": `${blur}px`,
        };

        return (
            <div
                {...restProps}
                className={clsx(
                    styles.smartSpot,
                    styles[status],
                    { [styles.hideBackground]: hideBackground },
                    className,
                )}
                style={rootStyle}
                ref={(node) => setForwardedRef(ref, node)}
            >
                <div className={styles.blur} aria-hidden="true">
                    <div className={styles.move} ref={moveRef}>
                        {spots.map((spot, index) => {
                            const spotStyle: ISpotStyle = {
                                "--triplex-next-runtime-SmartSpot-Spot_X": `${spot.x}px`,
                                "--triplex-next-runtime-SmartSpot-Spot_Y": `${spot.y}px`,
                                "--triplex-next-runtime-SmartSpot-Spot_Size": `${spot.diameter}px`,
                                "--triplex-next-runtime-SmartSpot-Spot_Opacity": spot.opacity,
                            };

                            return <span key={index} className={styles.spot} style={spotStyle} />;
                        })}
                    </div>
                </div>
                {children && <div className={styles.content}>{children}</div>}
            </div>
        );
    },
);

SmartSpot.displayName = "SmartSpot";
