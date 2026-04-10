import React from "react";
import { Checkbox, CheckboxXGroup, EComponentSize, Gap } from "@sberbusiness/triplex-next";

export const XGroupExample = () => (
    <>
        <CheckboxXGroup indent={16}>
            {[1, 2, 3].map((value) => (
                <Checkbox key={value} name="checkbox-x-group" value={value} size={EComponentSize.SM}>
                    Checkbox text
                </Checkbox>
            ))}
        </CheckboxXGroup>
        <Gap size={16} />
        <CheckboxXGroup indent={16}>
            {[1, 2, 3].map((value) => (
                <Checkbox key={value} name="checkbox-x-group" value={value}>
                    Checkbox text
                </Checkbox>
            ))}
        </CheckboxXGroup>
        <Gap size={16} />
        <CheckboxXGroup indent={20}>
            {[1, 2, 3].map((value) => (
                <Checkbox key={value} name="checkbox-x-group" value={value} size={EComponentSize.LG}>
                    Checkbox text
                </Checkbox>
            ))}
        </CheckboxXGroup>
    </>
);
