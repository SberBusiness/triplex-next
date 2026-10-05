import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

/** Индекс палитры иконки: выбранный сегмент рисует иконку на контрастном фоне. */
const SELECTED_ICON_PALETTE_INDEX = 10;
const ICON_PALETTE_INDEX = 5;

const ICON_SEGMENTS = ["segment_1", "segment_2", "segment_3"];
const LONG_TEXT = "Очень длинная подпись сегмента, которая не помещается";

export const VisualTests = () => {
    const [focusValue, setFocusValue] = useState("segment_2");
    const [disabledSegmentsValue, setDisabledSegmentsValue] = useState("segment_2");
    const [ellipsisValue, setEllipsisValue] = useState("segment_1");
    const [iconValue, setIconValue] = useState("segment_2");
    const [emptyMultipleValue, setEmptyMultipleValue] = useState<string[]>([]);
    const [fullMultipleValue, setFullMultipleValue] = useState(["segment_1", "segment_2", "segment_3"]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 320 }}>
            {/* Первый в DOM — на него уходит фокус в play, состояние :focus-visible. */}
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={ESegmentedControlSize.LG}
                value={focusValue}
                onSelect={setFocusValue}
            >
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            </SegmentedControl>

            {/* Отдельные сегменты выключены: невыбранный и выбранный — при активном контроле. */}
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={ESegmentedControlSize.MD}
                value={disabledSegmentsValue}
                onSelect={setDisabledSegmentsValue}
            >
                <SegmentedControl.Segment value="segment_1" disabled>
                    Segment
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2" disabled>
                    Segment
                </SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            </SegmentedControl>

            {/* Подпись не помещается — проверка обрезки по text-overflow: ellipsis. */}
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={ESegmentedControlSize.SM}
                value={ellipsisValue}
                onSelect={setEllipsisValue}
            >
                <SegmentedControl.Segment value="segment_1">{LONG_TEXT}</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">{LONG_TEXT}</SegmentedControl.Segment>
            </SegmentedControl>

            {/* Сегменты только с иконкой: цветом иконки управляет IconWrapper внутри сегмента. */}
            <div style={{ width: 144 }}>
                <SegmentedControl
                    type={ESegmentedControlType.SINGLE}
                    theme={ESegmentedControlTheme.SECONDARY_1}
                    size={ESegmentedControlSize.LG}
                    value={iconValue}
                    onSelect={setIconValue}
                >
                    {ICON_SEGMENTS.map((segmentValue) => (
                        <SegmentedControl.Segment key={segmentValue} value={segmentValue} aria-label={segmentValue}>
                            <DefaulticonStrokePrdIcon20
                                paletteIndex={
                                    iconValue === segmentValue ? SELECTED_ICON_PALETTE_INDEX : ICON_PALETTE_INDEX
                                }
                                style={{ display: "block" }}
                            />
                        </SegmentedControl.Segment>
                    ))}
                </SegmentedControl>
            </div>

            {/* MULTIPLE: ни один сегмент не выбран. */}
            <SegmentedControl
                type={ESegmentedControlType.MULTIPLE}
                theme={ESegmentedControlTheme.SECONDARY_2}
                size={ESegmentedControlSize.MD}
                value={emptyMultipleValue}
                onSelect={setEmptyMultipleValue}
            >
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            </SegmentedControl>

            {/* MULTIPLE: выбраны все сегменты. */}
            <SegmentedControl
                type={ESegmentedControlType.MULTIPLE}
                theme={ESegmentedControlTheme.GENERAL_2}
                size={ESegmentedControlSize.MD}
                value={fullMultipleValue}
                onSelect={setFullMultipleValue}
            >
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            </SegmentedControl>
        </div>
    );
};
