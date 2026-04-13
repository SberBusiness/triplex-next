import React, { useState } from "react";
import { DateField } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof DateField>) => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <DateField {...args} value={value} onChange={setValue} />
        </div>
    );
};
