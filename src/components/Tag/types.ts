import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { IButtonIconProps } from "@sberbusiness/triplex-next/components/Button";

/** Свойства компонента Tag. */
export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Содержимое тега — выбранное значение параметра. Длинный текст обрезается многоточием. */
    children?: React.ReactNode;
    /**
     * Уникальный идентификатор тега. Передаётся аргументом в onEdit и onRemove, чтобы потребитель
     * понял, какой тег группы изменили. На корневой элемент как атрибут id не попадает.
     */
    id: string;
    /** Размер. Влияет на высоту тега, размер текста и размер иконок в кнопках. */
    size: EComponentSize;
    /**
     * Отключенное состояние: текст приглушается, обе кнопки блокируются. По умолчанию false.
     * Собственный disabled в editButtonProps или removeButtonProps перекрывает это значение.
     */
    disabled?: boolean;
    /** Колбэк-функция при редактировании. Получает id тега. Кнопка редактирования рендерится, только если колбэк передан. */
    onEdit?: (id: string) => void;
    /** Колбэк-функция при удалении. Получает id тега. Кнопка удаления рендерится всегда. */
    onRemove?: (id: string) => void;
    /** Дополнительные свойства для кнопки редактирования. Здесь потребитель задаёт aria-label. */
    editButtonProps?: IButtonIconProps;
    /** Дополнительные свойства для кнопки удаления. Здесь потребитель задаёт aria-label. */
    removeButtonProps?: IButtonIconProps;
}
