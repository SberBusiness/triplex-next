import React from "react";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: "250px" }}>
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
            Button text
        </Button>
    </div>
);
