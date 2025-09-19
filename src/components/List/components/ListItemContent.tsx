import React, { useContext } from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ListItemContext } from "@sber-business/triplex/components/List/components/ListItemContext";

interface IListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент элемента списка. */
export const ListItemContent = React.forwardRef<HTMLDivElement, IListItemContentProps>(
    ({ children, className, ...rest }, ref) => {
        const { selected } = useContext(ListItemContext);

        return (
            <div
                className={classnames("cssClass[listItemContent]", { "cssClass[selected]": selected }, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

ListItemContent.displayName = "ListItemContent";
