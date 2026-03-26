import React from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize, EStepStatus } from "@sberbusiness/triplex-next";

export const WithStepHintExample = () => (
    <IslandAccordion>
        <IslandAccordion.Item
            id="island-accordion-step-hint"
            num={1}
            status={EStepStatus.DONE}
            title="Title"
            stepHint="Текст подсказки."
        >
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
    </IslandAccordion>
);
