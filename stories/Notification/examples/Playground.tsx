import React from "react";
import { Notification } from "@sberbusiness/triplex-next";
import {
    DefaulticonStrokePrdIcon20,
    ErrorStrokeStsIcon20,
    SuccessStrokeStsIcon20,
    WarningStrokeStsIcon20,
} from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

export interface INotificationPlaygroundProps {
    withExtraBottomPadding: boolean;
    isShowCloseOnHover: boolean;
    showIcon: boolean;
    iconType: "success" | "warning" | "error" | "default";
    showHeader: boolean;
    headerText: string;
    showContent: boolean;
    contentText: string;
    showList: boolean;
    listItems: string;
    showFooter: boolean;
    showClose: boolean;
    showTime: boolean;
    time: string;
}

export const Playground = (args: INotificationPlaygroundProps) => {
    const getIcon = () => {
        switch (args.iconType) {
            case "success":
                return <SuccessStrokeStsIcon20 paletteIndex={0} />;
            case "warning":
                return <WarningStrokeStsIcon20 paletteIndex={2} />;
            case "error":
                return <ErrorStrokeStsIcon20 paletteIndex={1} />;
            case "default":
                return <DefaulticonStrokePrdIcon20 paletteIndex={5} />;
            default:
                return <SuccessStrokeStsIcon20 paletteIndex={0} />;
        }
    };

    const listValues = args.listItems ? args.listItems.split(";").filter((item) => item.trim() !== "") : [];

    const children: React.ReactElement[] = [];

    if (args.showIcon) {
        children.push(<Notification.Icon key="icon">{getIcon()}</Notification.Icon>);
    }

    const bodyChildren: React.ReactElement[] = [];
    if (args.showHeader) {
        bodyChildren.push(<Notification.Body.Header key="header">{args.headerText}</Notification.Body.Header>);
    }
    if (args.showContent) {
        bodyChildren.push(<Notification.Body.Content key="content">{args.contentText}</Notification.Body.Content>);
    }
    if (args.showList && listValues.length > 0) {
        bodyChildren.push(
            <Notification.Body.List
                key="list"
                items={listValues.map((item, index) => ({
                    key: `list-item-${index}`,
                    children: item,
                }))}
            />,
        );
    }
    if (args.showFooter) {
        bodyChildren.push(<Notification.Body.Footer key="footer">Footer text</Notification.Body.Footer>);
    }

    children.push(<Notification.Body key="body">{bodyChildren}</Notification.Body>);

    if (args.showClose) {
        children.push(<Notification.Close key="close" onClick={action("onClose")} />);
    }

    if (args.showTime) {
        children.push(<Notification.Time key="time" time={args.time} />);
    }

    return (
        <div style={{ maxWidth: "600px" }}>
            <Notification
                withExtraBottomPadding={args.withExtraBottomPadding}
                isShowCloseOnHover={args.isShowCloseOnHover}
                onClick={action("onClick")}
            >
                {children}
            </Notification>
        </div>
    );
};
