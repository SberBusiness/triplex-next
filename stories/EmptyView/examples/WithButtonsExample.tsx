import React from "react";
import { EmptyView, EEmptyViewSize, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import { ServicesetupSysIcon96 } from "@sberbusiness/icons-next";

export const WithButtonsExample = () => (
    <div style={{ maxWidth: "380px" }}>
        <EmptyView
            size={EEmptyViewSize.SM}
            icon={<ServicesetupSysIcon96 />}
            title="Title text"
            description="This message provides additional context or highlights important information to note."
            caption="Caption"
            buttons={
                <>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </>
            }
        />
    </div>
);
