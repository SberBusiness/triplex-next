import React, { useContext, useState } from "react";
import clsx from "clsx";
import { EComponentSize } from "../../enums/EComponentSize";
import { Island, EIslandType } from "../Island";
import { ExpandAnimation } from "../ExpandAnimation/ExpandAnimation";
import { useMobileView } from "../MobileView";
import { IIslandWidgetHeaderProps, IslandWidgetHeader } from "./components/IslandWidgetHeader";
import { IIslandWidgetBodyProps, IslandWidgetBody } from "./components/IslandWidgetBody";
import { IIslandWidgetFooterProps, IslandWidgetFooter } from "./components/IslandWidgetFooter";
import { IslandWidgetExtraFooter } from "./components/IslandWidgetExtraFooter";
import { IslandWidgetLayoutContext } from "./IslandWidgetLayoutContext";
import { IslandWidgetContext } from "./IslandWidgetContext";
import styles from "./styles/IslandWidget.module.less";

/** Свойства компонента IslandWidget. */
export interface IIslandWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Рендер-функция Body. */
    renderBody: (props: IIslandWidgetBodyProps) => React.ReactNode;
    /** Рендер-функция Footer. */
    renderFooter?: (props: IIslandWidgetFooterProps) => React.ReactNode;
    /** Рендер-функция Header. */
    renderHeader: (props: IIslandWidgetHeaderProps) => React.ReactNode;
    /** Отключение возможности сворачивания контента в адаптиве. По умолчанию false. */
    disableAdaptiveCollapsing?: boolean;
}

/**
 * Виджет — карточка со сгруппированной информацией, набором связанных действий или отдельной функциональностью.
 * В адаптиве контент сворачивается по клику на шапку, если не передан disableAdaptiveCollapsing.
 */
export const IslandWidget = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandWidgetProps>(
        (
            {
                className,
                size = EComponentSize.MD,
                renderBody,
                renderFooter,
                renderHeader,
                disableAdaptiveCollapsing = false,
                ...rest
            },
            ref,
        ) => {
            const { hasExtraFooter } = useContext(IslandWidgetLayoutContext);
            const [open, setOpen] = useState(disableAdaptiveCollapsing);

            const adaptive = useMobileView();

            const handleHeaderClick = (): void => {
                setOpen((prevOpen) => !prevOpen);
            };

            const expandableContent = adaptive && !disableAdaptiveCollapsing;

            const renderContent = () => (
                <>
                    {renderBody({})}
                    {renderFooter ? renderFooter({}) : null}
                </>
            );

            return (
                <IslandWidgetContext.Provider
                    value={{
                        adaptive,
                        disableAdaptiveCollapsing,
                        open,
                        size,
                    }}
                >
                    <div
                        className={clsx(
                            styles.islandWidget,
                            {
                                [styles.islandWidgetWithExtraFooter]: hasExtraFooter,
                            },
                            className,
                        )}
                        {...rest}
                        data-tx={process.env.npm_package_version}
                        ref={ref}
                    >
                        <Island type={EIslandType.TYPE_1} size={size} withoutPaddings={true}>
                            <div onClick={adaptive ? handleHeaderClick : undefined}>{renderHeader({})}</div>
                            {expandableContent ? (
                                <ExpandAnimation expanded={open}>{renderContent()}</ExpandAnimation>
                            ) : (
                                renderContent()
                            )}
                        </Island>
                    </div>
                </IslandWidgetContext.Provider>
            );
        },
    ),
    {
        Header: IslandWidgetHeader,
        Body: IslandWidgetBody,
        Footer: IslandWidgetFooter,
        ExtraFooter: IslandWidgetExtraFooter,
    },
);

IslandWidget.displayName = "IslandWidget";
