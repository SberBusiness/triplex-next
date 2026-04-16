import React from "react";
import { EmptyView, EEmptyViewSize } from "@sberbusiness/triplex-next";
import ServicesetupSysIcon96 from "@sberbusiness/icons-next/WaitgradientStsIcon96";

export const DefaultExample = () => (
    <div style={{ maxWidth: "380px" }}>
        <EmptyView
            size={EEmptyViewSize.SM}
            icon={<ServicesetupSysIcon96 />}
            title="Title text"
            description="This message provides additional context or highlights important information to note."
            caption="Caption"
        />
    </div>
);
