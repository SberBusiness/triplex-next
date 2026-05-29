import React, { useContext } from "react";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";

/** Состояние навигации, передаваемое в render-функцию `ImageGalleryExtended.Nav`. */
export interface IImageGalleryNavState {
    /** Перейти к предыдущему изображению. */
    onPrev: () => void;
    /** Перейти к следующему изображению. */
    onNext: () => void;
    /** Активна первая картинка (переход «назад» недоступен). */
    isFirst: boolean;
    /** Активна последняя картинка (переход «вперёд» недоступен). */
    isLast: boolean;
    /** Индекс активного изображения. */
    selectedIndex: number;
    /** Всего изображений в галерее. */
    itemsCount: number;
}

/** Свойства ImageGalleryExtendedNav. */
export interface IImageGalleryExtendedNavProps {
    /**
     * Render-функция: получает состояние навигации и возвращает разметку стрелок
     * (например, `ImageGalleryExtended.Arrow` или произвольные кнопки).
     */
    children: (state: IImageGalleryNavState) => React.ReactNode;
}

/**
 * Поставщик состояния навигации через render-функцию. Собственной разметки не
 * добавляет — рендерит только результат `children`. Данные берёт из контекста
 * `ImageGalleryExtended`, поэтому размещается внутри дерева галереи (обычно как
 * child `ImageGalleryExtended.Main`, где стрелки позиционируются поверх картинки).
 */
export const ImageGalleryExtendedNav: React.FC<IImageGalleryExtendedNavProps> = ({ children }) => {
    const { items, selectedIndex, onPrev, onNext } = useContext(ImageGalleryExtendedContext);
    const itemsCount = items.length;

    return (
        <>
            {children({
                onPrev,
                onNext,
                isFirst: selectedIndex === 0,
                isLast: selectedIndex === itemsCount - 1,
                selectedIndex,
                itemsCount,
            })}
        </>
    );
};

ImageGalleryExtendedNav.displayName = "ImageGalleryExtendedNav";
