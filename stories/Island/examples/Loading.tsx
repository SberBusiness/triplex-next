import React from "react";
import { Island, EIslandType, EComponentSize } from "@sberbusiness/triplex-next";

export const Loading = () => (
    <div style={{ maxWidth: 360 }}>
        <Island type={EIslandType.TYPE_1} size={EComponentSize.MD} isLoading>
            <Island.Header>Island Header</Island.Header>
            <Island.Body>Island Body</Island.Body>
            <Island.Footer>Island Footer</Island.Footer>
        </Island>
    </div>
);
