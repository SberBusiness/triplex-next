import React from "react";
import { Body, IBodyProps } from "@sberbusiness/triplex-next/components/Body/Body";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { EBodyPageType, EBodyPageVerticalMargin } from "./enums";
import { Island } from "@sberbusiness/triplex-next/components/Island/Island";
import { EIslandType } from "@sberbusiness/triplex-next/components/Island/enums";
import styles from "../styles/BodyPage.module.less";

const verticalMarginTopToClassNameMap: Record<EBodyPageVerticalMargin, string> = {
    [EBodyPageVerticalMargin.LARGE]: styles.marginTopLarge,
    [EBodyPageVerticalMargin.SMALL]: styles.marginTopSmall,
    [EBodyPageVerticalMargin.NONE]: styles.marginTopNone,
};

const verticalMarginBottomToClassNameMap: Record<EBodyPageVerticalMargin, string> = {
    [EBodyPageVerticalMargin.LARGE]: styles.marginBottomLarge,
    [EBodyPageVerticalMargin.SMALL]: styles.marginBottomSmall,
    [EBodyPageVerticalMargin.NONE]: styles.marginBottomNone,
};

/** Вертикальные отступы BodyPage, заданные раздельно сверху и снизу. Обе стороны указываются явно. */
export interface IBodyPageVerticalMarginSides {
    /** Отступ сверху. */
    top: EBodyPageVerticalMargin;
    /** Отступ снизу. */
    bottom: EBodyPageVerticalMargin;
}

/** Вертикальные отступы BodyPage: одно значение на обе стороны либо раздельные значения для верха и низа. */
export type TBodyPageVerticalMargin = EBodyPageVerticalMargin | IBodyPageVerticalMarginSides;

/** Приводит значение verticalMargin к паре отступов: одно значение применяется к обеим сторонам. */
const resolveVerticalMargin = (verticalMargin: TBodyPageVerticalMargin): IBodyPageVerticalMarginSides => {
    // Проверка на null, а не только typeof: библиотеку зовут и из нетипизированного кода,
    // а падать в рантайме у потребителя нельзя.
    if (verticalMargin && typeof verticalMargin === "object") {
        return verticalMargin;
    }

    const side = verticalMargin || EBodyPageVerticalMargin.LARGE;

    return { top: side, bottom: side };
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
     * Одно значение задаёт обе стороны, объект `{top, bottom}` — каждую отдельно.
     * LARGE — 24px, SMALL — 16px, NONE — 0; в LightBox следует использовать SMALL.
     */
    verticalMargin?: TBodyPageVerticalMargin;
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
     * Одно значение задаёт обе стороны, объект `{top, bottom}` — каждую отдельно.
     * LARGE — 24px, SMALL — 16px, NONE — 0; в LightBox следует использовать SMALL.
     */
    verticalMargin?: TBodyPageVerticalMargin;
}

/** Тело компонента Page. Контейнер для основного контента страницы. */
export const BodyPage = React.forwardRef<HTMLDivElement, IBodyPageTypeFirstProps | IBodyPageTypeSecondProps>(
    ({ className, type, size, verticalMargin = EBodyPageVerticalMargin.LARGE, ...rest }, ref) => {
        const { top, bottom } = resolveVerticalMargin(verticalMargin);
        const bodyPageClassNames = clsx(
            styles.bodyPage,
            verticalMarginTopToClassNameMap[top],
            verticalMarginBottomToClassNameMap[bottom],
            className,
        );

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
