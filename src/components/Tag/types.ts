import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { IButtonIconProps } from "@sberbusiness/triplex-next/components/Button";

/** Свойства компонента Tag. */
export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Уникальный идентификатор. */
    id: string;
    /** Размер. */
    size: EComponentSize;
    /** Отключенное состояние. */
    disabled?: boolean;
    /** Колбэк-функция при редактировании. */
    onEdit?: (id: string) => void;
    /** Колбэк-функция при удалении. */
    onRemove?: (id: string) => void;
    /** Дополнительные свойства для кнопки редактирования. */
    editButtonProps?: IButtonIconProps;
    /** Дополнительные свойства для кнопки удаления. */
    removeButtonProps?: IButtonIconProps;
}
