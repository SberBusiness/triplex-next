import React, { useContext, useState } from "react";
import { Island, EIslandType } from "../Island";
import { IIslandWidgetHeaderProps, IslandWidgetHeader } from "./components/IslandWidgetHeader";
import { IIslandWidgetBodyProps, IslandWidgetBody } from "./components/IslandWidgetBody";
import { IIslandWidgetFooterProps, IslandWidgetFooter } from "./components/IslandWidgetFooter";
import { IslandWidgetExtraFooter } from "./components/IslandWidgetExtraFooter";
import { EComponentSize } from "../../enums/EComponentSize";
import clsx from "clsx";
import styles from "./styles/IslandWidget.module.less";
import { IslandWidgetLayoutContext } from "./IslandWidgetLayoutContext";
import { IslandWidgetContext } from "./IslandWidgetContext";
import { ExpandAnimation } from "../ExpandAnimation/ExpandAnimation";
import { EScreenWidth } from "@sberbusiness/triplex-next/helpers/breakpoints";
import { useMatchMedia } from "../MediaWidth/useMatchMedia";

export interface IIslandWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Рендер-функция Body. */
    renderBody: (props: IIslandWidgetBodyProps) => React.ReactNode;
    /** Рендер-функция Footer. */
    renderFooter?: (props: IIslandWidgetFooterProps) => React.ReactNode;
    /** Рендер-функция Header. */
    renderHeader: (props: IIslandWidgetHeaderProps) => React.ReactNode;
    /** Отключение возможности сворачивания контента в адаптиве. */
    disableAdaptiveCollapsing?: boolean;
}

export const IslandWidget = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandWidgetProps>(
        ({ className, renderBody, renderFooter, renderHeader, disableAdaptiveCollapsing = false, ...rest }, ref) => {
            const { hasExtraFooter } = useContext(IslandWidgetLayoutContext);
            const [open, setOpen] = useState(disableAdaptiveCollapsing);

            const adaptive = useMatchMedia(
                `(max-width: ${EScreenWidth.SM_MAX})`,
                window.innerWidth <= parseInt(EScreenWidth.SM_MAX),
            );

            const handleHeaderClick = (): void => {
                const newOpen = !open;
                setOpen(newOpen);
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
                    }}
                >
                    <div
                        className={clsx(styles.islandWidget, className, {
                            [styles.islandWidgetWithExtraFooter]: hasExtraFooter,
                        })}
                        data-tx={process.env.npm_package_version}
                        {...rest}
                        ref={ref}
                    >
                        <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
                            <div
                                className={clsx({
                                    [styles.islandWidgetHeaderWrapperAdaptive]: adaptive,
                                })}
                                onClick={adaptive ? handleHeaderClick : undefined}
                            >
                                {renderHeader({})}
                            </div>
                            {expandableContent ? (
                                <ExpandAnimation expanded={open}>{renderContent()}</ExpandAnimation>
                            ) : (
                                <>{renderContent()}</>
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
