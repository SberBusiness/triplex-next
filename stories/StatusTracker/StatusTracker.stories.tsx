import React from "react";
import { Meta, StoryObj, ArgTypes as ArgTypesType } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import {
    StatusTracker,
    IStatusTrackerProps,
    EStatusTrackerType,
    EStatusTrackerVerticalAlign,
    EMarkerStatus,
    EComponentSize,
    EAlertType,
    EButtonTheme,
} from "@sberbusiness/triplex-next";
import { WaitStsIcon84, WarningStsIcon84, ErrorStsIcon84, SuccessStsIcon84 } from "@sberbusiness/icons-next";
import "./StatusTracker.less";

export default {
    title: "Components/StatusTracker",
    component: StatusTracker,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={StatusTracker} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof StatusTracker>;

export interface PlaygroundArgs extends Pick<React.ComponentProps<typeof StatusTracker>, "type" | "verticalAlign"> {}

const PLAYGROUND_ARGS: PlaygroundArgs = {
    type: EStatusTrackerType.WAITING,
    verticalAlign: EStatusTrackerVerticalAlign.TOP,
};

const PLAYGROUND_ARG_TYPES: ArgTypesType<PlaygroundArgs> = {
    type: {
        control: "select",
        options: Object.values(EStatusTrackerType),
    },
    verticalAlign: {
        control: "select",
        options: Object.values(EStatusTrackerVerticalAlign),
    },
};

export const Playground: StoryObj<typeof StatusTracker> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: PLAYGROUND_ARG_TYPES,
    parameters: {
        controls: {
            include: Object.keys(PLAYGROUND_ARGS),
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args: IStatusTrackerProps) => (
        <div className="status-tracker-wrapper" style={{ height: 744 }}>
            <StatusTracker {...args}>
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
            <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
                <StatusTracker.Media>
                    <WarningStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Body>
                    <StatusTracker.Body.StatusGroup>
                        <StatusTracker.Body.Status status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                            Требуется исправление
                        </StatusTracker.Body.Status>
                        <StatusTracker.Body.Status status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                            Не может быть отправлено
                        </StatusTracker.Body.Status>
                    </StatusTracker.Body.StatusGroup>
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper">
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
        <div className="status-tracker-wrapper status-tracker-wide-wrapper">
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
        <div className="status-tracker-wrapper">
            <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.MIDDLE}>
                <StatusTracker.Media>
                    <WaitStsIcon84 />
                </StatusTracker.Media>
            </StatusTracker>
        </div>
    ),
};
