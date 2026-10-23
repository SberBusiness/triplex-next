import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Portal,
    Puller,
    PullerBody,
    PullerClose,
    PullerFooter,
    PullerHeader,
    PullerList,
    PullerListItem,
    Text,
} from "@sberbusiness/triplex-next";

/** Свойства Playground-примера Puller. */
export interface IPlaygroundProps {
    /** Начальное состояние открытости. */
    opened: boolean;
    /** Заголовок в шапке. */
    title: string;
    /** Состояние загрузки списка (prop компонента PullerList). */
    listLoading: boolean;
    /** С футером. */
    withFooter: boolean;
}

const OPTIONS = [
    { id: "playground-option-1", label: "Value 1" },
    { id: "playground-option-2", label: "Value 2" },
    { id: "playground-option-3", label: "Value 3" },
];

const PlaygroundContent = ({ opened: initialOpened, title, listLoading, withFooter }: IPlaygroundProps) => {
    const [opened, setOpened] = useState(initialOpened);
    const [selectedId, setSelectedId] = useState<string>();

    const handleSetOpened = (nextOpened: boolean) => {
        action("setOpened")(nextOpened);
        setOpened(nextOpened);
    };

    const handleSelect = (id: string) => {
        action("onSelect")(id);
        setSelectedId(id);
        handleSetOpened(false);
    };

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={() => handleSetOpened(true)}
            >
                Open
            </Button>
            <Portal container={document.body}>
                <Puller
                    opened={opened}
                    setOpened={handleSetOpened}
                    role="dialog"
                    aria-labelledby="puller-playground-title"
                >
                    <PullerHeader
                        controlButtons={<PullerClose aria-label="Close" onClick={() => handleSetOpened(false)} />}
                    >
                        <Text id="puller-playground-title" size={ETextSize.B1}>
                            {title}
                        </Text>
                    </PullerHeader>
                    <PullerBody>
                        <PullerList loading={listLoading} aria-labelledby="puller-playground-title">
                            {OPTIONS.map((option) => (
                                <PullerListItem
                                    key={option.id}
                                    id={option.id}
                                    selected={option.id === selectedId}
                                    onSelect={() => handleSelect(option.id)}
                                >
                                    {option.label}
                                </PullerListItem>
                            ))}
                        </PullerList>
                    </PullerBody>
                    {withFooter && (
                        <PullerFooter>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.MD}
                                block
                                onClick={() => handleSetOpened(false)}
                            >
                                Done
                            </Button>
                        </PullerFooter>
                    )}
                </Puller>
            </Portal>
        </div>
    );
};

export const Playground = (args: IPlaygroundProps) => (
    // Control `opened` задаёт начальное состояние; key-reset перемонтирует пример при его изменении.
    <PlaygroundContent key={String(args.opened)} {...args} />
);
