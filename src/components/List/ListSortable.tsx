import React from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    MouseSensor,
    MouseSensorOptions,
    TouchSensor,
    TouchSensorOptions,
    MeasuringStrategy,
    DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { List, IListProps } from "./List";

/** Свойства компонента ListSortable. */
export interface IListSortableProps<T extends { id: string }> extends IListProps {
    items: T[];
    onItemsChange: (items: T[]) => void;
}

export class AdvancedMouseSensor extends MouseSensor {
    static activators = [
        {
            eventName: "onMouseDown" as const,
            handler: ({ nativeEvent: event }: React.MouseEvent, { onActivation }: MouseSensorOptions) => {
                if (event.button === 2) {
                    return false;
                } else if (event.target instanceof HTMLElement) {
                    let element: HTMLElement | null = event.target;

                    while (element !== null) {
                        if (element.dataset?.draggable === "false") {
                            return false;
                        }
                        element = element.parentElement;
                    }
                }

                onActivation?.({ event });

                return true;
            },
        },
    ];
}

export class AdvancedTouchSensor extends TouchSensor {
    static activators = [
        {
            eventName: "onTouchStart" as const,
            handler: ({ nativeEvent: event }: React.TouchEvent, { onActivation }: TouchSensorOptions) => {
                if (event.touches.length > 1) {
                    return false;
                } else if (event.target instanceof HTMLElement) {
                    let element: HTMLElement | null = event.target;

                    while (element !== null) {
                        if (element.dataset?.draggable === "false") {
                            return false;
                        }
                        element = element.parentElement;
                    }
                }

                onActivation?.({ event });

                return true;
            },
        },
    ];
}

function ListSortableInner<T extends { id: string }>(
    { items, onItemsChange, ...rest }: IListSortableProps<T>,
    ref: React.ForwardedRef<HTMLUListElement>
) {
    const sensors = useSensors(useSensor(AdvancedMouseSensor), useSensor(AdvancedTouchSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            onItemsChange(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            modifiers={[restrictToParentElement, restrictToVerticalAxis]}
            measuring={{ droppable: { frequency: MeasuringStrategy.WhileDragging } }}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <List {...rest} ref={ref} />
            </SortableContext>
        </DndContext>
    );
}

/** Сортируемый список с поддержкой drag-and-drop. */
export const ListSortable = React.forwardRef(ListSortableInner) as <T extends { id: string }>(
    props: IListSortableProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof ListSortableInner>;
