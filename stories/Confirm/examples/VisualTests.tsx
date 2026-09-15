import React from "react";
import { Button, Confirm, EButtonTheme, EComponentSize, EConfirmParentComponent } from "@sberbusiness/triplex-next";

interface ICaseProps {
    children: React.ReactNode;
    title: string;
}

const Case = ({ children, title }: ICaseProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{title}</div>
        {children}
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <Case title="Только заголовок">
            <Confirm>
                <Confirm.Content>
                    <Confirm.Content.Title>Удалить документ?</Confirm.Content.Title>
                </Confirm.Content>

                <Confirm.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                        Отмена
                    </Button>
                    <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} onClick={() => {}}>
                        Удалить
                    </Button>
                </Confirm.Controls>

                <Confirm.Close title="Закрыть" clickByEsc={false} onClick={() => {}} />
            </Confirm>
        </Case>

        <Case title="Без кнопки закрытия">
            <Confirm parentComponent={EConfirmParentComponent.SIDE_OVERLAY_SM}>
                <Confirm.Content>
                    <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                    <Confirm.Content.SubTitle>
                        Кнопка закрытия необязательна: закрыть предупреждение можно кнопками действий.
                    </Confirm.Content.SubTitle>
                </Confirm.Content>

                <Confirm.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                        Отмена
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => {}}>
                        Продолжить
                    </Button>
                </Confirm.Controls>
            </Confirm>
        </Case>

        <Case title="Длинный текст и три кнопки">
            <Confirm parentComponent={EConfirmParentComponent.SIDE_OVERLAY_MD}>
                <Confirm.Content>
                    <Confirm.Content.Title>Сохранить изменения перед выходом?</Confirm.Content.Title>
                    <Confirm.Content.SubTitle>
                        В форме остались несохранённые изменения. Сохраните их, чтобы продолжить работу позже, или
                        выйдите без сохранения — тогда изменения будут потеряны. Текст переносится по ширине контента,
                        справа остаётся место под кнопку закрытия.
                    </Confirm.Content.SubTitle>
                </Confirm.Content>

                <Confirm.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                        Отмена
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                        Выйти без сохранения
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => {}}>
                        Сохранить
                    </Button>
                </Confirm.Controls>

                <Confirm.Close title="Закрыть" clickByEsc={false} onClick={() => {}} />
            </Confirm>
        </Case>
    </div>
);
