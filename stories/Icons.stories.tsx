import React from "react";
import clsx from "clsx";
import { StoryObj } from "@storybook/react";
import * as icons from "@sberbusiness/icons-next";

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

const IconDisplay: React.FC<React.PropsWithChildren<IIconDisplayProps>> = ({ children, name, ...restProps }) => (
    <div className="icon-display">
        <IconItem className="icon-display-target" {...restProps}>
            {children}
        </IconItem>
        <div className="icon-display-name">{name}</div>
    </div>
);

interface IIconStoryArgs extends Pick<icons.ISingleColorIconProps, "paletteIndex"> {
    hoverable: boolean;
    disabled: boolean;
}

export const Default: StoryObj<IIconStoryArgs> = {
    args: {
        paletteIndex: 0,
    },
    render: ({ paletteIndex }) => {
        const { DefaulticonStrokePrdIcon32 } = icons;
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
        const { DefaulticonStrokePrdIcon32 } = icons;

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

export const StatusIcons: StoryObj<IIconStoryArgs> = {
    args: {
        paletteIndex: 0,
        hoverable: true,
        disabled: false,
    },
    render: ({ paletteIndex, ...restArgs }) => (
        <div className="icon-gallery">
            {Object.keys(icons).map((key) => {
                if (key.match(/StsIcon/)) {
                    const Icon = icons[key];
                    const inverted = paletteIndex === 6;

                    return (
                        <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                            <Icon paletteIndex={paletteIndex} />
                        </IconDisplay>
                    );
                }
            })}
        </div>
    ),

    parameters: {
        docs: {
            description: {
                story: "Иконки для отображения различных статусов и состояний: предупреждения, ожидание, системные, успех, информация, ошибки.",
            },
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
            {Object.keys(icons).map((key) => {
                if (key.match(/SrvIcon/)) {
                    const Icon = icons[key];
                    const inverted = paletteIndex === 6;

                    return (
                        <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                            <Icon paletteIndex={paletteIndex} />
                        </IconDisplay>
                    );
                }
            })}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для интерфейсных элементов и навигации: подсказки, закрытие (различные варианты), стрелки вверх и вниз.",
            },
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
            {Object.keys(icons).map((key) => {
                if (key.match(/PrdIcon/)) {
                    const Icon = icons[key];
                    const inverted = paletteIndex === 6;

                    return (
                        <IconDisplay key={key} name={key} inverted={inverted} {...restArgs}>
                            <Icon paletteIndex={paletteIndex} />
                        </IconDisplay>
                    );
                }
            })}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Иконки для продуктов: стандартная иконка продукта в различных размерах.",
            },
            canvas: {
                sourceState: "none",
            },
        },
    },
};
