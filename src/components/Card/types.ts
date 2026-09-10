import React from "react";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";

/** Свойства карточки. */
export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер скругления карточки. По умолчанию ECardRoundingSize.MD. */
    roundingSize?: ECardRoundingSize;
    /** Тема оформления карточки. По умолчанию ECardTheme.GENERAL. */
    theme?: ECardTheme;
}

/** Свойства интерактивной карточки. */
export interface ICardActionProps extends ICardProps {
    /** Обработчик изменения состояния выбора. Вызывается с новым значением selected. */
    onToggle?: (selected: boolean) => void;
    /** Состояние выбора в контролируемом режиме. Если prop не передан при монтировании, карточка работает в неконтролируемом режиме. */
    selected?: boolean;
    /** Запрос на смену состояния выбора в контролируемом режиме. Вызывается со следующим значением selected. */
    toggle?: (selected: boolean) => void;
}
