import React, { useState } from "react";
import {
    Button,
    CardAction,
    CardStatic,
    Checkbox,
    Chip,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFormFieldStatus,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
    ETextSize,
    ETitleSize,
    ISelectFieldOption,
    Radio,
    SegmentedControl,
    SelectField,
    SkinProvider,
    Tag,
    Text,
    TextareaField,
    TextField,
    Title,
} from "@sberbusiness/triplex-next";
import styles from "./Components.module.less";

const deliveryOptions: ISelectFieldOption[] = [
    { id: "today", value: "today", label: "Сегодня" },
    { id: "tomorrow", value: "tomorrow", label: "Завтра" },
    { id: "week", value: "week", label: "На этой неделе" },
];

export const Components = () => {
    const [period, setPeriod] = useState("month");
    const [delivery, setDelivery] = useState(deliveryOptions[0]);
    const [express, setExpress] = useState(true);
    const [tagVisible, setTagVisible] = useState(true);
    const [cardSelected, setCardSelected] = useState(false);
    const [saved, setSaved] = useState(false);

    const toggleExpress = () => setExpress((value) => !value);

    return (
        <SkinProvider skin="wordart">
            <div className={styles.skinComponentsExample}>
                <header className={styles.heading}>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        TRIPLEX / WORDART COLLECTION
                    </Text>
                    <Title size={ETitleSize.H1}>Большие планы. Яркие детали.</Title>
                    <Text size={ETextSize.B2}>Объём, глянец и радужные грани — в привычных компонентах.</Text>
                </header>

                <div className={styles.grid}>
                    <CardStatic>
                        <CardStatic.Content className={styles.stack}>
                            <Title size={ETitleSize.H3}>01 / Поля</Title>
                            <TextField label="Название проекта" inputProps={{ defaultValue: "Большой запуск" }} />
                            <SelectField
                                size={EComponentSize.LG}
                                options={deliveryOptions}
                                value={delivery}
                                onChange={setDelivery}
                                targetProps={{ fieldLabel: "Когда запускаем" }}
                            />
                            <TextareaField
                                label="Описание"
                                textareaProps={{ defaultValue: "Идея сегодня. Легенда завтра.", rows: 2 }}
                            />
                            <TextField
                                label="Нужно заполнить"
                                status={EFormFieldStatus.ERROR}
                                inputProps={{ "aria-invalid": true }}
                            />
                        </CardStatic.Content>
                    </CardStatic>

                    <CardStatic>
                        <CardStatic.Content className={styles.stack}>
                            <Title size={ETitleSize.H3}>02 / Выбор</Title>
                            <div className={styles.choices}>
                                <Checkbox defaultChecked>Радужные перспективы</Checkbox>
                                <Checkbox>Добавить немного магии</Checkbox>
                                <Checkbox disabled>Пока недоступно</Checkbox>
                            </div>
                            <div className={styles.choices} role="radiogroup" aria-label="Тариф">
                                <Radio name="wordart-plan" value="start" defaultChecked>
                                    Для больших идей
                                </Radio>
                                <Radio name="wordart-plan" value="team">
                                    Для большой команды
                                </Radio>
                            </div>
                            <SegmentedControl
                                role="group"
                                aria-label="Период"
                                type={ESegmentedControlType.SINGLE}
                                theme={ESegmentedControlTheme.GENERAL_1}
                                size={ESegmentedControlSize.MD}
                                value={period}
                                onSelect={setPeriod}
                            >
                                <SegmentedControl.Segment value="month">Месяц</SegmentedControl.Segment>
                                <SegmentedControl.Segment value="year">Год</SegmentedControl.Segment>
                            </SegmentedControl>
                            <div className={styles.row}>
                                <Chip
                                    selected={express}
                                    aria-pressed={express}
                                    onClick={toggleExpress}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") toggleExpress();
                                    }}
                                >
                                    Экспресс
                                </Chip>
                                <Chip disabled>Архив</Chip>
                            </div>
                            <div className={styles.row}>
                                {tagVisible ? (
                                    <Tag
                                        id="wordart-team-tag"
                                        size={EComponentSize.MD}
                                        onRemove={() => setTagVisible(false)}
                                        removeButtonProps={{ "aria-label": "Убрать тег Команда" }}
                                    >
                                        Команда
                                    </Tag>
                                ) : (
                                    <Button theme={EButtonTheme.LINK} onClick={() => setTagVisible(true)}>
                                        Вернуть тег
                                    </Button>
                                )}
                            </div>
                        </CardStatic.Content>
                    </CardStatic>

                    <CardStatic>
                        <CardStatic.Content className={styles.stack}>
                            <Title size={ETitleSize.H3}>03 / Действия</Title>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.LG}
                                block
                                onClick={() => setSaved(true)}
                            >
                                Запустить мечту
                            </Button>
                            <div className={styles.row}>
                                <Button theme={EButtonTheme.SECONDARY}>Сохранить</Button>
                                <Button theme={EButtonTheme.SECONDARY_LIGHT}>Отмена</Button>
                            </div>
                            <div className={styles.row}>
                                <Button theme={EButtonTheme.DANGER}>Удалить</Button>
                                <Button theme={EButtonTheme.LINK}>Подробнее</Button>
                            </div>
                            <div className={styles.row}>
                                <Button theme={EButtonTheme.SECONDARY} disabled>
                                    Недоступно
                                </Button>
                                <Button theme={EButtonTheme.SECONDARY} loading>
                                    Загрузка
                                </Button>
                            </div>
                            <Text size={ETextSize.B3} type={EFontType.SECONDARY} role="status">
                                {saved ? "Запуск состоялся!" : "Все кнопки можно нажимать. Мечты — запускать."}
                            </Text>
                        </CardStatic.Content>
                    </CardStatic>
                </div>

                <CardAction selected={cardSelected} toggle={setCardSelected} aria-pressed={cardSelected}>
                    <CardAction.Content>
                        <div className={styles.cardRow}>
                            <div>
                                <Title size={ETitleSize.H3}>Карточка с характером</Title>
                                <Text size={ETextSize.B2}>Нажми, чтобы выбрать. Tab и Enter тоже работают.</Text>
                            </div>
                            <Text size={ETextSize.B1}>{cardSelected ? "Выбрана ✓" : "Выбрать →"}</Text>
                        </div>
                    </CardAction.Content>
                </CardAction>
            </div>
        </SkinProvider>
    );
};
