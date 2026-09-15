import React from "react";
import {
    Button,
    Confirm,
    EButtonTheme,
    EComponentSize,
    EConfirmParentComponent,
    IConfirmProps,
} from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

export interface IConfirmPlaygroundProps extends IConfirmProps {
    /** Показать кнопку закрытия. */
    withCloseButton: boolean;
    /** Закрывать предупреждение по нажатию Esc. */
    clickByEsc: boolean;
}

export const Playground = ({
    withCloseButton,
    clickByEsc,
    parentComponent = EConfirmParentComponent.LIGHTBOX,
    ...confirmProps
}: IConfirmPlaygroundProps) => (
    <Confirm parentComponent={parentComponent} {...confirmProps}>
        <Confirm.Content>
            <Confirm.Content.Title>Внимание</Confirm.Content.Title>
            <Confirm.Content.SubTitle>
                Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
            </Confirm.Content.SubTitle>
        </Confirm.Content>

        <Confirm.Controls>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={action("onCancel")}>
                Отмена
            </Button>
            <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} onClick={action("onConfirm")}>
                Покинуть форму
            </Button>
        </Confirm.Controls>

        {withCloseButton ? <Confirm.Close title="Закрыть" clickByEsc={clickByEsc} onClick={action("onClose")} /> : null}
    </Confirm>
);
