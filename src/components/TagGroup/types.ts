import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента TagGroup. */
export interface ITagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер. */
    size: EComponentSize;
}
