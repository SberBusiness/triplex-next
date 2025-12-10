import React from "react";
import { Island, IIslandProps, EIslandType } from "../Island";
import { IIslandWidgetHeaderProps, IslandWidgetHeader } from "./components/IslandWidgetHeader";
import { IIslandWidgetBodyProps, IslandWidgetBody } from "./components/IslandWidgetBody";
import { IIslandWidgetFooterProps, IslandWidgetFooter } from "./components/IslandWidgetFooter";
import { IIslandWidgetExtraFooterProps, IslandWidgetExtraFooter } from "./components/IslandWidgetExtraFooter";
import { EComponentSize } from "../../enums/EComponentSize";
import styles from "./styles/IslandWidget.module.less";
import clsx from "clsx";

export interface IIslandWidgetProps extends React.HTMLAttributes<HTMLDivElement>, Pick<IIslandProps, "type" | "size"> {
    renderBody: (props: IIslandWidgetBodyProps) => JSX.Element;
    renderFooter?: (props: IIslandWidgetFooterProps) => JSX.Element;
    renderExtraFooter?: (props: IIslandWidgetExtraFooterProps) => JSX.Element;
    renderHeader: (props: IIslandWidgetHeaderProps) => JSX.Element;
}

export const IslandWidget = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandWidgetProps>(
        ({ className, renderBody, renderFooter, renderExtraFooter, renderHeader, ...rest }, ref) => {
            const classNames = clsx(className, { [styles.islandWidgetWithExtraFooter]: renderExtraFooter });

            return (
                <>
                    <Island
                        ref={ref}
                        type={EIslandType.TYPE_1}
                        size={EComponentSize.MD}
                        className={classNames}
                        data-tx={process.env.npm_package_version}
                        {...rest}
                    >
                        {renderHeader({})}
                        {renderBody({})}
                        {renderFooter ? renderFooter({}) : null}
                    </Island>
                    {renderExtraFooter ? renderExtraFooter({}) : null}
                </>
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
