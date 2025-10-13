import React from "react";
import { ISwipeableAreaRef, SwipeableArea } from "@sberbusiness/triplex-next/components/SwipeableArea/SwipeableArea";
import { IListItemProps, ListItem } from "@sberbusiness/triplex-next/components/List/components/ListItem";
import { ListItemContent } from "@sberbusiness/triplex-next/components/List/components/ListItemContent";
import { ListItemControls } from "@sberbusiness/triplex-next/components/List/components/ListItemControls";
import { ListItemSelectable } from "@sberbusiness/triplex-next/components/List/components/ListItemSelectable";
import { ListItemTailRight } from "@sberbusiness/triplex-next/components/List/components/ListItemTailRight";
import clsx from "clsx";
import styles from "../styles/ListItemTable.module.less";

interface IListItemTableSelectableProps extends Omit<IListItemTableProps, "selected" | "onSelect"> {
    /** Обработчик изменения флага selected. */
    onSelect: (selected: boolean) => void;
    /** Флаг состояния selected. */
    selected: boolean;
}

interface IListItemTableProps extends Omit<IListItemProps, "onSelect"> {
    /** Кнопки действий - <ListItemControlsButton ... /> */
    controlButtons?: React.ReactNode;
    /** Обработчик клика по контенту элемента списка. Событие onClick передается на контейнер контента. */
    onClickItem?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Обработчик изменения флага selected. */
    onSelect?: never;
    /** Флаг состояния selected. */
    selected?: never;
    /** Ref компонента SwipeableArea. */
    swipeableAreaRef?: React.Ref<ISwipeableAreaRef>;
}

/** Элемент списка, для отображения табличных данных. */
export const ListItemTable = React.forwardRef<HTMLLIElement, IListItemTableProps | IListItemTableSelectableProps>(
    ({ children, className, controlButtons, onClickItem, onSelect, selected, swipeableAreaRef, ...rest }, ref) => {
        const selectable = typeof onSelect !== "undefined" && typeof selected !== "undefined";

        const renderContent = () => <ListItemContent onClick={onClickItem}>{children}</ListItemContent>;

        return (
            <ListItem className={clsx(styles.listItemTable, className)} {...rest} ref={ref}>
                <SwipeableArea
                    ref={swipeableAreaRef}
                    rightSwipeableArea={
                        controlButtons ? <ListItemControls>{controlButtons}</ListItemControls> : undefined
                    }
                >
                    <ListItemTailRight />

                    {selectable ? (
                        <ListItemSelectable selected={selected} onSelect={onSelect}>
                            {renderContent()}
                        </ListItemSelectable>
                    ) : (
                        renderContent()
                    )}
                </SwipeableArea>
            </ListItem>
        );
    },
);

ListItemTable.displayName = "ListItemTable";
