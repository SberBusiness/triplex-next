import React, { useState } from "react";
import {
    Button,
    Checkbox,
    CheckboxYGroup,
    EButtonTheme,
    EComponentSize,
    EFormFieldStatus,
    Notification,
    TextField,
} from "@sberbusiness/triplex-next";
import { StarStrokeSrvIcon32, SuccessgradientStsIcon96 } from "@sberbusiness/icons-next";

export const FeedbackWithStars = () => {
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
                    <Notification.Close onClick={() => {}} />
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
                    <Notification.Close onClick={() => {}} />
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
                                aria-label="Причины неудовлетворенности"
                                className="notificationBodyCheckbox"
                            >
                                {checkboxes.map((checkboxValue, index) => (
                                    <Checkbox key={index} name="checkbox-y-group">
                                        {checkboxValue}
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
