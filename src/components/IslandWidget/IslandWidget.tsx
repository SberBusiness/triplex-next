import React, { useContext } from "react";
import { Island, EIslandType } from "../Island";
import { IIslandWidgetHeaderProps, IslandWidgetHeader } from "./components/IslandWidgetHeader";
import { IIslandWidgetBodyProps, IslandWidgetBody } from "./components/IslandWidgetBody";
import { IIslandWidgetFooterProps, IslandWidgetFooter } from "./components/IslandWidgetFooter";
import { IslandWidgetExtraFooter } from "./components/IslandWidgetExtraFooter";
import { EComponentSize } from "../../enums/EComponentSize";
import clsx from "clsx";
import styles from "./styles/IslandWidget.module.less";
import { IslandWidgetContext } from "./IslandWidgetContext";

export interface IIslandWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    renderBody: (props: IIslandWidgetBodyProps) => React.ReactNode;
    renderFooter?: (props: IIslandWidgetFooterProps) => React.ReactNode;
    renderHeader: (props: IIslandWidgetHeaderProps) => React.ReactNode;
}

export const IslandWidget = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandWidgetProps>(
        ({ className, renderBody, renderFooter, renderHeader, ...rest }, ref) => {
            const { hasExtraFooter } = useContext(IslandWidgetContext);

            return (
                <div
                    className={clsx(styles.islandWidget, className, {
                        [styles.islandWidgetWithExtraFooter]: hasExtraFooter,
                    })}
                    data-tx={process.env.npm_package_version}
                    {...rest}
                    ref={ref}
                >
                    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
                        {renderHeader({})}
                        {renderBody({})}
                        {renderFooter ? renderFooter({}) : null}
                    </Island>
                </div>
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
