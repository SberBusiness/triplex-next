import React from "react";
import { OrderedList, IOrderedListProps } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs extends Pick<IOrderedListProps, "start"> {}

export const Playground = ({ start }: IPlaygroundArgs) => (
    <div style={{ maxWidth: 200 }}>
        <OrderedList start={start}>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text;</OrderedList.Item>
            <OrderedList.Item>List item text.</OrderedList.Item>
        </OrderedList>
    </div>
);
