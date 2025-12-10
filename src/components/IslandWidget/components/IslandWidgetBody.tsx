import React from "react";

/** Свойства компонента IslandWidgetBody. */
export interface IIslandWidgetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetBody: React.FC<IIslandWidgetBodyProps> = ({ children, className, ...htmlDivAttributes }) => {
    return (
        <div {...htmlDivAttributes} className={className}>
            {children}
        </div>
    );
};

IslandWidgetBody.displayName = "IslandWidgetBody";
