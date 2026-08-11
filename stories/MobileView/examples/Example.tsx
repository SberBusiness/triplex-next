import React from "react";
import { Button, EButtonTheme, EComponentSize, useMobileView } from "@sberbusiness/triplex-next";

export const Example = () => {
    const mobile = useMobileView();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: mobile ? "column" : "row",
                gap: "8px",
                maxWidth: "400px",
            }}
        >
            <Button
                theme={EButtonTheme.GENERAL}
                size={mobile ? EComponentSize.SM : EComponentSize.MD}
                block={mobile}
                onClick={() => {}}
            >
                Сохранить
            </Button>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={mobile ? EComponentSize.SM : EComponentSize.MD}
                block={mobile}
                onClick={() => {}}
            >
                Отменить
            </Button>
        </div>
    );
};
