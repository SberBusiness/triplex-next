import { Notification } from "../../src/components/Notification/Notification";
import { NotificationGrouped } from "../../src/components/Notification/NotificationGrouped";
import {
    DefaulticonStrokePrdIcon20,
    ErrorStrokeStsIcon20,
    SuccessStrokeStsIcon20,
    WarningStrokeStsIcon20,
    SuccessgradientStsIcon96,
    StarStrokeSrvIcon32,
} from "@sberbusiness/icons-next";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EButtonTheme, Button } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { AlertContext, EAlertType } from "../../src/components/Alert";
import React, { useState } from "react";
import { EFormFieldStatus } from "../../src/components/FormField";
import { Text, ETextSize, EFontType } from "../../src/components/Typography";
import { TextField } from "../../src/components/TextField";
import { Checkbox, CheckboxYGroup } from "../../src/components/Checkbox";
import "./Notification.less";

export default {
    title: "Components/Notification",
    component: Notification,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Компонент уведомлений, используемый для отображения сообщений об успехе, ошибках или предупреждениях. Он включает в себя иконку, текстовое описание и, по желанию, список. Также включает кнопку для закрытия уведомления.",
            },
        },
    },
};

interface INotificationPlaygroundProps {
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

export const Playground: StoryObj<INotificationPlaygroundProps> = {
    name: "Playground",
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
        listItems: "List item text 1;List item text 2;List item text 3",
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
            },
        },
        iconType: {
            control: { type: "select" },
            options: ["success", "warning", "error", "default"],
            description: "Тип иконки",
            table: {
                type: { summary: "success | warning | error | default" },
                defaultValue: { summary: "success" },
            },
        },
        showHeader: {
            control: { type: "boolean" },
            description: "Показывать заголовок",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        headerText: {
            control: { type: "text" },
            description: "Текст заголовка",
            table: {
                type: { summary: "string" },
            },
        },
        showContent: {
            control: { type: "boolean" },
            description: "Показывать содержимое",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        contentText: {
            control: { type: "text" },
            description: "Текст содержимого",
            table: {
                type: { summary: "string" },
            },
        },
        showList: {
            control: { type: "boolean" },
            description: "Показывать список",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        listItems: {
            control: { type: "text" },
            description: "Элементы списка (разделенные точкой с запятой)",
            table: {
                type: { summary: "string" },
            },
        },
        showFooter: {
            control: { type: "boolean" },
            description: "Показывать футер",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        showClose: {
            control: { type: "boolean" },
            description: "Показывать кнопку закрытия",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        showTime: {
            control: { type: "boolean" },
            description: "Показывать время",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        time: {
            control: { type: "text" },
            description: "Время",
            table: {
                type: { summary: "string" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Notification с расширенными controls. Позволяет настраивать все основные свойства компонента, включая отображение иконки, заголовка, содержимого, списка, футера, кнопки закрытия и времени.",
            },
        },
    },
    render: (args) => {
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
            bodyChildren.push(<Notification.Body.List key="list" values={listValues} />);
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
    },
};

export const Status: StoryObj<typeof Notification> = {
    name: "Status",
    render: () => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Success</h3>
                    <Notification>
                        <Notification.Icon>
                            <SuccessStrokeStsIcon20 paletteIndex={0} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                            <Notification.Body.List values={Array.from({ length: 3 }, () => "List item text;")} />
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Warning</h3>
                    <Notification>
                        <Notification.Icon>
                            <WarningStrokeStsIcon20 paletteIndex={2} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                            <Notification.Body.List values={Array.from({ length: 3 }, () => "List item text;")} />
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
                    <Notification>
                        <Notification.Icon>
                            <ErrorStrokeStsIcon20 paletteIndex={1} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                            <Notification.Body.List values={Array.from({ length: 3 }, () => "List item text;")} />
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>
            </div>
        );
    },
};

export const Business: StoryObj<typeof Notification> = {
    name: "Business",
    render: () => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Normal</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Icon>
                            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Header>Title text</Notification.Body.Header>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                        <Notification.Time time="22:45" />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Button</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Icon>
                            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Header>Title text</Notification.Body.Header>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                        <Notification.Time time="22:45" />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Alert</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Icon>
                            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                        </Notification.Icon>
                        <Notification.Body>
                            <Notification.Body.Header>Title text</Notification.Body.Header>
                            <Notification.Body.Content>
                                This message provides context or highlights important information to note.
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <AlertContext type={EAlertType.INFO}>
                                    This message provides context or highlights important information to note.
                                </AlertContext>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                        <Notification.Time time="22:45" />
                    </Notification>
                </div>
            </div>
        );
    },
};

export const BusinessStack: StoryObj<typeof Notification> = {
    name: "Business Stack",
    render: () => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Normal</h3>
                    <NotificationGrouped>
                        <Notification withExtraBottomPadding>
                            <Notification.Icon>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                            </Notification.Icon>
                            <Notification.Body>
                                <Notification.Body.Header>Title text</Notification.Body.Header>
                                <Notification.Body.Content>
                                    This message provides context or highlights important information to note.
                                </Notification.Body.Content>
                            </Notification.Body>
                            <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                            <Notification.Time time="22:45" />
                        </Notification>
                    </NotificationGrouped>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Button</h3>
                    <NotificationGrouped>
                        <Notification withExtraBottomPadding>
                            <Notification.Icon>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                            </Notification.Icon>
                            <Notification.Body>
                                <Notification.Body.Header>Title text</Notification.Body.Header>
                                <Notification.Body.Content>
                                    This message provides context or highlights important information to note.
                                </Notification.Body.Content>
                                <Notification.Body.Footer>
                                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                        Button text
                                    </Button>
                                </Notification.Body.Footer>
                            </Notification.Body>
                            <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                            <Notification.Time time="22:45" />
                        </Notification>
                    </NotificationGrouped>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Alert</h3>
                    <NotificationGrouped>
                        <Notification withExtraBottomPadding>
                            <Notification.Icon>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                            </Notification.Icon>
                            <Notification.Body>
                                <Notification.Body.Header>Title text</Notification.Body.Header>
                                <Notification.Body.Content>
                                    This message provides context or highlights important information to note.
                                </Notification.Body.Content>
                                <Notification.Body.Footer>
                                    <AlertContext type={EAlertType.INFO}>
                                        This message provides context or highlights important information to note.
                                    </AlertContext>
                                </Notification.Body.Footer>
                            </Notification.Body>
                            <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                            <Notification.Time time="22:45" />
                        </Notification>
                    </NotificationGrouped>
                </div>
            </div>
        );
    },
};

export const FeedbackWithoutStars: StoryObj<typeof Notification> = {
    name: "Feedback Without Stars",
    render: () => {
        const [defaultValue, setDefaultValue] = useState("");
        const [filledValue, setFilledValue] = useState("Нет возможности экспортировать данные из заказов");
        const [errorValue, setErrorValue] = useState("");

        const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDefaultValue(e.target.value);
        };

        const handleFilledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilledValue(e.target.value);
        };

        const handleErrorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setErrorValue(e.target.value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Default</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Чего не хватает вам и что оценят другие пользователи?</div>
                                <TextField
                                    className="notificationBodyTextArea"
                                    status={EFormFieldStatus.DEFAULT}
                                    inputProps={{
                                        value: defaultValue,
                                        onChange: handleDefaultChange,
                                    }}
                                    label={"Как мы можем улучшить сервис?"}
                                />
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Отправить
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Filled</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Чего не хватает вам и что оценят другие пользователи?</div>
                                <TextField
                                    className="notificationBodyTextArea"
                                    status={EFormFieldStatus.DEFAULT}
                                    inputProps={{
                                        value: filledValue,
                                        onChange: handleFilledChange,
                                    }}
                                    label={undefined}
                                />
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Отправить
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Чего не хватает вам и что оценят другие пользователи?</div>
                                <TextField
                                    className="notificationBodyTextArea"
                                    status={EFormFieldStatus.ERROR}
                                    description={
                                        <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                            Введите текст сообщения.
                                        </Text>
                                    }
                                    inputProps={{
                                        value: errorValue,
                                        onChange: handleErrorChange,
                                    }}
                                    label={"Как мы можем улучшить сервис?"}
                                />
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Отправить
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Success</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <div className="finalStatus">
                                <SuccessgradientStsIcon96 />
                                <Notification.Body.Header>Спасибо за оценку!</Notification.Body.Header>
                                <Notification.Body.Content>
                                    Ваши отзывы помогают нам стать лучше.
                                </Notification.Body.Content>
                            </div>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>
            </div>
        );
    },
};

export const FeedbackWithStars: StoryObj<typeof Notification> = {
    name: "Feedback With Stars",
    render: () => {
        const [value, setValue] = useState("");
        const checkboxes = [
            "Встречается неточная информация",
            "Уведомления приходят ночью",
            "Не хватает данных в сообщении",
        ];

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Default</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Оцените оформление кредита</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Оцените, насколько удобным был процесс оформления недавно полученого кредита.</div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <StarStrokeSrvIcon32
                                            key={index}
                                            paletteIndex={0}
                                            style={{ marginLeft: index !== 0 ? "24px" : "0px" }}
                                        />
                                    ))}
                                </div>
                            </Notification.Body.Content>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Filled</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Оцените оформление кредита</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Оцените, насколько удобным был процесс оформления недавно полученого кредита.</div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <StarStrokeSrvIcon32
                                            key={index}
                                            paletteIndex={0}
                                            style={{ marginLeft: index !== 0 ? "24px" : "0px" }}
                                        />
                                    ))}
                                </div>
                                <TextField
                                    className="notificationBodyTextArea"
                                    status={EFormFieldStatus.DEFAULT}
                                    inputProps={{
                                        value: value,
                                        onChange: handleChange,
                                    }}
                                    label={"Как мы можем улучшить сервис?"}
                                />
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Отправить
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <Notification.Body.Header>Оцените оформление кредита</Notification.Body.Header>
                            <Notification.Body.Content>
                                <div>Оцените, насколько удобным был процесс оформления недавно полученого кредита.</div>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <StarStrokeSrvIcon32
                                            key={index}
                                            paletteIndex={0}
                                            style={{ marginLeft: index !== 0 ? "24px" : "0px" }}
                                        />
                                    ))}
                                </div>
                                <CheckboxYGroup
                                    aria-labelledby="checkbox-y-group-label"
                                    className="notificationBodyCheckbox"
                                >
                                    {checkboxes.map((value, index) => (
                                        <Checkbox key={index} name="checkbox-y-group">
                                            {value}
                                        </Checkbox>
                                    ))}
                                </CheckboxYGroup>
                            </Notification.Body.Content>
                            <Notification.Body.Footer>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Отправить
                                </Button>
                            </Notification.Body.Footer>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>

                <div>
                    <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Success</h3>
                    <Notification withExtraBottomPadding>
                        <Notification.Body>
                            <div className="finalStatus">
                                <SuccessgradientStsIcon96 />
                                <Notification.Body.Header>Спасибо за оценку!</Notification.Body.Header>
                                <Notification.Body.Content>
                                    Ваши отзывы помогают нам стать лучше.
                                </Notification.Body.Content>
                            </div>
                        </Notification.Body>
                        <Notification.Close onClick={() => alert("Обработчик закрытия нотификации")} />
                    </Notification>
                </div>
            </div>
        );
    },
};
