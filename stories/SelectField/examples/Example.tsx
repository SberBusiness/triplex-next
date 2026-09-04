import React, { useState } from "react";
import {
    EComponentSize,
    EFontType,
    EFormFieldStatus,
    ETextSize,
    ETooltipSize,
    FormFieldDescription,
    FormGroup,
    HelpBox,
    ISelectFieldOption,
    SelectField,
    Text,
} from "@sberbusiness/triplex-next";

/** Организации, доступные пользователю. */
const ORGANIZATIONS: ISelectFieldOption[] = [
    { id: "alpha", value: "alpha", label: "ООО «Альфа»" },
    { id: "beta", value: "beta", label: "ООО «Бета»" },
];

/** Счета в разрезе организации: список второго поля зависит от выбора в первом. */
const ACCOUNTS_BY_ORGANIZATION: Record<string, ISelectFieldOption[]> = {
    alpha: [
        { id: "alpha-rub", value: "alpha-rub", label: "40702810 ··· 4501 — рубли" },
        { id: "alpha-usd", value: "alpha-usd", label: "40702840 ··· 7712 — доллары" },
    ],
    beta: [
        { id: "beta-rub", value: "beta-rub", label: "40702810 ··· 9034 — рубли" },
        { id: "beta-eur", value: "beta-eur", label: "40702978 ··· 2288 — евро" },
    ],
};

export const Example = () => {
    const [organization, setOrganization] = useState<ISelectFieldOption>();
    const [account, setAccount] = useState<ISelectFieldOption>();

    const accounts = organization ? ACCOUNTS_BY_ORGANIZATION[organization.id] : [];

    /** Смена организации сбрасывает счёт: выбранный счёт относился к другой организации. */
    const handleOrganizationChange = (option: ISelectFieldOption) => {
        setOrganization(option);
        setAccount(undefined);
    };

    const handleOrganizationClear = () => {
        setOrganization(undefined);
        setAccount(undefined);
    };

    return (
        <div style={{ maxWidth: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <FormGroup>
                <SelectField
                    size={EComponentSize.LG}
                    value={organization}
                    options={ORGANIZATIONS}
                    onChange={handleOrganizationChange}
                    placeholder="Не выбрана"
                    targetProps={{
                        fieldLabel: "Организация",
                        onClear: organization ? handleOrganizationClear : undefined,
                        postfix: (
                            <HelpBox tooltipSize={ETooltipSize.SM}>Организации, к которым у вас есть доступ.</HelpBox>
                        ),
                    }}
                    mobileTitle="Организация"
                />
            </FormGroup>

            <FormGroup>
                <SelectField
                    size={EComponentSize.LG}
                    status={organization ? EFormFieldStatus.DEFAULT : EFormFieldStatus.DISABLED}
                    value={account}
                    options={accounts}
                    onChange={setAccount}
                    placeholder="Не выбран"
                    targetProps={{ fieldLabel: "Счёт списания" }}
                    mobileTitle="Счёт списания"
                />
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {organization ? "Доступны счета выбранной организации" : "Сначала выберите организацию"}
                    </Text>
                </FormFieldDescription>
            </FormGroup>
        </div>
    );
};
