import React from "react";

/** Свойства компонента IslandWidgetBody. */
export interface IIslandWidgetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetBody: React.FC<IIslandWidgetBodyProps> = ({ children, ...htmlDivAttributes }) => {
    return <div {...htmlDivAttributes}>{children}</div>;
};

IslandWidgetBody.displayName = "IslandWidgetBody";
