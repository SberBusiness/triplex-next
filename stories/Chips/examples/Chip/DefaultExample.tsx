import React, { useState } from "react";
import { Chip } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [selected, setSelected] = useState(false);
    return (
        <Chip selected={selected} onClick={() => setSelected((s) => !s)}>
            Value
        </Chip>
    );
};
