import React from "react";
import { CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";
import { Button, TButtonProps } from "../../Button/Button";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

/**
 * Свойства компонента ConfirmCloseButton.
 * Props кнопки, кроме theme, size и icon: их задаёт сам компонент.
 */
export interface IConfirmCloseButtonProps extends Omit<TButtonProps, "theme" | "size" | "icon"> {}

/**
 * Кнопка закрытия.
 * Иконка-крестик в правом верхнем углу предупреждения.
 *
 * Доступное имя задаёт потребитель: кнопка иконочная, и без `title`
 * (или `aria-label`) у неё нет текстовой альтернативы. Дефолта здесь нет
 * намеренно — строки на конкретном языке внутри компонентов библиотеки
 * запрещены, см. docs/ai/codestyle.md § «Мультиязычность».
 */
export const ConfirmCloseButton = React.forwardRef<HTMLButtonElement, IConfirmCloseButtonProps>(
    ({ className, title, ...props }, ref) => (
        <Button
            icon={<CrossStrokeSrvIcon20 paletteIndex={0} />}
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            ref={ref}
            className={clsx(styles.confirmCloseButton, className)}
            title={title}
            {...props}
        />
    ),
);

ConfirmCloseButton.displayName = "ConfirmCloseButton";
