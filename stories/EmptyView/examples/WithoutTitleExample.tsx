import React from "react";
import { EmptyView, EEmptyViewSize } from "@sberbusiness/triplex-next";
import { ServicesetupSysIcon96 } from "@sberbusiness/icons-next";

export const WithoutTitleExample = () => (
    <div style={{ maxWidth: "380px" }}>
        <EmptyView
            size={EEmptyViewSize.SM}
            icon={<ServicesetupSysIcon96 />}
            description="This message provides additional context or highlights important information to note."
            caption="Caption"
        />
    </div>
);
