import React from "react";
import { SmallInput } from "@sberbusiness/triplex-next";

export const ReadOnly = () => (
    <div style={{ width: "120px" }}>
        <SmallInput defaultValue="000123" aria-label="Номер документа" readOnly />
    </div>
);
