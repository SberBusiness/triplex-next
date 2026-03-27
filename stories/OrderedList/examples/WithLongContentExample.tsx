import React from "react";
import { OrderedList } from "@sberbusiness/triplex-next";

export const WithLongContentExample = () => (
    <div style={{ maxWidth: "200px" }}>
        <OrderedList>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>Extremely long list item that fits in two lines.</OrderedList.Item>
        </OrderedList>
    </div>
);
