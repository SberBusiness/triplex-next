import React from "react";
import {
    ETooltipAlign,
    ETooltipAxesType,
    ETooltipEndCoordinates,
    ETooltipFlowTypes,
    ETooltipPreferPlace,
    ETooltipSize,
    ETooltipSizeParameter,
    ETooltipStartCoordinates,
    ETooltipTypeName,
} from "@sberbusiness/triplex-next/components/Tooltip/enums";

/** Интерфейс координат X. */
export interface ITooltipXCoordinates {
    /** Начало координат Х. */
    start: ETooltipStartCoordinates.X;
    /** Конец координат Х. */
    end: ETooltipEndCoordinates.X;
    /** Тип параметра размера (для X - ширина). */
    size: ETooltipSizeParameter.W;
}

/** Интерфейс координат Y. */
export interface ITooltipYCoordinates {
    /** Начало координат Y. */
    start: ETooltipStartCoordinates.Y;
    /** Конец координат Y. */
    end: ETooltipEndCoordinates.Y;
    /** Тип параметра размера (для y - высота). */
    size: ETooltipSizeParameter.H;
}

/** Интерфейс оси ряд. */
export interface ITooltipRow {
    /** Главная ось. */
    [ETooltipAxesType.MAIN]: TTooltipAxesCoordinates;
    /** Вспомогательная/поперечная/перекрестная ось. */
    [ETooltipAxesType.CROSS]: TTooltipAxesCoordinates;
}
/** Интерфейс оси столбца. */
export interface ITooltipColumn extends ITooltipRow {}

/** Интерфейс координат для разного потока flex. */
export interface ITooltipAxes {
    [ETooltipFlowTypes.ROW]: ITooltipRow;
    [ETooltipFlowTypes.COLUMN]: ITooltipColumn;
}

/** Интерфейс координат. */
interface ITooltipCoordinates {
    [ETooltipStartCoordinates.X]: number;
    [ETooltipEndCoordinates.X]: number;
    [ETooltipStartCoordinates.Y]: number;
    [ETooltipEndCoordinates.Y]: number;
}

/** Интерфейс размеров. */
export interface ITooltipSize {
    [ETooltipSizeParameter.H]: number;
    [ETooltipSizeParameter.W]: number;
}

/** Интерфейс границ. */
export interface ITooltipBounds extends ITooltipSize, ITooltipCoordinates {}

/** Интерфейс длин осей. */
interface ITooltipAxesLength {
    /** Длина вспомогательной/поперечной/перекрестной оси. */
    crossLength: number;
    /** Длина основной оси. */
    mainLength: number;
}

/** Интерфейс границ без размеров. */
export interface ITooltipRelPosition extends ITooltipAxesLength, ITooltipCoordinates {}

/** Интерфейс занимаемой области с параметрами позиционирования. */
export interface ITooltipDomainSize extends ITooltipSize {
    [ETooltipTypeName.FLOW]: ETooltipFlowTypes;
    [ETooltipTypeName.STANDING]: ETooltipPreferPlace;
    [ETooltipTypeName.SIDE]: ETooltipAlign;
    /** Количество зон, которые будут обрезаны при открытии нового попапа (вроде как зон - других попапов).*/
    cutOff?: number;
    /** Порядок для позиционирования во flex. */
    order: number;
}

/** Тип осей координат с типом размерности. */
export type TTooltipAxesCoordinates = ITooltipXCoordinates | ITooltipYCoordinates;

/** Тип взаимодействия с тултипом. */
export type TTooltipToggleType = "click" | "hover";

/** React-элементы Tooltip. */
export interface ITooltipElements {
    target: React.ReactElement<ITooltipTargetProps> | null;
    body: React.ReactElement<ITooltipBodyProps> | null;
    link: React.ReactElement<ITooltipLinkProps> | null;
    closeButton: React.ReactElement<ITooltipXButtonProps> | null;
    mobileHeader: React.ReactElement<ITooltipMobileHeaderProps> | null;
}

/** Свойства компонента TooltipTarget. */
export interface ITooltipTargetProps {
    /** Дочерние элементы. */
    children: React.ReactElement;
}

/** Свойства компонента TooltipBody. */
export interface ITooltipBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Свойства компонента TooltipXButton. */
export interface ITooltipXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Дочерние элементы. */
    children?: never;
}

/** Свойства компонента TooltipMobileHeader. */
export interface ITooltipMobileHeaderProps extends Omit<IDropdownMobileHeaderProps, "closeButton"> {}

/** Свойства компонента DropdownMobileHeader. */
export interface IDropdownMobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кнопка закрытия мобильной версии Dropdown. */
    closeButton?: () => JSX.Element;
}

/** Свойства компонента TooltipLink. */
export interface ITooltipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/** Свойства компонента Tooltip. */
export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер подсказки. */
    size: ETooltipSize;
    /** Подсказка должна появляться по наведению или по клику. */
    toggleType?: TTooltipToggleType;
    /** Предпочитаемое место расположения подсказки. Если не помещается, то отобразится там где помещается. */
    preferPlace?: ETooltipPreferPlace;
    /** Расположение указателя. */
    alignTip?: ETooltipAlign;
    /** Элемент в который будет происходить рендер подсказки. */
    renderContainer?: Element;
    /** Отключить режим адаптивности. */
    disableAdaptiveMode?: boolean;
    /** Признак открыт ли Tooltip. */
    isOpen?: boolean;
    /** Контролирующая функция закрытия/открытия. */
    toggle?: (open: boolean) => void;
    /** Callback-функция появления Tooltip. */
    onShow?: (node: HTMLDivElement) => void;
    /** Ссылка на target-элемент. */
    targetRef: React.MutableRefObject<HTMLElement | null>;
}

/** Свойства компонента TooltipDesktop. */
export interface ITooltipDesktopProps extends Omit<ITooltipProps, "toggle"> {
    /** Признак открыт ли TooltipDesktop. */
    isOpen: boolean;
    /** Дочерние элементы. */
    children?: never;
}
