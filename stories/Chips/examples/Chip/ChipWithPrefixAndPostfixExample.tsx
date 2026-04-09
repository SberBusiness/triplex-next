import React from "react";
import { SortStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { Chip } from "@sberbusiness/triplex-next";

export const ChipWithPrefixAndPostfixExample = () => (
    <Chip prefix={<SortStrokeSrvIcon20 paletteIndex={5} />} postfix={<SortStrokeSrvIcon20 paletteIndex={5} />}>
        Value
    </Chip>
);
