import React from "react";
import { SortStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { Chip } from "@sberbusiness/triplex-next";

export const WithPrefixAndPostfixExample = () => (
    <Chip prefix={<SortStrokeSrvIcon20 paletteIndex={5} />} postfix={<SortStrokeSrvIcon20 paletteIndex={5} />}>
        Value
    </Chip>
);
