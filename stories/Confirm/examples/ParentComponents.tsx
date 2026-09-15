import React from "react";
import { Button, Confirm, EButtonTheme, EComponentSize, EConfirmParentComponent } from "@sberbusiness/triplex-next";

const PARENT_COMPONENTS = Object.values(EConfirmParentComponent);

export const ParentComponents = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {PARENT_COMPONENTS.map((parentComponent) => (
            <div key={parentComponent}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{parentComponent}</div>

                <Confirm parentComponent={parentComponent} aria-labelledby={`confirm-${parentComponent}-title`}>
                    <Confirm.Content>
                        <Confirm.Content.Title id={`confirm-${parentComponent}-title`}>Внимание</Confirm.Content.Title>
                        <Confirm.Content.SubTitle>
                            Максимальная ширина предупреждения зависит от компонента, в котором оно открыто.
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
            </div>
        ))}
    </div>
);
