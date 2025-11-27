import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { WaitStsIcon84, WarningStsIcon84, ErrorStsIcon84, SuccessStsIcon84 } from "@sberbusiness/icons-next";
import { IStatusTrackerProps, StatusTracker } from "../../src/components/StatusTracker";
import { EStatusTrackerType, EVerticalAlign } from "../../src/components/StatusTracker/enums";
import { Page } from "../../src/components/Page";
import { EMarkerStatus } from "../../src/components/Marker";
import { EComponentSize } from "../../src/enums";
import { EAlertType } from "../../src/components/Alert";
import { EButtonTheme } from "../../src/components/Button";

const meta: Meta<typeof StatusTracker> = {
    title: "Components/StatusTracker",
    component: StatusTracker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент предназначен для визуального отображения статуса документа.

## Особенности

- **Типы - type**: 
Draft - черновик, создан без ошибок и еще не отправлен в банк,
Waiting - в обработке, ожидает ответ от банка,
Warning - предупреждение, документ создан с ошибками,
Rejected - документ отклонен банком,
Approved - документ исполнен банком

- **Выравнивание по вертикали - verticalAlign**: Top, Middle, Bottom

- Ширину статус-трекера определяет родительский контейнер

                `,
            },
        },
    },
    argTypes: {
        type: {
            control: "select",
            options: Object.values(EStatusTrackerType),
            description: "Тип статус-трекера",
        },
        verticalAlign: {
            control: "select",
            options: Object.values(EVerticalAlign),
            description: "Вертикальное выравнивание блоков",
            table: {
                type: { summary: "EVerticalAlign" },
                defaultValue: { summary: "EVerticalAlign.TOP" },
            },
        },
    },
};

export default meta;

export const Playground: StoryObj<typeof StatusTracker> = {
    args: {
        type: EStatusTrackerType.WAITING,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum amountProps={{ value: "123747.123", currency: "₽" }} />
                    <StatusTracker.Header.Title>Заголовок документа</StatusTracker.Header.Title>
                    <StatusTracker.Header.Description>
                        Это сообщение предоставляет дополнительный контекст или выделяет важную информацию для
                        ознакомления.
                    </StatusTracker.Header.Description>
                    <StatusTracker.Header.Description>Дополнительное описание.</StatusTracker.Header.Description>
                </StatusTracker.Header>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                        Ожидание ответа
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO} closable>
                        Это сообщение предоставляет контекст или выделяет важную информацию для ознакомления.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Основная кнопка
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Вторичная кнопка
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Description>
                        Это сообщение предоставляет дополнительный контекст или выделяет важную информацию для
                        ознакомления.
                    </StatusTracker.Footer.Description>
                </StatusTracker.Footer>
            </StatusTracker>
        </Page>
    ),
};

export const Draft: StoryObj<typeof StatusTracker> = {
    name: "Draft - Черновик, Выравнивание - middle, только Header и Footer",
    args: {
        type: EStatusTrackerType.DRAFT,
        verticalAlign: EVerticalAlign.MIDDLE,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum value={"50000.00"} currency={"₽"} />
                    <StatusTracker.Header.Title>Черновик документа</StatusTracker.Header.Title>
                    <StatusTracker.Header.Description>
                        Документ создан без ошибок и еще не отправлен в банк.
                    </StatusTracker.Header.Description>
                </StatusTracker.Header>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Отправить в банк
                    </StatusTracker.Footer.Button>
                </StatusTracker.Footer>
            </StatusTracker>
        </Page>
    ),
};

export const Waiting: StoryObj<typeof StatusTracker> = {
    name: "Waiting - В обработке, без Footer",
    args: {
        type: EStatusTrackerType.WAITING,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum value={"123747.123"} currency={"₽"} />
                    <StatusTracker.Header.Title>Документ в обработке</StatusTracker.Header.Title>
                    <StatusTracker.Header.Description>
                        Документ ожидает ответ от банка. Обычно обработка занимает несколько минут.
                    </StatusTracker.Header.Description>
                </StatusTracker.Header>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                        В обработке
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO} closable>
                        Пожалуйста, подождите. Документ обрабатывается банком.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </Page>
    ),
};

export const Warning: StoryObj<typeof StatusTracker> = {
    name: "Warning - Предупреждение, без Header",
    args: {
        type: EStatusTrackerType.WARNING,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <WarningStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                        Требуется исправление
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Status status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                        Не может быть отправлено
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.WARNING} closable>
                        Обнаружены ошибки в документе. Пожалуйста, проверьте и исправьте их перед отправкой.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Исправить ошибки
                    </StatusTracker.Footer.Button>
                </StatusTracker.Footer>
            </StatusTracker>
        </Page>
    ),
};

export const Rejected: StoryObj<typeof StatusTracker> = {
    name: "Rejected - Отклонен, только Media и Body",
    args: {
        type: EStatusTrackerType.REJECTED,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <ErrorStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.ERROR} size={EComponentSize.LG}>
                        Отклонен банком
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.ERROR} closable>
                        Документ был отклонен банком. Причина: недостаточно средств на счете.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </Page>
    ),
};

export const Approved: StoryObj<typeof StatusTracker> = {
    name: "Approved - Исполнен, только Media и Footer",
    args: {
        type: EStatusTrackerType.APPROVED,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <SuccessStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Скачать документ
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Description>
                        Документ доступен для скачивания в личном кабинете.
                    </StatusTracker.Footer.Description>
                </StatusTracker.Footer>
            </StatusTracker>
        </Page>
    ),
};

export const VerticalAlignTop: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Top",
    args: {
        type: EStatusTrackerType.WAITING,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Title>Выравнивание сверху</StatusTracker.Header.Title>
                    <StatusTracker.Header.Description>
                        Контент выровнен по верхнему краю контейнера.
                    </StatusTracker.Header.Description>
                </StatusTracker.Header>
            </StatusTracker>
        </Page>
    ),
};

export const VerticalAlignMiddle: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Middle",
    args: {
        type: EStatusTrackerType.DRAFT,
        verticalAlign: EVerticalAlign.MIDDLE,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                        Создан
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO} closable>
                        Документ успешно создан.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </Page>
    ),
};

export const VerticalAlignBottom: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Bottom",
    args: {
        type: EStatusTrackerType.DRAFT,
        verticalAlign: EVerticalAlign.BOTTOM,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Принять
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Отмена
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Description>
                        Согласен на отправку отчётов во внешнюю почтовую систему и понимаю связанные с этим риски.
                    </StatusTracker.Footer.Description>
                </StatusTracker.Footer>
            </StatusTracker>
        </Page>
    ),
};

export const WideParent: StoryObj<typeof StatusTracker> = {
    name: "При широком родительском компоненте",
    args: {
        type: EStatusTrackerType.APPROVED,
        verticalAlign: EVerticalAlign.TOP,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "600px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <SuccessStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum value={"250000.75"} currency={"₽"} />
                    <StatusTracker.Header.Title>Документ исполнен</StatusTracker.Header.Title>
                    <StatusTracker.Header.Description>
                        Документ успешно исполнен банком. Операция завершена.
                    </StatusTracker.Header.Description>
                </StatusTracker.Header>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                        Исполнен успешно
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO} closable>
                        Документ успешно обработан банком. Операция завершена.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </Page>
    ),
};

export const WithMediaOnly: StoryObj<typeof StatusTracker> = {
    name: "With Media Only - Только медиа",
    args: {
        type: EStatusTrackerType.WAITING,
        verticalAlign: EVerticalAlign.MIDDLE,
    },
    render: (args: IStatusTrackerProps) => (
        <Page style={{ width: "372px" }}>
            <StatusTracker type={args.type} verticalAlign={args.verticalAlign}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
            </StatusTracker>
        </Page>
    ),
};
