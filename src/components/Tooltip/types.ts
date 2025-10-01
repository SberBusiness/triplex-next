import React from "react";
import {
    ETooltipAlign,
    ETooltipAxesType,
    ETooltipEndCoordinates,
    ETooltipFlowTypes,
    ETooltipPreferPlace,
    ETooltipSizeParameter,
    ETooltipStartCoordinates,
    ETooltipTypeName,
} from "@sberbusiness/triplex-next/components/Tooltip/enums";
import { ITooltipTargetProps } from "@sberbusiness/triplex-next/components/Tooltip/components/common/TooltipTarget";
import { ITooltipBodyProps } from "@sberbusiness/triplex-next/components/Tooltip/components/common/TooltipBody";
import { ITooltipXButtonProps } from "@sberbusiness/triplex-next/components/Tooltip/components/common/TooltipXButton";
import { ITooltipMobileHeaderProps } from "@sberbusiness/triplex-next/components/Tooltip/components/mobile/components/TooltipMobileHeader";
import { ITooltipLinkProps } from "@sberbusiness/triplex-next/components/Tooltip/components/common/TooltipLink";

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
