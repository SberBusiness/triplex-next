import {
    ECellType,
    EHorizontalAlign,
    EVerticalAlign,
} from "@sberbusiness/triplex-next/components/Table/TableBasic/enums";
import styles from "./TableBasic/styles/TableBasic.module.less";

/**
 * Преобразование значения горизонтального выравнивания в css-класс.
 * @param {EHorizontalAlign} [horizontalAlign] Значение для маппинга.
 */
export const mapHorizontalAlignToClassName = (horizontalAlign: EHorizontalAlign = EHorizontalAlign.LEFT): string => {
    switch (horizontalAlign) {
        case EHorizontalAlign.LEFT:
            return styles.alignLeft;
        case EHorizontalAlign.RIGHT:
            return styles.alignRight;
        case EHorizontalAlign.CENTER:
            return styles.alignCenter;
    }
};

/**
 * Преобразование значения вертикального выравнивания в css-класс.
 * @param {EVerticalAlign} [verticalAlign] Значение для маппинга.
 */
export const mapVerticalAlignToClassName = (verticalAlign: EVerticalAlign = EVerticalAlign.BASELINE): string => {
    switch (verticalAlign) {
        case EVerticalAlign.BASELINE:
            return styles.verticalAlignBaseline;
        case EVerticalAlign.SUB:
            return styles.verticalAlignSub;
        case EVerticalAlign.SUPER:
            return styles.verticalAlignSuper;
        case EVerticalAlign.TEXT_TOP:
            return styles.verticalAlignTextTop;
        case EVerticalAlign.TEXT_BOTTOM:
            return styles.verticalAlignTextBottom;
        case EVerticalAlign.MIDDLE:
            return styles.verticalAlignMiddle;
        case EVerticalAlign.TOP:
            return styles.verticalAlignTop;
        case EVerticalAlign.BOTTOM:
            return styles.verticalAlignBottom;
    }
};

/**
 * Преобразование типа ячейки в css-класс.
 * @param {ECellType} [cellType] Тип ячейки.
 */
export const mapCellTypeToClassName = (cellType: ECellType = ECellType.TEXT): string => {
    switch (cellType) {
        case ECellType.TEXT:
            return styles.textType;
        case ECellType.COMPONENTS:
            return styles.componentsType;
        case ECellType.CHECKBOX:
            return styles.checkboxType;
    }
};
