import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETagColorStatus } from "./enums";

/** Свойства компонента TagColor. */
export interface ITagColorProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Размер. Задаёт высоту, отступы, радиус скругления и размер текста. */
    size: EComponentSize;
    /** Статус. Определяет цвет фона. По умолчанию ETagColorStatus.DEFAULT. */
    status?: ETagColorStatus;
}
