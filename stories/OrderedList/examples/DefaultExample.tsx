import React from "react";
import { OrderedList } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: 200 }}>
        <OrderedList>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text.</OrderedList.Item>
        </OrderedList>
    </div>
);
