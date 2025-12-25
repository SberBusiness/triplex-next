import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETagColorStatus } from "./enums";

/** Свойства компонента Tag. */
export interface ITagColorProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Размер. */
    size: EComponentSize;
    /** Статус. */
    status?: ETagColorStatus;
}
