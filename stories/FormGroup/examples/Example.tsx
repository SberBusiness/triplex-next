import React, { useState } from "react";
import {
    AlertContext,
    EAlertType,
    EFontType,
    EFormFieldStatus,
    ETextSize,
    FormField,
    FormFieldDescription,
    FormFieldInput,
    FormFieldLabel,
    FormGroup,
    Gap,
    Text,
} from "@sberbusiness/triplex-next";

export const Example = () => {
    const [account, setAccount] = useState("40702810400000012345");
    const [amount, setAmount] = useState("");

    return (
        <div style={{ maxWidth: "360px" }}>
            <FormGroup>
                <FormField>
                    <FormFieldLabel>Счёт списания</FormFieldLabel>
                    <FormFieldInput value={account} onChange={(event) => setAccount(event.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Доступно 125 000,00 ₽
                    </Text>
                </FormFieldDescription>
            </FormGroup>

            <Gap size={24} />

            <FormGroup>
                <FormField status={EFormFieldStatus.ERROR}>
                    <FormFieldLabel>Сумма платежа</FormFieldLabel>
                    <FormFieldInput value={amount} onChange={(event) => setAmount(event.target.value)} />
                </FormField>
                <FormFieldDescription>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.ERROR}>
                        Укажите сумму платежа
                    </Text>
                </FormFieldDescription>

                <Gap size={8} />

                <AlertContext type={EAlertType.INFO}>
                    Платёж на сумму более 150 000 ₽ уходит в банк на подтверждение.
                </AlertContext>
            </FormGroup>
        </div>
    );
};
