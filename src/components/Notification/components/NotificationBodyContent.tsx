import React from "react";
import { Text } from "../../Typography/Text";
import { ETextSize, EFontType } from "../../Typography/enums";

/** Свойства компонента NotificationBodyContent. */
interface INotificationBodyContentProps {
    children?: React.ReactNode;
}

/** Основное сообщение нотификации. */
export const NotificationBodyContent: React.FC<INotificationBodyContentProps> = ({ children }) => (
    <Text tag="div" size={ETextSize.B3} type={EFontType.PRIMARY}>
        {children}
    </Text>
);

NotificationBodyContent.displayName = "NotificationBodyContent";
