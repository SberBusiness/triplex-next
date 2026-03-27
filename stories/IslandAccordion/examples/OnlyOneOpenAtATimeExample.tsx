import React, { useState } from "react";
import { IslandAccordion, Button, EButtonTheme, EComponentSize, EStepStatus } from "@sberbusiness/triplex-next";

const ITEMS = [
    { id: "accordion-single-0", status: EStepStatus.DEFAULT },
    { id: "accordion-single-1", status: EStepStatus.DONE },
    { id: "accordion-single-2", status: EStepStatus.ACTIVE },
];

export const OnlyOneOpenAtATimeExample = () => {
    const [openItemId, setOpenItemId] = useState<string>();

    const handleToggle = (open: boolean, id: string) => setOpenItemId(open ? id : undefined);

    return (
        <IslandAccordion>
            {ITEMS.map(({ id, status }, index) => (
                <IslandAccordion.Item
                    key={id}
                    id={id}
                    num={index + 1}
                    status={status}
                    title="Title"
                    opened={id === openItemId}
                    onToggle={handleToggle}
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
            ))}
        </IslandAccordion>
    );
};
