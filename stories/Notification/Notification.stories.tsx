import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Notification } from "@sberbusiness/triplex-next";
import {
    Business as BusinessRender,
    BusinessSource,
    BusinessStack as BusinessStackRender,
    BusinessStackSource,
    Default as DefaultRender,
    DefaultSource,
    FeedbackWithoutStars as FeedbackWithoutStarsRender,
    FeedbackWithoutStarsSource,
    FeedbackWithStars as FeedbackWithStarsRender,
    FeedbackWithStarsSource,
    INotificationPlaygroundProps,
    Playground as PlaygroundRender,
    Status as StatusRender,
    StatusSource,
} from "./examples";
import "./Notification.less";

const meta = {
    title: "Components/Notification",
    component: Notification,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент уведомлений, используемый для отображения сообщений об успехе, ошибках или предупреждениях. Он включает в себя иконку, текстовое описание и, по желанию, список. Также включает кнопку для закрытия уведомления.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Notification} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Notification>;

export default meta;

export const Playground: StoryObj<INotificationPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        withExtraBottomPadding: false,
        isShowCloseOnHover: false,
        showIcon: true,
        iconType: "success",
        showHeader: true,
        headerText: "Title text",
        showContent: true,
        contentText: "This message provides context or highlights important information to note.",
        showList: false,
        listItems: "List item text;List item text;List item text",
        showFooter: false,
        showClose: true,
        showTime: false,
        time: "22:45",
    },
    argTypes: {
        withExtraBottomPadding: {
            control: { type: "boolean" },
            description: "Признак для увеличения отступа снизу",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        isShowCloseOnHover: {
            control: { type: "boolean" },
            description: "Показывать кнопку закрытия при наведении",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        showIcon: {
            control: { type: "boolean" },
            description: "Показывать иконку",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
                category: "Settings",
            },
        },
        iconType: {
            control: { type: "select" },
            options: ["success", "warning", "error", "default"],
            description: "Тип иконки",
            table: {
                type: { summary: "success | warning | error | default" },
                defaultValue: { summary: "success" },
                category: "Settings",
            },
        },
        showHeader: {
            control: { type: "boolean" },
            description: "Показывать заголовок",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
                category: "Settings",
            },
        },
        headerText: {
            control: { type: "text" },
            description: "Текст заголовка",
            table: {
                type: { summary: "string" },
                category: "Settings",
            },
        },
        showContent: {
            control: { type: "boolean" },
            description: "Показывать содержимое",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
                category: "Settings",
            },
        },
        contentText: {
            control: { type: "text" },
            description: "Текст содержимого",
            table: {
                type: { summary: "string" },
                category: "Settings",
            },
        },
        showList: {
            control: { type: "boolean" },
            description: "Показывать список",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
                category: "Settings",
            },
        },
        listItems: {
            control: { type: "text" },
            description: "Элементы списка (разделенные точкой с запятой)",
            table: {
                type: { summary: "string" },
                category: "Settings",
            },
        },
        showFooter: {
            control: { type: "boolean" },
            description: "Показывать футер",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
                category: "Settings",
            },
        },
        showClose: {
            control: { type: "boolean" },
            description: "Показывать кнопку закрытия",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
                category: "Settings",
            },
        },
        showTime: {
            control: { type: "boolean" },
            description: "Показывать время",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
                category: "Settings",
            },
        },
        time: {
            control: { type: "text" },
            description: "Время",
            table: {
                type: { summary: "string" },
                category: "Settings",
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
    render: (args) => <PlaygroundRender {...args} />,
};

export const Default: StoryObj<typeof Notification> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Status: StoryObj<typeof Notification> = {
    render: StatusRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StatusSource,
                language: "tsx",
            },
        },
    },
};

export const Business: StoryObj<typeof Notification> = {
    render: BusinessRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: BusinessSource,
                language: "tsx",
            },
        },
    },
};

export const BusinessStack: StoryObj<typeof Notification> = {
    name: "Business Stack",
    render: BusinessStackRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: BusinessStackSource,
                language: "tsx",
            },
        },
    },
};

export const FeedbackWithoutStars: StoryObj<typeof Notification> = {
    name: "Feedback Without Stars",
    render: FeedbackWithoutStarsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: FeedbackWithoutStarsSource,
                language: "tsx",
            },
        },
    },
};

export const FeedbackWithStars: StoryObj<typeof Notification> = {
    name: "Feedback With Stars",
    render: FeedbackWithStarsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: FeedbackWithStarsSource,
                language: "tsx",
            },
        },
    },
};
