import React from "react";
import clsx from "clsx";
import { useLatestRef } from "../../utils/refs";
import { DEFAULT_BLUR } from "./consts";
import { ESmartSpotAnimation, ESmartSpotShape } from "./enums";
import { getSmartSpotDuration, getSmartSpotFrame } from "./utils";
import styles from "./styles/SmartSpot.module.less";

/** Свойства компонента SmartSpot. */
export interface ISmartSpotProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
    /** CSS-стили фигуры. backgroundColor переопределяет токен заливки фигуры. */
    style?: React.CSSProperties;
    /** Пресет анимации. По умолчанию ESmartSpotAnimation.DRIFT. */
    animation?: ESmartSpotAnimation;
    /** Размытие фигуры, px. По умолчанию 60. */
    blur?: number;
    /** Дистанция движения фигуры (радиус эллипса по горизонтали), px. По умолчанию 50. Влияет только на Drift. @default 50 */
    distance?: number;
    /** Длительность одного цикла анимации, мс. По умолчанию 6000. Смена значения не перезапускает анимацию. @default 6000 */
    duration?: number;
    /** Форма пятна. По умолчанию ESmartSpotShape.CIRCLE. */
    shape?: ESmartSpotShape;
}

interface ISmartSpotStyle extends React.CSSProperties {
    "--triplex-next-runtime-SmartSpot-Blur_Sigma": string;
    "--triplex-next-runtime-SmartSpot-Spot_Color"?: string;
}

/** Отдельная декоративная фигура с настраиваемым цветом, размытием и анимацией. */
export const SmartSpot = React.forwardRef<HTMLDivElement, ISmartSpotProps>(
    (
        {
            animation = ESmartSpotAnimation.DRIFT,
            blur = DEFAULT_BLUR,
            distance,
            duration,
            shape = ESmartSpotShape.CIRCLE,
            className,
            style,
            ...restProps
        },
        ref,
    ) => {
        const moveRef = React.useRef<HTMLDivElement>(null);
        // distance и duration читаются в каждом кадре, поэтому их смена не перезапускает анимацию.
        const distanceRef = useLatestRef(distance);
        const durationRef = useLatestRef(duration);

        React.useEffect(() => {
            const move = moveRef.current;

            if (!move) {
                return undefined;
            }

            // Кадр пишется напрямую в style слоя, чтобы не вызывать ререндер на каждом кадре.
            const applyFrame = (t: number) => {
                const frame = getSmartSpotFrame(animation, t, {
                    distance: distanceRef.current,
                    duration: durationRef.current,
                });

                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_X", `${frame.x}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_Y", `${frame.y}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Spot_Scale", String(frame.scale));
            };

            applyFrame(0);

            if (animation === ESmartSpotAnimation.NONE) {
                return undefined;
            }

            // Прогресс цикла (0..1) накапливается по кадрам, поэтому при смене duration движение продолжается
            // с текущей точки, а не перескакивает.
            let progress = 0;
            let lastTime = performance.now();
            let rafId = requestAnimationFrame(function tick(now) {
                const period = getSmartSpotDuration(animation, durationRef.current);

                if (period > 0) {
                    // Метка первого кадра может оказаться раньше performance.now() на момент запуска.
                    progress = (progress + Math.max(0, now - lastTime) / period) % 1;
                }
                lastTime = now;
                applyFrame(progress * period);
                rafId = requestAnimationFrame(tick);
            });

            return () => cancelAnimationFrame(rafId);
        }, [animation, distanceRef, durationRef]);

        const { backgroundColor, ...layoutStyle } = style ?? {};
        const rootStyle: ISmartSpotStyle = {
            ...layoutStyle,
            "--triplex-next-runtime-SmartSpot-Blur_Sigma": `${blur}px`,
            "--triplex-next-runtime-SmartSpot-Spot_Color": backgroundColor,
        };

        return (
            <div
                {...restProps}
                className={clsx(styles.smartSpot, styles[shape], className)}
                style={rootStyle}
                ref={ref}
                aria-hidden="true"
            >
                <div className={styles.move} ref={moveRef}>
                    <span className={styles.spot} />
                </div>
            </div>
        );
    },
);

SmartSpot.displayName = "SmartSpot";
