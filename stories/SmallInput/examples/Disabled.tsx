import React from "react";
import { SmallInput } from "@sberbusiness/triplex-next";

export const Disabled = () => (
    <div style={{ width: "120px" }}>
        <SmallInput defaultValue="000123" placeholder="000000" disabled />
    </div>
);
