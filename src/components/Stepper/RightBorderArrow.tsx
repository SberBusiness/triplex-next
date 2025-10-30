import styles from "./styles/StepperStep.module.less";
import { EStepperSize } from "./enums";

interface IRightBorderArrow {
    /** Размер шага.*/
    size: EStepperSize;
}

/** Компонент RightBorderArrow. */

export const RightBorderArrow = ({ size }: IRightBorderArrow) => {
    switch (size) {
        case EStepperSize.SM:
            return (
                <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14.000000"
                    height="28.000000"
                    viewBox="0 0 14 28"
                    focusable="false"
                >
                    <path
                        d="M7.6 25.26C6.38 26.97 4.41 28 2.3 28L0 28C0 17.33 0 10.66 0 0L2.3 0C4.41 0 6.38 1.02 7.6 2.73L13.16 11.39C14.27 12.95 14.27 15.04 13.16 16.6L7.6 25.26Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.6 25.26C6.38 26.97 4.41 28 2.3 28L0 28L0 27L2.3 27C4.08 27 5.76 26.13 6.79 24.68L12.35 16.02C13.21 14.81 13.21 13.18 12.35 11.97L6.79 3.31C5.76 1.86 4.08 1 2.3 1L0 1L0 0L2.3 0C4.41 0 6.38 1.02 7.6 2.73L13.16 11.39C14.27 12.95 14.27 15.04 13.16 16.6L7.6 25.26Z"
                    />
                </svg>
            );
        case EStepperSize.MD:
            return (
                <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="40"
                    viewBox="0 0 20 40"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.64 37.26C10.42 38.97 8.44 39.99 6.32 39.99L0 39.99L0 0L6.32 0C8.43 0 10.42 1.02 11.64 2.73L19.37 17.37C20.2 18.98 20.2 20.98 19.37 22.58L11.64 37.26Z"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.64 37.26C10.42 38.97 8.44 39.99 6.33 39.99L0 39.99L0 38.99L6.33 38.99C8.11 38.99 9.79 38.13 10.82 36.68L18.55 22C19.2 20.98 19.2 18.98 18.55 17.95L10.82 3.31C9.79 1.86 8.11 1 6.32 1L0 1L0 0L6.32 0C8.43 0 10.42 1.02 11.64 2.73L19.37 17.37C20.2 18.98 20.2 20.98 19.37 22.58L11.64 37.26Z"
                    />
                </svg>
            );
        case EStepperSize.LG:
            return (
                <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.001953"
                    height="56.000000"
                    viewBox="0 0 22.002 56"
                    focusable="false"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.64 49.25C11.64 49.25 8.5 56 6.33 56L0 55.98L0 0L6.32 0C8.43 0 11.64 6.73 11.64 6.73L21.37 25.37C22.21 26.97 22.2 28.97 21.37 30.58L11.64 49.25Z"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.64 49.25C11.64 49.25 8.5 56 6.33 56L0 55.98L0 54.98L6.33 54.98C7.72 54.98 10.82 48.67 10.82 48.67L20.55 30C21.2 28.97 21.2 26.97 20.56 25.95L10.83 7.31C10.83 7.31 7.79 0.99 6.33 0.99L0 0.99L0 0L6.32 0C8.44 0 11.64 6.73 11.64 6.73L21.37 25.37C22.21 26.97 22.2 28.97 21.37 30.58L11.64 49.25Z"
                    />
                </svg>
            );
        default:
            return (
                <svg
                    className={styles.arrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14.000000"
                    height="28.000000"
                    viewBox="0 0 14 28"
                    focusable="false"
                >
                    <path
                        d="M7.6 25.26C6.38 26.97 4.41 28 2.3 28L0 28C0 17.33 0 10.66 0 0L2.3 0C4.41 0 6.38 1.02 7.6 2.73L13.16 11.39C14.27 12.95 14.27 15.04 13.16 16.6L7.6 25.26Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.6 25.26C6.38 26.97 4.41 28 2.3 28L0 28L0 27L2.3 27C4.08 27 5.76 26.13 6.79 24.68L12.35 16.02C13.21 14.81 13.21 13.18 12.35 11.97L6.79 3.31C5.76 1.86 4.08 1 2.3 1L0 1L0 0L2.3 0C4.41 0 6.38 1.02 7.6 2.73L13.16 11.39C14.27 12.95 14.27 15.04 13.16 16.6L7.6 25.26Z"
                    />
                </svg>
            );
    }
};
