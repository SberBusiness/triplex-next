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
    TextField,
} from "@sberbusiness/triplex-next";
import { SuccessgradientStsIcon96 } from "@sberbusiness/icons-next";

export const FeedbackWithoutStars = () => {
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
                    <Notification.Close onClick={() => {}} />
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
                    <Notification.Close onClick={() => {}} />
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
                    <Notification.Close onClick={() => {}} />
                </Notification>
            </div>

            <div>
                <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Success</h3>
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
