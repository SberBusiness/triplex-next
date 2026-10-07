import React from "react";
import { Radio, RadioXGroup } from "@sberbusiness/triplex-next";

export const Wrapping = () => {
    const name = React.useId();

    return (
        <div style={{ width: 320, maxWidth: "100%" }}>
            <RadioXGroup indent={24} aria-label="Способ получения документов">
                <Radio name={name} value="office" defaultChecked>
                    В офисе с консультацией специалиста
                </Radio>
                <Radio name={name} value="courier">
                    Курьером по указанному адресу
                </Radio>
                <Radio name={name} value="email">
                    Электронной почтой после подписания
                </Radio>
            </RadioXGroup>
        </div>
    );
};
