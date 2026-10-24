import React from "react";
import clsx from "clsx";
import { useLatestRef } from "../../utils/refs";
import { DEFAULT_BLUR, ISmartSpotSpot, SPOTS_BY_TYPE } from "./consts";
import { ESmartSpotAnimation, ESmartSpotShape, ESmartSpotType } from "./enums";
import { getSmartSpotDuration, getSmartSpotFrame } from "./utils";
import styles from "./styles/SmartSpot.module.less";

/** Свойства компонента SmartSpot. */
export interface ISmartSpotProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип: задаёт цвета и набор пятен. */
    type: ESmartSpotType;
    /** Пресет анимации. По умолчанию ESmartSpotAnimation.DRIFT. */
    animation?: ESmartSpotAnimation;
    /** Размытие слоя пятен, px. По умолчанию 60. */
    blur?: number;
    /** Дистанция движения слоя пятен (радиус эллипса по горизонтали), px. По умолчанию 50. Влияет только на Drift. @default 50 */
    distance?: number;
    /** Длительность одного цикла анимации, мс. По умолчанию 6000. Смена значения не перезапускает анимацию. @default 6000 */
    duration?: number;
    /** Форма пятен. По умолчанию ESmartSpotShape.CIRCLE. */
    shape?: ESmartSpotShape;
}

/** Inline-стиль корня: размытие слоя пятен. */
interface ISmartSpotStyle extends React.CSSProperties {
    "--triplex-next-runtime-SmartSpot-Blur_Sigma": string;
}

/** Inline-стиль пятна: геометрия и прозрачность из SPOTS_BY_TYPE. */
interface ISmartSpotSpotStyle extends React.CSSProperties {
    "--triplex-next-runtime-SmartSpot-Spot_X": string;
    "--triplex-next-runtime-SmartSpot-Spot_Y": string;
    "--triplex-next-runtime-SmartSpot-Spot_Size": string;
    "--triplex-next-runtime-SmartSpot-Spot_Opacity": number;
}

const getSpotStyle = ({ x, y, diameter, opacity }: ISmartSpotSpot): ISmartSpotSpotStyle => ({
    "--triplex-next-runtime-SmartSpot-Spot_X": `${x}px`,
    "--triplex-next-runtime-SmartSpot-Spot_Y": `${y}px`,
    "--triplex-next-runtime-SmartSpot-Spot_Size": `${diameter}px`,
    "--triplex-next-runtime-SmartSpot-Spot_Opacity": opacity,
});

/**
 * Подложка статуса на прозрачном фоне: четыре размытых пятна, которые анимируются по выбранному пресету.
 * Заполняет родителя; children отображаются поверх подложки.
 */
export const SmartSpot = React.forwardRef<HTMLDivElement, ISmartSpotProps>(
    (
        {
            type,
            animation = ESmartSpotAnimation.DRIFT,
            blur = DEFAULT_BLUR,
            distance,
            duration,
            shape = ESmartSpotShape.CIRCLE,
            className,
            style,
            children,
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

        const rootStyle: ISmartSpotStyle = {
            ...style,
            "--triplex-next-runtime-SmartSpot-Blur_Sigma": `${blur}px`,
        };

        return (
            <div
                {...restProps}
                className={clsx(styles.smartSpot, styles[type], styles[shape], className)}
                style={rootStyle}
                ref={ref}
            >
                <div className={styles.blur} aria-hidden="true">
                    <div className={styles.move} ref={moveRef}>
                        {SPOTS_BY_TYPE[type].map((spot, index) => (
                            <span key={index} className={styles.spot} style={getSpotStyle(spot)} />
                        ))}
                    </div>
                </div>
                {children && <div className={styles.content}>{children}</div>}
            </div>
        );
    },
);

SmartSpot.displayName = "SmartSpot";
