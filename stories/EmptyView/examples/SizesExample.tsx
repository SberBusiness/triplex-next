import React from "react";
import { EmptyView, EEmptyViewSize } from "@sberbusiness/triplex-next";
import { ServicesetupSysIcon96, ServicesetupSysIcon128 } from "@sberbusiness/icons-next";

export const SizesExample = () => (
    <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <div style={{ maxWidth: "380px" }}>
                <EmptyView
                    size={EEmptyViewSize.SM}
                    icon={<ServicesetupSysIcon96 />}
                    title="Title text"
                    description="This message provides additional context or highlights important information to note."
                    caption="Caption"
                />
            </div>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <div style={{ maxWidth: "380px" }}>
                <EmptyView
                    size={EEmptyViewSize.MD}
                    icon={<ServicesetupSysIcon128 />}
                    title="Title text"
                    description="This message provides additional context or highlights important information to note."
                    caption="Caption"
                />
            </div>
        </div>
    </div>
);
