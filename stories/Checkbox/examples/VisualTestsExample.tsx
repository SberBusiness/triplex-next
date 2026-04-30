import React from "react";
import { Checkbox, EComponentSize, Gap } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Checkbox size={EComponentSize.SM} checked>
                SM
            </Checkbox>
            <Gap size={16} />
            <Checkbox size={EComponentSize.MD} checked>
                MD
            </Checkbox>
            <Gap size={16} />
            <Checkbox size={EComponentSize.LG} checked>
                LG
            </Checkbox>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Checkbox size={EComponentSize.SM} checked bulk>
                SM
            </Checkbox>
            <Gap size={16} />
            <Checkbox size={EComponentSize.MD} checked bulk>
                MD
            </Checkbox>
            <Gap size={16} />
            <Checkbox size={EComponentSize.LG} checked bulk>
                LG
            </Checkbox>
        </div>
    </div>
);
