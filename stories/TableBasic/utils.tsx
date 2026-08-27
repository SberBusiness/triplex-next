import React from "react";
import { EmptytableSysIcon96, NotfoundSysIcon96 } from "@sberbusiness/icons-next";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    MasterTable,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

export const renderNoData = (isFiltered = false) => (
    <>
        {isFiltered ? <NotfoundSysIcon96 /> : <EmptytableSysIcon96 />}
        <Gap size={8} />
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Текст заголовка
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Нет данных, но можно предложить какие-то действия для заполнения таблицы
        </Text>
        <Gap size={24} />
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                Button text
            </Button>
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Button text
            </Button>
        </div>
    </>
);

export const renderNoColumns = (onClick: () => void) => (
    <MasterTable.NoColumns>
        <Title size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
            Все колонки таблицы скрыты
        </Title>
        <Gap size={12} />
        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            Выберите нужные вам для отображения колонки в настройках таблицы.
        </Text>
        <Gap size={24} />
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={onClick}>
            Сбросить настройки
        </Button>
    </MasterTable.NoColumns>
);

export const renderCounterpartyDetails = (purpose: string, account: string, tax: string) => (
    <>
        <div>
            {purpose}
            <br />
            {account}
        </div>
        <Gap size={4} />
        <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
            {tax}
        </Text>
    </>
);
