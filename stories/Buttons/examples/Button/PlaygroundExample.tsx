import React from "react";
import { Button } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof Button>) => (
    <div style={{ width: "250px" }}>
        <Button {...args} />
    </div>
);
