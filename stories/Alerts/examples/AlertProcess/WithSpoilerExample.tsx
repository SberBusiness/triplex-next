import React, { useState } from "react";
import { AlertProcess, EAlertType, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const WithSpoilerExample = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ maxWidth: "750px" }}>
            <AlertProcess type={EAlertType.INFO}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    По вопросам финмониторинга обращайтесь в рабочие дни с 03:00 до 21:00 МСК с мобильного телефона по
                    номеру 0321, доб. 6. Звонки по России бесплатные.
                </Text>
                <AlertProcess.Spoiler open={expanded} onOpen={setExpanded}>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        У вас нет прав на подписание и отправку заявления в страховую компанию. Подписывать заявления, а
                        также заверять документы, имеет право генеральный директор на основании устава, владелец ИП на
                        основании доверенности.
                    </Text>
                </AlertProcess.Spoiler>
            </AlertProcess>
        </div>
    );
};
