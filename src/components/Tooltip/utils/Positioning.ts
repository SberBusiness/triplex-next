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
import {
    ITooltipAxes,
    ITooltipBounds,
    ITooltipDomainSize,
    ITooltipRelPosition,
    ITooltipSize,
} from "@sberbusiness/triplex-next/components/Tooltip/types";

/**
 *  Значение на которое должен отступать тултип от границы экрана сверху и снизу.
 */
const WINDOW_OFFSET = 8;

/**
 * Сравнивает координаты. По сути shadowEqual, но она делает лишние проверки, здесь мы ограничваемся только обьектом
 * координат.
 * @param {ITooltipBounds} o1 Сравниваемые координаты.
 * @param {ITooltipBounds} o2 Координаты для сравнения.
 */
const equalCoords = (o1: ITooltipBounds, o2: ITooltipBounds) => {
    return o1.h === o2.h && o1.w === o2.w && o1.x === o2.x && o1.y === o2.y && o1.x2 === o2.x2 && o1.y2 === o2.y2;
};

/**
 * Система осей
 * Позволяет работать в разных ориентациях без необходимости вручную отслеживать используется x или y координаты.
 */
const axes: ITooltipAxes = {
    column: {
        cross: {
            end: ETooltipEndCoordinates.X,
            size: ETooltipSizeParameter.W,
            start: ETooltipStartCoordinates.X,
        },
        main: {
            end: ETooltipEndCoordinates.Y,
            size: ETooltipSizeParameter.H,
            start: ETooltipStartCoordinates.Y,
        },
    },
    row: {
        cross: {
            end: ETooltipEndCoordinates.Y,
            size: ETooltipSizeParameter.H,
            start: ETooltipStartCoordinates.Y,
        },
        main: {
            end: ETooltipEndCoordinates.X,
            size: ETooltipSizeParameter.W,
            start: ETooltipStartCoordinates.X,
        },
    },
};

/**
 * Найти центр для заданного размера.
 *
 * @param {ETooltipFlowTypes} flow Тип flow в flex.
 * @param {ETooltipAxesType} axis Тип оси.
 * @param {ITooltipSize} size размер.
 *
 * @return {number} Середина размера.
 */
const centerOfSize = (flow: ETooltipFlowTypes, axis: ETooltipAxesType, size: ITooltipSize): number =>
    size[axes[flow][axis].size] / 2;

/**
 * Найти центр для заданных границ.
 *
 * @param {ETooltipFlowTypes} flow Тип flow в flex.
 * @param {ETooltipAxesType} axis Тип оси.
 * @param {ITooltipBounds} bounds Границы.
 */
const centerOfBounds = (flow: ETooltipFlowTypes, axis: ETooltipAxesType, bounds: ITooltipBounds): number =>
    bounds[axes[flow][axis].start] + bounds[axes[flow][axis].size] / 2;

/**
 * Расстояние от центра до центра границ.
 *
 * @param {ETooltipFlowTypes} flow Тип flow в flex.
 * @param {ETooltipAxesType} axis Тип оси.
 * @param {ITooltipBounds} boundsTo Границы от.
 * @param {ITooltipBounds} boundsFrom Границы до.
 */
const centerOfBoundsFromBounds = (
    flow: ETooltipFlowTypes,
    axis: ETooltipAxesType,
    boundsTo: ITooltipBounds,
    boundsFrom: ITooltipRelPosition,
): number => centerOfBounds(flow, axis, boundsTo) - boundsFrom[axes[flow][axis].start];

/**
 * Возвращет координаты для выравнивания.
 *
 * @param {ETooltipFlowTypes} flow Тип flow в flex.
 * @param {ETooltipAxesType} axis Тип оси.
 * @param {ETooltipAlign} align Выравнивание для позиционирования.
 * @param {ITooltipBounds} bounds Границы.
 * @param {ITooltipSize} size размер.
 */
const place = (
    flow: ETooltipFlowTypes,
    axis: ETooltipAxesType,
    align: ETooltipAlign,
    bounds: ITooltipBounds,
    size: ITooltipSize,
): number => {
    const axisProps = axes[flow][axis];

    if (align === ETooltipAlign.CENTER) {
        return centerOfBounds(flow, axis, bounds) - centerOfSize(flow, axis, size);
    } else {
        if (align === ETooltipAlign.END) {
            return bounds[axisProps.end];
        } else {
            /* Рендеринг дома левосторонний. Поэтому если вспомогательный элемент спозиционирован перед основным, то
                расположение вспомогательного должно быть с дополнительным отступом на его (вспомогательного) длину.*/
            if (align === ETooltipAlign.START) {
                return bounds[axisProps.start] - size[axisProps.size];
            } else {
                return 0;
            }
        }
    }
};

// Расчеты размеров элемента
/**
 * Поиск границ элемента.
 * @param {HTMLElement | Window} el Элементя для которого ищутся границы.
 */
const calcBounds = (el: HTMLElement | Window): ITooltipBounds => {
    if (el === window) {
        return {
            h: el.innerHeight,
            w: el.innerWidth,
            x: 0,
            x2: el.innerWidth,
            y: 0,
            y2: el.innerHeight,
        };
    }

    const b = (el as HTMLElement).getBoundingClientRect();

    return {
        h: b.bottom - b.top,
        w: b.right - b.left,
        x: b.left,
        x2: b.right,
        y: b.top,
        y2: b.bottom,
    };
};

/**
 * Проверка помещается ли элемент в область.
 * @param {ETooltipSizeParameter} dimension Тип координаты для сравнения (высота/ширина).
 */
const fitWithinChecker =
    (dimension: ETooltipSizeParameter) =>
    (domainSize: ITooltipDomainSize, itemSize: ITooltipSize): boolean =>
        domainSize[dimension] >= itemSize[dimension];

const doesWidthFitWithin = fitWithinChecker(ETooltipSizeParameter.W);
const doesHeightFitWithin = fitWithinChecker(ETooltipSizeParameter.H);

const doesFitWithin = (domainSize: ITooltipDomainSize, itemSize: ITooltipSize): boolean =>
    doesWidthFitWithin(domainSize, itemSize) && doesHeightFitWithin(domainSize, itemSize);

/**
 * Алгоритм выбора наиболее подходящей зоны для тултипа. Текущий подход: в цикле пройти все зоны и выбрать
 * последнюю, что подходит, если ни одна не походит, выбрать наименее непоходящую.
 *
 * @param {ETooltipPreferPlace | undefined} preferPlace Предпочитаемое место расположение тултипа.
 * @param {ITooltipBounds} windowBounds Границы окна.
 * @param {ITooltipBounds} targetBounds Границы элемента, который обернут в тултип.
 * @param {number} tipHeight Высота Tip (стрелочки), px.
 * @param {number} maxFromEdgeForTip Уголок бегает по периметру максимально на 16 px от края.
 * @param {ITooltipSize} tooltipSize Размеры тултипа.
 *
 * @return {ITooltipDomainSize} Размеры области с параметрами.
 */
const pickZone = (
    preferPlace: ETooltipPreferPlace | undefined,
    windowBounds: ITooltipBounds,
    targetBounds: ITooltipBounds,
    tipHeight: number,
    maxFromEdgeForTip: number,
    tooltipSize: ITooltipSize,
): ITooltipDomainSize => {
    // В случае горизонтального расположения доступное место по высоте расчитывается по формуле:
    // минимальная высота от центра таргета до границы окна по Y плюс максимальный возможный остаток высота тултипа и учитывается отступ от границы окна,
    // чтобы тултип не прилигал к границе.
    let targetMiddleY = targetBounds.y + (targetBounds.y2 - targetBounds.y) / 2; // расстояние от верхней границы окна до середина таргета по Y
    const fromTargetMiddleToWindowY2 = windowBounds[ETooltipEndCoordinates.Y] - targetMiddleY; // расстояние от нижней границы окна до середина таргета по Y
    // берем наименьшее расстояние от границы окна до середины таргета
    if (fromTargetMiddleToWindowY2 < targetMiddleY) {
        targetMiddleY = fromTargetMiddleToWindowY2;
    }
    const zoneHeight =
        targetMiddleY + tooltipSize[ETooltipSizeParameter.H] - tipHeight - maxFromEdgeForTip - WINDOW_OFFSET;
    const zones: ITooltipDomainSize[] = [
        {
            [ETooltipTypeName.SIDE]: ETooltipAlign.START,
            [ETooltipTypeName.STANDING]: ETooltipPreferPlace.ABOVE,
            [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
            h: targetBounds.y,
            order: -1,
            w: windowBounds.x2,
        },
        {
            [ETooltipTypeName.SIDE]: ETooltipAlign.END,
            [ETooltipTypeName.STANDING]: ETooltipPreferPlace.RIGHT,
            [ETooltipTypeName.FLOW]: ETooltipFlowTypes.ROW,
            h: zoneHeight,
            order: 1,
            w: windowBounds.x2 - targetBounds.x2,
        },
        {
            [ETooltipTypeName.SIDE]: ETooltipAlign.END,
            [ETooltipTypeName.STANDING]: ETooltipPreferPlace.BELOW,
            [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
            h: windowBounds.y2 - targetBounds.y2,
            order: 1,
            w: windowBounds.x2,
        },
        {
            [ETooltipTypeName.SIDE]: ETooltipAlign.START,
            [ETooltipTypeName.STANDING]: ETooltipPreferPlace.LEFT,
            [ETooltipTypeName.FLOW]: ETooltipFlowTypes.ROW,
            h: zoneHeight,
            order: -1,
            w: targetBounds.x,
        },
    ];

    /* Упорядочивает зоны по количеству popup которые будут обрезаны, если использовать зону. Первый элемент в
     массиве режет наименьшее количество
     const area = size.w * size.h  // Площадь popup постоянная и не меняет порядок
    */
    zones.forEach((zone) => {
        zone.cutOff =
            /* area */ -Math.max(0, Math.min(zone.w, tooltipSize.w)) * Math.max(0, Math.min(zone.h, tooltipSize.h));
    });
    zones.sort((a, b) => (a.cutOff ?? 0) - (b.cutOff ?? 0));

    const availZones = zones.filter((zone) => doesFitWithin(zone, tooltipSize));

    if (preferPlace) {
        // Поиск доступных предпочитаемых зон
        const preferredAvailZones = availZones.filter((zone) => zone[ETooltipTypeName.STANDING] === preferPlace);
        if (preferredAvailZones.length) {
            return preferredAvailZones[0];
        }

        // Если нет доступных предпочитаемых зон, то используем ту, что подходит лучше всего
        const preferredZones = zones.filter((zone) => zone[ETooltipTypeName.STANDING] === preferPlace);
        if (!availZones.length && preferredZones.length) {
            return preferredZones[0];
        }
    }
    // Возвращаем зону, которая подходит полностью либо лучше всего
    return availZones.length ? availZones[0] : zones[0];
};

/**
 * Высчитывает относительные координаты
 * @param {ITooltipDomainSize} zone Зона с параметрами.
 * @param {ITooltipBounds} targetBounds Границы элемента, который обернут в тултип.
 * @param {ITooltipBounds} tooltipSize Размеры тултипа.
 */
const calcRelPos = (
    zone: ITooltipDomainSize,
    targetBounds: ITooltipBounds,
    tooltipSize: ITooltipSize,
): ITooltipRelPosition => {
    const { main, cross } = axes[zone.flow];
    const crossAlign = ETooltipAlign.CENTER;
    const mainStart = place(zone.flow, ETooltipAxesType.MAIN, zone.side, targetBounds, tooltipSize);
    const mainSize = tooltipSize[main.size];
    const crossStart = place(zone.flow, ETooltipAxesType.CROSS, crossAlign, targetBounds, tooltipSize);

    const crossSize = tooltipSize[cross.size];
    const result = {
        [cross.start]: crossStart,
        crossLength: crossSize,
        [cross.end]: crossStart + crossSize,
        [main.start]: mainStart,
        mainLength: mainSize,
        [main.end]: mainStart + mainSize,
    };
    return result as unknown as ITooltipRelPosition;
};

export {
    calcRelPos,
    place,
    pickZone,
    axes,
    centerOfSize,
    centerOfBounds,
    centerOfBoundsFromBounds,
    doesFitWithin,
    equalCoords,
    calcBounds,
};
