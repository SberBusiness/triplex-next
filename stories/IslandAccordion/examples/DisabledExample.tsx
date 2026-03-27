import React from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const DisabledExample = () => (
    <IslandAccordion>
        <IslandAccordion.Item id="island-accordion-disabled" num={1} title="Title" disabled>
            <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
            <IslandAccordion.Item.Footer>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button Name
                </Button>
            </IslandAccordion.Item.Footer>
        </IslandAccordion.Item>
    </IslandAccordion>
);
