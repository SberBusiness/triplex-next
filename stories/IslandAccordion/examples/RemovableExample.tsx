import React from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const RemovableExample = () => {
    const handleRemove = (id: string) => document.getElementById(id)?.remove();

    return (
        <IslandAccordion>
            <IslandAccordion.Item id="island-accordion-removable" num={1} title="Title" onRemove={handleRemove}>
                <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
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
};
