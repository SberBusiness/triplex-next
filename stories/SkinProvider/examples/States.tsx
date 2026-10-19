import React from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFormFieldStatus,
    EIslandType,
    Island,
    SkinProvider,
    TextField,
} from "@sberbusiness/triplex-next";

export const States = () => (
    <SkinProvider skin="wordart">
        <div style={{ display: "grid", gap: 28, maxWidth: 420, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                {Object.values(EComponentSize).map((size) => (
                    <Button key={size} size={size} theme={EButtonTheme.GENERAL}>
                        {size.toUpperCase()}
                    </Button>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Button
                    theme={EButtonTheme.GENERAL}
                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                    aria-label="Действие с иконкой"
                />
                <Button theme={EButtonTheme.GENERAL} icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}>
                    С иконкой
                </Button>
            </div>
            <Button theme={EButtonTheme.GENERAL} disabled>
                Недоступно
            </Button>
            <Button theme={EButtonTheme.GENERAL} loading>
                Загрузка
            </Button>
            <Button theme={EButtonTheme.DANGER}>Удалить — стандартный цвет</Button>
            <Button theme={EButtonTheme.SECONDARY}>Вторичное действие</Button>
            <TextField label="Только чтение" inputProps={{ defaultValue: "Название проекта", readOnly: true }} />
            <TextField
                label="Ошибка"
                status={EFormFieldStatus.ERROR}
                inputProps={{ defaultValue: "Проверьте значение" }}
            />
            <TextField
                label="Предупреждение"
                status={EFormFieldStatus.WARNING}
                inputProps={{ defaultValue: "Обратите внимание" }}
            />
            <TextField
                label="Недоступное поле"
                status={EFormFieldStatus.DISABLED}
                inputProps={{ defaultValue: "Нельзя изменить" }}
            />
            <Island type={EIslandType.TYPE_2}>Island TYPE_2 сохраняет стандартное оформление.</Island>
        </div>
    </SkinProvider>
);
