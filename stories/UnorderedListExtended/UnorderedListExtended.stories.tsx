import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { UnorderedListExtended } from "@sberbusiness/triplex-next";
import {
    DefaultRender,
    DefaultSource,
    CustomMarkerTextRender,
    CustomMarkerTextSource,
    SizesRender,
    SizesSource,
    VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/UnorderedListExtended",
    component: UnorderedListExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "UnorderedListExtended — маркированный список с составным JSX-API: элементы собираются вручную " +
                    "через `UnorderedListExtended.Item`, маркер добавляется явно первым потомком элемента — " +
                    "`UnorderedListExtended.Item.Marker`. Без содержимого маркер рисует точку. Элемент принимает " +
                    "типографику `Text` (`size`, `type`, `weight`, `line`), размер по умолчанию — `ETextSize.B3`. " +
                    "Если список строится из данных, используйте `UnorderedList` с массивом `items`.",
            },
            // Ни у списка, ни у обёртки маркера нет собственных props — ArgTypes показал бы
            // пустую таблицу, поэтому блоки Props и Playground не создаются
            // (docs/ai/stories-guide.md → «Когда не создавать Playground»).
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof UnorderedListExtended>;

export default meta;

export const Default: StoryObj<typeof UnorderedListExtended> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
    render: DefaultRender,
};

export const CustomMarkerText: StoryObj<typeof UnorderedListExtended> = {
    name: "With custom marker/text",
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CustomMarkerTextSource,
                language: "tsx",
            },
        },
    },
    render: CustomMarkerTextRender,
};

export const Sizes: StoryObj<typeof UnorderedListExtended> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
    render: SizesRender,
};

export const VisualTests: StoryObj<typeof UnorderedListExtended> = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: VisualTestsRender,
};
