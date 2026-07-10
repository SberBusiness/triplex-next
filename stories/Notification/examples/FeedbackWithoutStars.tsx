import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFormFieldStatus,
    ETextSize,
    Notification,
    Text,
    TextareaField,
} from "@sberbusiness/triplex-next";
import { SuccessgradientStsIcon96 } from "@sberbusiness/icons-next";

export const FeedbackWithoutStars = () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [filledValue, setFilledValue] = useState("Нет возможности экспортировать данные из заказов");
    const [errorValue, setErrorValue] = useState("");

    const handleDefaultChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setDefaultValue(event.target.value);
    };

    const handleFilledChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setFilledValue(event.target.value);
    };

    const handleErrorChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setErrorValue(event.target.value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
                <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Default</h3>
                <Notification withExtraBottomPadding>
                    <Notification.Body>
                        <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                        <Notification.Body.Content>
                            <div>Чего не хватает вам и что оценят другие пользователи?</div>
                            <TextareaField
                                className="notificationBodyTextArea"
                                status={EFormFieldStatus.DEFAULT}
                                textareaProps={{
                                    value: defaultValue,
                                    onChange: handleDefaultChange,
                                }}
                                label="Как мы можем улучшить сервис?"
                            />
                        </Notification.Body.Content>
                        <Notification.Body.Footer>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Отправить
                            </Button>
                        </Notification.Body.Footer>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                </Notification>
            </div>

            <div>
                <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Filled</h3>
                <Notification withExtraBottomPadding>
                    <Notification.Body>
                        <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                        <Notification.Body.Content>
                            <div>Чего не хватает вам и что оценят другие пользователи?</div>
                            <TextareaField
                                className="notificationBodyTextArea"
                                status={EFormFieldStatus.DEFAULT}
                                textareaProps={{
                                    value: filledValue,
                                    onChange: handleFilledChange,
                                }}
                                label="Как мы можем улучшить сервис?"
                            />
                        </Notification.Body.Content>
                        <Notification.Body.Footer>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Отправить
                            </Button>
                        </Notification.Body.Footer>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                </Notification>
            </div>

            <div>
                <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Error</h3>
                <Notification withExtraBottomPadding>
                    <Notification.Body>
                        <Notification.Body.Header>Предложите идею</Notification.Body.Header>
                        <Notification.Body.Content>
                            <div>Чего не хватает вам и что оценят другие пользователи?</div>
                            <TextareaField
                                className="notificationBodyTextArea"
                                status={EFormFieldStatus.ERROR}
                                description={
                                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                                        Введите текст сообщения.
                                    </Text>
                                }
                                textareaProps={{
                                    value: errorValue,
                                    onChange: handleErrorChange,
                                }}
                                label="Как мы можем улучшить сервис?"
                            />
                        </Notification.Body.Content>
                        <Notification.Body.Footer>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Отправить
                            </Button>
                        </Notification.Body.Footer>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                </Notification>
            </div>

            <div>
                <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Success</h3>
                <Notification withExtraBottomPadding>
                    <Notification.Body>
                        <div className="finalStatus">
                            <SuccessgradientStsIcon96 />
                            <Notification.Body.Header>Спасибо за оценку!</Notification.Body.Header>
                            <Notification.Body.Content>Ваши отзывы помогают нам стать лучше.</Notification.Body.Content>
                        </div>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                </Notification>
            </div>
        </div>
    );
};
