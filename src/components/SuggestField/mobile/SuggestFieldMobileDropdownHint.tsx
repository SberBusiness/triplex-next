import React from "react";
import { ISuggestFieldMobileDropdownHintProps } from "./types";
import { Text, EFontType, ETextSize } from "../../Typography";
import styles from "../styles/SuggestFieldMobile.module.less";

/** Подсказка компонента SuggestFieldMobileDropdown, например: "Ничего не найдено" или "Введите более 3 символов". */
export const SuggestFieldMobileDropdownHint: React.FC<ISuggestFieldMobileDropdownHintProps> = ({ children }) => (
    <Text className={styles.suggestFieldMobileDropdownHint} type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
        {children}
    </Text>
);
