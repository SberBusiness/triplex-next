import React from "react";
import { action } from "storybook/actions";
import { Checkbox, ColumnSettings, ETextSize, ITableBasicColumn, Text } from "@sberbusiness/triplex-next";

const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "default", label: "Обычная строка" },
    { fieldKey: "disabled", label: "Неактивная строка" },
    { fieldKey: "static", label: "Дополнительные настройки" },
    { fieldKey: "dragging", label: "Перетаскиваемая строка" },
];

export const VisualTests = () => (
    <div style={{ width: 360 }}>
        <ColumnSettings.SortableList columns={COLUMNS} onColumnsChange={action("onColumnsChange")}>
            <ColumnSettings.SortableList.Item id="default">
                <Checkbox defaultChecked onChange={action("onDefaultChange")}>
                    Обычная строка
                </Checkbox>
            </ColumnSettings.SortableList.Item>

            <ColumnSettings.SortableList.Item id="disabled" disabled>
                <Checkbox defaultChecked disabled>
                    Неактивная строка
                </Checkbox>
            </ColumnSettings.SortableList.Item>

            <ColumnSettings.SortableList.Item
                id="static"
                staticContent={
                    <div data-testid="item-visible-static-content" style={{ padding: "8px 12px 12px 24px" }}>
                        <Text tag="div" size={ETextSize.B3}>
                            Настройки остаются видимыми
                        </Text>
                        <Checkbox defaultChecked onChange={action("onStaticOptionChange")}>
                            Показывать подробности
                        </Checkbox>
                    </div>
                }
            >
                <Checkbox defaultChecked onChange={action("onStaticChange")}>
                    Дополнительные настройки
                </Checkbox>
            </ColumnSettings.SortableList.Item>

            <ColumnSettings.SortableList.Item
                id="dragging"
                data-testid="item-dragging"
                staticContent={
                    <div data-testid="item-drag-static-content" style={{ padding: "8px 12px 12px 24px" }}>
                        <Text tag="div" size={ETextSize.B3}>
                            Сворачивается при перетаскивании
                        </Text>
                    </div>
                }
            >
                <Checkbox defaultChecked onChange={action("onDraggingChange")}>
                    Перетаскиваемая строка
                </Checkbox>
            </ColumnSettings.SortableList.Item>
        </ColumnSettings.SortableList>
    </div>
);
