import clsx from "clsx";
import React from "react";
import styles from "./styles/Gap.module.less";

/** Возможные размеры вертикального отступа Gap, в пикселях. */
export type TGapSize = 4 | 8 | 12 | 16 | 24 | 32 | 64 | 128;

/** Свойства компонента Gap. */
export interface IGapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Высота отступа в пикселях. Дискретный набор значений из шкалы дизайн-системы. */
    size: TGapSize;
}

/** Вертикальный отступ-разделитель между блоками. Рендерит `div` с `role="presentation"` и фиксированной высотой. */
export const Gap = React.forwardRef<HTMLDivElement, IGapProps>(({ className, size, ...restProps }, ref) => (
    <div className={clsx(styles[`size${size}`], className)} role="presentation" {...restProps} ref={ref} />
));

Gap.displayName = "Gap";
