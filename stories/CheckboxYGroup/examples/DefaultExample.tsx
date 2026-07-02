import React from "react";
import { Checkbox, CheckboxYGroup } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <CheckboxYGroup>
        {[1, 2, 3].map((value) => (
            <Checkbox key={value} name="checkbox-y-group" value={value}>
                Checkbox text
            </Checkbox>
        ))}
    </CheckboxYGroup>
);
