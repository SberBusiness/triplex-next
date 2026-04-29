import React from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    ListEmptyState,
    Text,
    Title,
} from "@sberbusiness/triplex-next";
import { EmptytableSysIcon96 } from "@sberbusiness/icons-next";

export const EmptyStateExample = () => (
    <ListEmptyState>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <EmptytableSysIcon96 />
        </div>

        <Gap size={16} />

        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Title text
        </Title>

        <Gap size={8} />

        <Text size={ETextSize.B3}>Нет данных, но можно предложить какие-то действия для заполнения таблицы.</Text>

        <Gap size={24} />

        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
            Button Name
        </Button>
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
            Button Name
        </Button>
    </ListEmptyState>
);
