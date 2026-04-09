import React from "react";
import { Checkbox, EComponentSize, Gap } from "@sberbusiness/triplex-next";

export const SizesExample = () => (
    <>
        <Checkbox size={EComponentSize.SM}>SM</Checkbox>
        <Gap size={16} />
        <Checkbox size={EComponentSize.MD}>MD</Checkbox>
        <Gap size={16} />
        <Checkbox size={EComponentSize.LG}>LG</Checkbox>
    </>
);
