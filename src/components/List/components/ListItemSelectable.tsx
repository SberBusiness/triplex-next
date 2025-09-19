import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { Checkbox } from "@sberbusiness/triplex-next/components/Checkbox/Checkbox";
import { ListItemContext } from "@sberbusiness/triplex-next/components/List/components/ListItemContext";
import styles from "../styles/ListItemSelectable.module.less";

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
                className={clsx(styles.listItemSelectable, { [styles.selected]: selected }, className)}
                {...rest}
                ref={ref}
            >
                <div className={styles.childrenWrapper}>{children}</div>
                <div className={styles.checkboxWrapper}>
                    <Checkbox
                        checked={selected}
                        onChange={handleChange}
                        labelAttributes={{ className: styles.checkboxLabel }}
                    >
                        <span className={styles.checkboxLabelClickArea} />
                    </Checkbox>
                </div>
            </div>
        );
    }
);

ListItemSelectable.displayName = "ListItemSelectable";
