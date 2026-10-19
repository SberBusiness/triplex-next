import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import {
    Button,
    ButtonDropdown,
    Checkbox,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
    ETitleSize,
    ISelectFieldOption,
    Island,
    ModalWindow,
    ModalWindowBody,
    ModalWindowClose,
    ModalWindowContent,
    ModalWindowFooter,
    ModalWindowHeader,
    SelectField,
    SkinProvider,
    Tabs,
    TabsLine,
    Text,
    TextField,
    Title,
} from "@sberbusiness/triplex-next";
import styles from "./Navigation.module.less";

export const Navigation = () => {
    const [instanceId] = useState(() => uniqueId("wordart-navigation-"));
    const [selectedTab, setSelectedTab] = useState("overview");
    const [selectedLine, setSelectedLine] = useState("ideas");
    const [isOpen, setIsOpen] = useState(false);
    const [project, setProject] = useState("Большой запуск");
    const [saved, setSaved] = useState(false);
    const [action, setAction] = useState("copy");
    const deliveryOptions: ISelectFieldOption[] = [
        { id: `${instanceId}-today`, value: "today", label: "Сегодня" },
        { id: `${instanceId}-tomorrow`, value: "tomorrow", label: "Завтра" },
        { id: `${instanceId}-week`, value: "week", label: "На этой неделе" },
    ];
    const [delivery, setDelivery] = useState(deliveryOptions[0]);
    const tabs = [
        { id: "overview", label: "Обзор" },
        { id: "team", label: "Команда" },
        { id: "files", label: "Файлы" },
        { id: "history", label: "История" },
        { id: "settings", label: "Настройки" },
    ].map((tab) => ({ ...tab, id: `${instanceId}-${tab.id}` }));
    const lineTabs = [
        { id: "ideas", label: "Идеи" },
        { id: "work", label: "В работе" },
        { id: "ready", label: "Готово" },
        { id: "archive", label: "Архив" },
    ];
    const actions = [
        { id: `${instanceId}-copy`, label: "Создать копию", onSelect: () => setAction("copy") },
        { id: `${instanceId}-export`, label: "Экспортировать", onSelect: () => setAction("export") },
        { id: `${instanceId}-share`, label: "Поделиться ссылкой", onSelect: () => setAction("share") },
    ];
    const closeModal = () => setIsOpen(false);

    return (
        <SkinProvider skin="wordart">
            <div className={styles.skinNavigationExample}>
                <header className={styles.heading}>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        TRIPLEX / WORDART COLLECTION
                    </Text>
                    <Title size={ETitleSize.H1}>Один стиль. На каждом уровне.</Title>
                    <Text size={ETextSize.B2}>Вкладки, выпадающие списки и окна с радужными гранями.</Text>
                </header>

                <div className={styles.grid}>
                    <Island>
                        <div className={styles.stack}>
                            <Title size={ETitleSize.H3}>Вкладки</Title>
                            <div className={styles.tabsWidth}>
                                <Tabs
                                    aria-label="Раздел проекта"
                                    tabs={tabs}
                                    selectedId={`${instanceId}-${selectedTab}`}
                                    onSelectTab={(id) => setSelectedTab(id.replace(`${instanceId}-`, ""))}
                                    buttonDropdownAttributes={{ "aria-label": "Ещё разделы" }}
                                />
                            </div>
                            <Text size={ETextSize.B3} role="status">
                                Открыт раздел: {tabs.find((tab) => tab.id === `${instanceId}-${selectedTab}`)?.label}
                            </Text>
                            <TabsLine
                                aria-label="Этап проекта"
                                tabs={lineTabs}
                                selectedId={selectedLine}
                                onChangeTab={setSelectedLine}
                                maxVisible={3}
                                withSeparator
                            />
                            <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                Текущий этап: {lineTabs.find((tab) => tab.id === selectedLine)?.label}
                            </Text>
                        </div>
                    </Island>
                    <Island>
                        <div className={styles.stack}>
                            <Title size={ETitleSize.H3}>Списки и действия</Title>
                            <SelectField
                                size={EComponentSize.LG}
                                value={delivery}
                                options={deliveryOptions}
                                onChange={setDelivery}
                                targetProps={{ fieldLabel: "Когда запускаем" }}
                            />
                            <div className={styles.row}>
                                <ButtonDropdown
                                    buttonAttributes={{ "aria-label": "Действия с проектом" }}
                                    theme={EButtonTheme.SECONDARY}
                                    size={EComponentSize.MD}
                                    options={actions}
                                    selected={actions.find((option) => option.id === `${instanceId}-${action}`)}
                                >
                                    Действия с проектом
                                </ButtonDropdown>
                                <Button
                                    theme={EButtonTheme.GENERAL}
                                    data-wordart-action="modal"
                                    onClick={() => setIsOpen(true)}
                                >
                                    Настроить запуск
                                </Button>
                            </div>
                            <Text size={ETextSize.B3} type={EFontType.SECONDARY} role="status">
                                {saved ? `Сохранён проект «${project}»` : "Настрой запуск — откроется модальное окно."}
                            </Text>
                        </div>
                    </Island>
                </div>

                <ModalWindow
                    isOpen={isOpen}
                    size={EComponentSize.MD}
                    topPosition={56}
                    aria-labelledby={`${instanceId}-modal-title`}
                    closeButton={
                        <ModalWindowClose
                            aria-label="Закрыть настройки"
                            title="Закрыть настройки"
                            onClick={closeModal}
                        />
                    }
                >
                    <ModalWindowContent>
                        <ModalWindowHeader>
                            <ModalWindowHeader.Title>
                                <ModalWindowHeader.Title.Content>
                                    <Title tag="h2" size={ETitleSize.H2} id={`${instanceId}-modal-title`}>
                                        Время больших идей
                                    </Title>
                                </ModalWindowHeader.Title.Content>
                            </ModalWindowHeader.Title>
                        </ModalWindowHeader>
                        <ModalWindowBody>
                            <div className={styles.skinNavigationModalForm}>
                                <Text size={ETextSize.B2}>
                                    Всё готово к запуску. Осталось добавить последние штрихи.
                                </Text>
                                <TextField
                                    label="Название проекта"
                                    inputProps={{ value: project, onChange: (event) => setProject(event.target.value) }}
                                />
                                <SelectField
                                    size={EComponentSize.LG}
                                    value={delivery}
                                    options={deliveryOptions}
                                    onChange={setDelivery}
                                    targetProps={{ fieldLabel: "Дата запуска" }}
                                />
                                <Checkbox defaultChecked>Сообщить команде о запуске</Checkbox>
                            </div>
                        </ModalWindowBody>
                        <ModalWindowFooter>
                            <ModalWindowFooter.Description>
                                <ModalWindowFooter.Description.Controls>
                                    <Button theme={EButtonTheme.SECONDARY} onClick={closeModal}>
                                        Отмена
                                    </Button>
                                    <Button
                                        theme={EButtonTheme.GENERAL}
                                        onClick={() => {
                                            setSaved(true);
                                            closeModal();
                                        }}
                                    >
                                        Сохранить настройки
                                    </Button>
                                </ModalWindowFooter.Description.Controls>
                            </ModalWindowFooter.Description>
                        </ModalWindowFooter>
                    </ModalWindowContent>
                </ModalWindow>
            </div>
        </SkinProvider>
    );
};
