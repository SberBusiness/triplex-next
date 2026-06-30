import React from "react";
import { Checkbox, CheckboxXGroup } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <CheckboxXGroup>
        {[1, 2, 3].map((value) => (
            <Checkbox key={value} name="checkbox-x-group" value={value}>
                Checkbox text
            </Checkbox>
        ))}
    </CheckboxXGroup>
);
