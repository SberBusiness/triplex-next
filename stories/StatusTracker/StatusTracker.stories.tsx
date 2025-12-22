import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { WaitStsIcon84, WarningStsIcon84, ErrorStsIcon84, SuccessStsIcon84 } from "@sberbusiness/icons-next";
import { IStatusTrackerProps, StatusTracker } from "../../src/components/StatusTracker";
import { EStatusTrackerType, EStatusTrackerVerticalAlign } from "../../src/components/StatusTracker/enums";
import { EMarkerStatus } from "../../src/components/Marker";
import { EComponentSize } from "../../src/enums";
import { EAlertType } from "../../src/components/Alert";
import { EButtonTheme } from "../../src/components/Button";
import "./StatusTracker.less";

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
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
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
            options: Object.values(EStatusTrackerVerticalAlign),
            description: "Вертикальное выравнивание блоков",
            table: {
                type: { summary: "EStatusTrackerVerticalAlign" },
                defaultValue: { summary: "EStatusTrackerVerticalAlign.TOP" },
            },
        },
    },
};

export default meta;

export const Playground: StoryObj<typeof StatusTracker> = {
    args: {
        type: EStatusTrackerType.WAITING,
        verticalAlign: EStatusTrackerVerticalAlign.TOP,
    },
    parameters: {
        controls: {
            include: ["type", "verticalAlign"],
        },
    },
    render: (args: IStatusTrackerProps) => (
        <div className="statusTracker-example-wrapper">
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
        </div>
    ),
};

export const Draft: StoryObj<typeof StatusTracker> = {
    name: "Draft - Черновик, Выравнивание - middle, только Header и Footer",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.DRAFT} verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum amountProps={{ value: "50000.00", currency: "₽" }} />
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
        </div>
    ),
};

export const Waiting: StoryObj<typeof StatusTracker> = {
    name: "Waiting - В обработке, без Footer",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.WAITING} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum amountProps={{ value: "123747.123", currency: "₽" }} />
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
        </div>
    ),
};

export const Warning: StoryObj<typeof StatusTracker> = {
    name: "Warning - Предупреждение, без Header",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
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
        </div>
    ),
};

export const Rejected: StoryObj<typeof StatusTracker> = {
    name: "Rejected - Отклонен, только Media и Body",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.REJECTED} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
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
        </div>
    ),
};

export const Approved: StoryObj<typeof StatusTracker> = {
    name: "Approved - Исполнен, только Media и Footer",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.APPROVED} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
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
        </div>
    ),
};

export const VerticalAlignTop: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Top",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.WAITING} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
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
        </div>
    ),
};

export const VerticalAlignMiddle: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Middle",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.DRAFT} verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                        Создан
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO} closable>
                        Документ успешно создан.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </div>
    ),
};

export const VerticalAlignBottom: StoryObj<typeof StatusTracker> = {
    name: "Vertical Align - Bottom",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.DRAFT} verticalAlign={EStatusTrackerVerticalAlign.BOTTOM}>
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
        </div>
    ),
};

export const WideParent: StoryObj<typeof StatusTracker> = {
    name: "При широком родительском компоненте",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper statusTracker-example-wide-wrapper">
            <StatusTracker type={EStatusTrackerType.APPROVED} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
                <StatusTracker.Media>
                    <SuccessStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Sum amountProps={{ value: "250000.75", currency: "₽" }} />
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
        </div>
    ),
};

export const WithMediaOnly: StoryObj<typeof StatusTracker> = {
    name: "With Media Only - Только медиа",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div className="statusTracker-example-wrapper">
            <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
            </StatusTracker>
        </div>
    ),
};
