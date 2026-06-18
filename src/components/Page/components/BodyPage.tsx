import React from "react";
import { Body, IBodyProps } from "@sberbusiness/triplex-next/components/Body/Body";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { EBodyPageType, EBodyPageVerticalMargin } from "./enums";
import { Island } from "@sberbusiness/triplex-next/components/Island/Island";
import { EIslandType } from "@sberbusiness/triplex-next/components/Island/enums";
import styles from "../styles/BodyPage.module.less";

const verticalMarginToClassNameMap: Record<EBodyPageVerticalMargin, string> = {
    [EBodyPageVerticalMargin.LARGE]: styles.verticalMargin24,
    [EBodyPageVerticalMargin.SMALL]: styles.verticalMargin16,
};

export interface IBodyPageTypeFirstProps extends IBodyProps {
    /** Контент тела страницы. */
    children: React.ReactNode;
    /** Тип компонента BodyPage. FIRST оборачивает контент в Island (карточку). */
    type: EBodyPageType.FIRST;
    /** Размер острова (Island). */
    size?: EComponentSize;
    /**
     * Вертикальные отступы (сверху и снизу).
     * По умолчанию LARGE (24px); в LightBox следует использовать SMALL (16px).
     */
    verticalMargin?: EBodyPageVerticalMargin;
}

export interface IBodyPageTypeSecondProps extends IBodyProps {
    /** Контент тела страницы. */
    children: React.ReactNode;
    /** Тип компонента BodyPage. SECOND рендерит контент без карточки. */
    type: EBodyPageType.SECOND;
    /** Размер острова недоступен для типа SECOND, так как контент не оборачивается в Island. */
    size?: never;
    /**
     * Вертикальные отступы (сверху и снизу).
     * По умолчанию LARGE (24px); в LightBox следует использовать SMALL (16px).
     */
    verticalMargin?: EBodyPageVerticalMargin;
}

/** Тело компонента Page. Контейнер для основного контента страницы. */
export const BodyPage = React.forwardRef<HTMLDivElement, IBodyPageTypeFirstProps | IBodyPageTypeSecondProps>(
    ({ className, type, size, verticalMargin = EBodyPageVerticalMargin.LARGE, ...rest }, ref) => {
        const bodyPageClassNames = clsx(styles.bodyPage, verticalMarginToClassNameMap[verticalMargin], className);

        return type === EBodyPageType.FIRST ? (
            <Island className={bodyPageClassNames} type={EIslandType.TYPE_1} ref={ref} size={size}>
                <Body {...rest} />
            </Island>
        ) : (
            <Body ref={ref} className={bodyPageClassNames} {...rest} />
        );
    },
);

BodyPage.displayName = "BodyPage";
