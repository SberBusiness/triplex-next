import React from "react";
import { IslandWidget } from "@sberbusiness/triplex-next";

export const WithoutFooterExample = () => (
    <IslandWidget
        renderBody={(props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>}
        renderHeader={(props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Title>Title</IslandWidget.Header.Title>
                <IslandWidget.Header.Description>Description</IslandWidget.Header.Description>
            </IslandWidget.Header>
        )}
    />
);
