import React from "react";
import clsx from "clsx";
import { StoryObj, ArgTypes } from "@storybook/react";
import * as iconModule from "@sberbusiness/icons-next";

const paletteIndexes = Array.from(Array(12).keys());

export default {
    title: "Icons/Icons",
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Библиотека иконок (@sberbusiness/icons-next)

## Использование

\`\`\`tsx
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";

<DefaulticonStrokePrdIcon32 paletteIndex={0} />;
\`\`\`
                `,
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        paletteIndex: {
            control: { type: "select" },
            options: paletteIndexes,
            description: "Индекс цветовой палитры для изменения заливки иконки.",
        },
    },
};

const iconCategoryMap: Record<string, string[]> = Object.keys(iconModule)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reduce((map, key) => {
        const results = key.match(/(Brd|Map|Mrk|Mkr|Nav|Prd|Srv|Sts|Sys)Icon/);

        if (results) {
            const category = results[1];

            if (category in map) {
                map[category].push(key);
            } else {
                map[category] = [key];
            }
        }
        return map;
    }, {});

interface IIconItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    inverted: boolean;
    hoverable: boolean;
}

const IconItem: React.FC<React.PropsWithChildren<IIconItemProps>> = ({
    className,
    inverted,
    hoverable,
    ...restProps
}) => <button className={clsx("icon-item", className, { inverted, hoverable })} {...restProps} />;

interface IIconDisplayProps extends IIconItemProps {
    name: string;
}

const IconDisplay: React.FC<React.PropsWithChildren<IIconDisplayProps>> = ({ name, ...restProps }) => (
    <div className="icon-display">
        <IconItem className="icon-display-target" {...restProps} />
        <div className="icon-display-name">{name}</div>
    </div>
);

interface StoryArgs extends Pick<iconModule.ISingleColorIconProps, "paletteIndex"> {
    hoverable: boolean;
    disabled: boolean;
}

const STORY_ARGS: StoryArgs = {
    // Props
    paletteIndex: 0,
    // Settings
    hoverable: false,
    disabled: false,
};

const STORY_ARG_TYPES: ArgTypes<StoryArgs> = {
    // Props
    paletteIndex: {
        control: { type: "number" },
        table: {
            category: "Props",
        },
    },
    // Settings
    hoverable: {
        description: "Флаг интерактивности.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
    disabled: {
        description: "Отключённое состояние.",
        control: { type: "boolean" },
        table: {
            category: "Settings",
            defaultValue: { summary: "false" },
        },
    },
};

export const Playground: StoryObj<StoryArgs> = {
    args: STORY_ARGS,
    argTypes: STORY_ARG_TYPES,
    render: ({ paletteIndex, hoverable, disabled }) => {
        const { DefaulticonStrokePrdIcon32 } = iconModule;
        const inverted = paletteIndex === 6;

        return (
            <IconItem inverted={inverted} hoverable={hoverable} disabled={disabled}>
                <DefaulticonStrokePrdIcon32 paletteIndex={paletteIndex} />
            </IconItem>
        );
    },
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const Palettes: StoryObj<StoryArgs> = {
    args: {
        hoverable: true,
        disabled: false,
    },
    argTypes: {
        paletteIndex: {
            control: false,
        },
    },
    render: (args) => {
        const { DefaulticonStrokePrdIcon32 } = iconModule;

        return (
            <div>
                {paletteIndexes.map((paletteIndex) => (
                    <div key={paletteIndex} style={{ display: "inline-block" }}>
                        <div style={{ textAlign: "center" }}>{paletteIndex}</div>
                        <IconItem inverted={paletteIndex === 6} {...args}>
                            <DefaulticonStrokePrdIcon32 paletteIndex={paletteIndex} />
                        </IconItem>
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Возможные индексы цветовой палитры для изменения заливки иконки.",
            },
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const BrandIcons: StoryObj<StoryArgs> = {
    name: "Brand icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Brd"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),

    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const MapIcons: StoryObj<StoryArgs> = {
    name: "Map icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Map"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),

    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const MarkerIcons: StoryObj<StoryArgs> = {
    name: "Marker icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Mkr"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),

    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const MarketingIcons: StoryObj<StoryArgs> = {
    name: "Marketing icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Mrk"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),

    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const NavigationIcons: StoryObj<StoryArgs> = {
    name: "Navigation icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Nav"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const ProductIcons: StoryObj<StoryArgs> = {
    name: "Product icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Prd"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const ServiceIcons: StoryObj<StoryArgs> = {
    name: "Service icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Srv"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const StatusIcons: StoryObj<StoryArgs> = {
    name: "Status icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Sts"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),

    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const SystemIcons: StoryObj<StoryArgs> = {
    name: "System icons",
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {iconCategoryMap["Sys"].map((key) => {
                const Icon = iconModule[key];
                const inverted = paletteIndex === 6;

                return (
                    <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                        <Icon paletteIndex={paletteIndex} />
                    </IconDisplay>
                );
            })}
        </div>
    ),
    parameters: {
        docs: {
            canvas: {
                sourceState: "none",
            },
        },
    },
};
