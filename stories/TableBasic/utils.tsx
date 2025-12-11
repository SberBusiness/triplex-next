import { EmptytableSysIcon96, NotfoundSysIcon96 } from "@sberbusiness/icons-next";
import { Button } from "../../src/components/Button/Button";
import React from "react";
import { Title } from "../../src/components/Typography/Title";
import { EFontType, EFontWeightTitle, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Gap } from "../../src/components/Gap/Gap";
import { EButtonTheme } from "../../src/components/Button/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Text } from "../../src/components/Typography/Text";
import { MasterTable } from "../../src/components/Table/MasterTable";

export const renderNoData = (isFiltered: boolean) => (
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

export const renderCounterpartyDetails = (purpose: string, account: string, tax: string) => {
    return (
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
};
