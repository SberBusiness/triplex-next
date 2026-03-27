import React from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize, EStepStatus } from "@sberbusiness/triplex-next";

const ITEMS = [
    { id: "accordion-status-0", status: EStepStatus.DEFAULT },
    { id: "accordion-status-1", status: EStepStatus.DONE },
    { id: "accordion-status-2", status: EStepStatus.ACTIVE },
    { id: "accordion-status-3", status: EStepStatus.ERROR },
    { id: "accordion-status-4", status: EStepStatus.DISABLED },
    { id: "accordion-status-5", status: EStepStatus.WARNING },
];

export const WithStatusExample = () => (
    <IslandAccordion>
        {ITEMS.map(({ id, status }, index) => (
            <IslandAccordion.Item key={id} id={id} num={index + 1} status={status} title="Title">
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                        Button link text
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
        ))}
    </IslandAccordion>
);
