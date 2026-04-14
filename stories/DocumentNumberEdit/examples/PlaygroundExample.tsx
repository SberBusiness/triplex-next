import React, { useState } from "react";
import { DocumentNumberEdit } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof DocumentNumberEdit>) => {
    const [value, setValue] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    return <DocumentNumberEdit {...args} value={value} onChange={handleChange} />;
};
