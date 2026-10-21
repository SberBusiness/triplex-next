import React from "react";
import { OrderedList } from "@sberbusiness/triplex-next";

const START_VALUES = [5, 0, -2];

export const Start = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
        {START_VALUES.map((start) => (
            <div key={start} style={{ width: 200, height: 112, flexShrink: 0 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>start={start}</div>
                <OrderedList start={start}>
                    <OrderedList.Item>List item text;</OrderedList.Item>
                    <OrderedList.Item>List item text;</OrderedList.Item>
                    <OrderedList.Item>List item text.</OrderedList.Item>
                </OrderedList>
            </div>
        ))}
    </div>
);
