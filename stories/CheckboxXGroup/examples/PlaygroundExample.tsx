import React from "react";
import { Checkbox, CheckboxXGroup, EComponentSize } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs extends Pick<React.ComponentProps<typeof CheckboxXGroup>, "indent"> {}

export const PlaygroundExample = ({ indent = 16 }: PlaygroundArgs) => (
    <CheckboxXGroup indent={indent}>
        {[1, 2, 3].map((value) => (
            <Checkbox key={value} name="checkbox-x-group" value={value} size={EComponentSize.MD}>
                Checkbox text
            </Checkbox>
        ))}
    </CheckboxXGroup>
);
