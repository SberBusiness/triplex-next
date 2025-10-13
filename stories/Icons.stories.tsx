import React from "react";
import clsx from "clsx";
import { StoryObj } from "@storybook/react";
import * as iconModule from "@sberbusiness/icons-next";

const iconCategoryMap: Record<string, string[]> = Object.keys(iconModule)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reduce((map, key) => {
        const results = key.match(/(Acc|Brd|Ill|Mrk|Nav|Prd|Srv|Sts|Sys)Icon/);

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

const paletteIndexes = Array.from(Array(8).keys());

export default {
    title: "Icons/Icons",
    parameters: {
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

interface IIconStoryArgs extends Pick<iconModule.ISingleColorIconProps, "paletteIndex"> {
    hoverable: boolean;
    disabled: boolean;
}

export const Playground: StoryObj<IIconStoryArgs> = {
    args: {
        paletteIndex: 0,
    },
    render: ({ paletteIndex }) => {
        const { DefaulticonStrokePrdIcon32 } = iconModule;
        const inverted = paletteIndex === 6;

        return (
            <IconItem inverted={inverted} hoverable={true}>
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

export const Palettes: StoryObj<IIconStoryArgs> = {
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
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>0</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={0} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>1</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={1} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>2</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={2} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>3</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={3} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>4</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={4} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>5</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={5} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>6</div>
                    <IconItem inverted={true} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={6} />
                    </IconItem>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div style={{ textAlign: "center" }}>7</div>
                    <IconItem inverted={false} {...args}>
                        <DefaulticonStrokePrdIcon32 paletteIndex={7} />
                    </IconItem>
                </div>
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

export const BrandIcon: StoryObj<IIconStoryArgs> = {
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

export const ServiceIcons: StoryObj<IIconStoryArgs> = {
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

export const StatusIcons: StoryObj<IIconStoryArgs> = {
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

export const MarketingIcons: StoryObj<IIconStoryArgs> = {
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

export const NavigationIcons: StoryObj<IIconStoryArgs> = {
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

export const ProductIcons: StoryObj<IIconStoryArgs> = {
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

export const SystemIcons: StoryObj<IIconStoryArgs> = {
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
