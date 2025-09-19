import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ListItem } from "@sber-business/triplex/components/List";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ListSortableItemTarget } from "./ListSortableItemTarget";

export interface IListSortableItemChildrenProvideProps {
    dragging: boolean;
    disabled?: boolean;
    listeners?: SyntheticListenerMap;
    setActivatorNodeRef: (element: HTMLElement | null) => void;
}

/** Свойства компонента ListSortableItem. */
export interface IListSortableItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Уникальный идентификатор. */
    id: string;
    /** Неактивное состояние. */
    disabled?: boolean;
    /** Дочерние элементы. */
    children?:
        | React.ReactNode
        | (({
              disabled,
              dragging,
              listeners,
              setActivatorNodeRef,
          }: IListSortableItemChildrenProvideProps) => React.ReactNode);
}

/** Элемент ListSortable с поддержкой drag-and-drop. */
export const ListSortableItem = Object.assign(
    React.forwardRef<HTMLLIElement, IListSortableItemProps>(function ListSortableItem(
        { children, className, style, disabled, ...rest },
        ref
    ) {
        const { transform, transition, listeners, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
            disabled,
            id: rest.id,
            transition: {
                duration: 300,
                easing: "ease-out",
            },
        });

        const setRef = (instance: HTMLLIElement | null) => {
            setNodeRef(instance);
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <ListItem
                className={classnames("cssClass[listSortableItem]", { "cssClass[dragging]": isDragging }, className)}
                style={{ transform: CSS.Translate.toString(transform), transition, ...style }}
                {...rest}
                ref={setRef}
            >
                {typeof children === "function"
                    ? children({ disabled, dragging: isDragging, listeners, setActivatorNodeRef })
                    : children}
            </ListItem>
        );
    }),
    {
        Target: ListSortableItemTarget,
    }
);

ListSortableItem.displayName = "ListSortableItem";
