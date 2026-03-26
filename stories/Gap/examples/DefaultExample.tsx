import React from "react";
import { Gap } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div>
        <div
            style={{
                padding: "16px",
                textAlign: "center",
                backgroundColor: "rgb(255, 217, 160)",
            }}
        >
            Sample Text Above
        </div>

        <Gap size={16} />

        <div
            style={{
                padding: "16px",
                textAlign: "center",
                backgroundColor: "rgb(255, 217, 160)",
            }}
        >
            Sample Text Below
        </div>
    </div>
);
