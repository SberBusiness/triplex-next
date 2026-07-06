import React from "react";
import clsx from "clsx";
import { setForwardedRef } from "../../helpers/setForwardedRef";
import { DEFAULT_BLUR, STATUS_CONFIG } from "./consts";
import { ESmartSpotAnimation, ESmartSpotStatus } from "./enums";
import { getSmartSpotFrame } from "./utils";
import styles from "./styles/SmartSpot.module.less";

/** Свойства компонента SmartSpot. */
export interface ISmartSpotProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус, задающий фон и цвета пятен. */
    status: ESmartSpotStatus;
    /** Пресет анимации. */
    animation?: ESmartSpotAnimation;
    /** Размытие, px. */
    blur?: number;
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
            className,
            style,
            children,
            ...restProps
        },
        ref,
    ) => {
        const moveRef = React.useRef<HTMLDivElement>(null);
        const { spots } = STATUS_CONFIG[status];

        React.useEffect(() => {
            const move = moveRef.current;

            if (!move) {
                return undefined;
            }

            const apply = (t: number) => {
                const frame = getSmartSpotFrame(animation, t);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_X", `${frame.x}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Move_Y", `${frame.y}px`);
                move.style.setProperty("--triplex-next-runtime-SmartSpot-Spot_Scale", String(frame.scale));
            };

            apply(0);

            if (animation === ESmartSpotAnimation.NONE) {
                return undefined;
            }

            const start = performance.now();
            let rafId = requestAnimationFrame(function tick(now) {
                apply(now - start);
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
                className={clsx(styles.smartSpot, styles[status], className)}
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
