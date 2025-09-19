import React, { useContext, useEffect } from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { Checkbox } from "@sber-business/triplex/components/Checkbox/Checkbox";
import { ListItemContext } from "@sber-business/triplex/components/List/components/ListItemContext";

export interface IListItemSelectableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    onSelect: (selected: boolean) => void;
    selected: boolean;
}

/** Контейнер с выбором элемента списка. */
export const ListItemSelectable = React.forwardRef<HTMLDivElement, IListItemSelectableProps>(
    ({ selected, children, className, onSelect, ...rest }, ref) => {
        const { setSelected } = useContext(ListItemContext);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onSelect(event.target.checked);
        };

        useEffect(() => {
            setSelected(selected);
        }, [selected, setSelected]);

        return (
            <div
                className={classnames("cssClass[listItemSelectable]", { "cssClass[selected]": selected }, className)}
                {...rest}
                ref={ref}
            >
                <div className="cssClass[childrenWrapper]">{children}</div>
                <div className="cssClass[checkboxWrapper]">
                    <Checkbox
                        checked={selected}
                        onChange={handleChange}
                        labelAttributes={{ className: "cssClass[checkboxLabel]" }}
                    >
                        <span className={"cssClass[checkboxLabelClickArea]"} />
                    </Checkbox>
                </div>
            </div>
        );
    }
);

ListItemSelectable.displayName = "ListItemSelectable";
