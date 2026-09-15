import React from "react";
import { Button, Confirm, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Confirm aria-labelledby="confirm-default-title">
        <Confirm.Content>
            <Confirm.Content.Title id="confirm-default-title">Внимание</Confirm.Content.Title>
            <Confirm.Content.SubTitle>
                Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
            </Confirm.Content.SubTitle>
        </Confirm.Content>

        <Confirm.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                Отмена
            </Button>
            <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} onClick={() => {}}>
                Покинуть форму
            </Button>
        </Confirm.Controls>

        <Confirm.Close title="Закрыть" clickByEsc={false} onClick={() => {}} />
    </Confirm>
);
