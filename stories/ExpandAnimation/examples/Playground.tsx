import React from "react";
import { ETextSize, ExpandAnimation, IExpandAnimationProps, Text } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

export const Playground = (args: IExpandAnimationProps) => (
    <div style={{ maxWidth: 480 }}>
        <ExpandAnimation {...args} onStart={action("onStart")} onEnd={action("onEnd")}>
            <Text tag="div" size={ETextSize.B1}>
                Переключите свойство expanded в Controls, чтобы свернуть или развернуть этот блок. Свойство
                animationTime задаёт длительность анимации.
            </Text>
        </ExpandAnimation>
    </div>
);
