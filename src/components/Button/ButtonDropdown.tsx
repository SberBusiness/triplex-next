import React, { useRef, useState } from "react";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "@sber-business/triplex/components/Button/ButtonDropdownExtended";
import { Button } from "@sber-business/triplex/components/Button/Button";
import { EButtonSize, EButtonTheme } from "@sber-business/triplex/components/Button/enums";
import { DropdownwhiteSrvxIcon16 } from "@sberbusiness/icons/DropdownwhiteSrvxIcon16";
import { CaretdownSrvxIcon16 } from "@sberbusiness/icons/CaretdownSrvxIcon16";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { isKey } from "@sber-business/triplex/utils/keyboard";
import { DropdownList } from "@sber-business/triplex/components/Dropdown/desktop/DropdownList";
import { IDropdownListItemProps } from "../Dropdown/desktop/DropdownListItem";
import { DropdownListContext } from "@sber-business/triplex/components/Dropdown/DropdownListContext";
import { uniqueId } from "@sber-business/triplex/utils/uniqueId";
import { DropdownMobileHeader } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileHeader";
import { DropdownMobileBody } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileBody";
import { DropdownMobileList } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileList";
import { DropdownMobileListItem } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileListItem";
import { DropdownMobileClose } from "@sber-business/triplex/components/Dropdown/mobile/DropdownMobileClose";
import { Text } from "@sber-business/triplex/components/Typography/Text";
import { ETextSize } from "@sber-business/triplex/components/Typography/enums";

/** Свойства опции в выпадающем списке действий. */
export interface IButtonDropdownOption
    extends Omit<
        IDropdownListItemProps,
        "active" | "onSelect" | "selected" | "keyCodesForSelection" | "className" | "key"
    > {
    /** Уникальное имя опции. */
    id: string;
    /** Название опции. */
    label: React.ReactNode;
    /** Обработчик выбора опции. */
    onSelect?: () => void;
}

/** Свойства кнопки с выпадающим списком действий. */
export interface IButtonDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** HTML-атрибуты кнопки. */
    buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Список опций. */
    options: IButtonDropdownOption[];
    /** Выбранная опция. */
    selected?: IButtonDropdownOption;
    /** Отключенное состояние кнопки. */
    disabled?: boolean;
}

/** Свойства основной/вспомогательной кнопки с выпадающим списком действий. */
interface IButtonDropdownBaseProps extends IButtonDropdownProps {
    /** Тема кнопки. */
    theme: EButtonTheme.GENERAL | EButtonTheme.SECONDARY | EButtonTheme.DANGER;
    /** Блочное состояние кнопки. */
    block?: boolean;
}

/** Свойства контекстной кнопки с выпадающим списком действий. */
interface IButtonDotsProps extends IButtonDropdownProps {
    /** Тема кнопки. */
    theme: EButtonTheme.DOTS;
    /** Блочное состояние кнопки. */
    block?: never;
}

/** Кнопка с выпадающим списком действий. */
export const ButtonDropdown = React.forwardRef<HTMLButtonElement, IButtonDropdownBaseProps | IButtonDotsProps>(
    (props, ref) => {
        const { buttonAttributes, children, className, theme, size, options, selected, block, disabled, ...rest } =
            props;
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const classNames = classnames("cssClass[buttonDropdown]", { "cssClass[block]": !!block }, className);
        const [activeDescendant, setActiveDescendant] = useState<string>();
        const instanceId = useRef(uniqueId());

        const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => {
            const classNames = classnames("cssClass[buttonDropdownTarget]", "hoverable", {
                "cssClass[active]": opened,
                "cssClass[block]": !!block,
            });

            return (
                <Button
                    className={classNames}
                    theme={theme}
                    size={size}
                    onKeyDown={handleKeyDown({ opened, setOpened })}
                    onClick={handleClick({ opened, setOpened })}
                    disabled={disabled}
                    aria-haspopup="menu"
                    aria-expanded={opened}
                    aria-controls={instanceId.current}
                    aria-activedescendant={activeDescendant}
                    {...buttonAttributes}
                    ref={setRef}
                >
                    {children}
                    {renderCaret()}
                </Button>
            );
        };

        const handleClick =
            ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) =>
            () =>
                setOpened(!opened);

        const handleKeyDown =
            ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) =>
            (event: React.KeyboardEvent<HTMLButtonElement>) => {
                const { key } = event;

                if (isKey(key, "SPACE") || isKey(key, "ARROW_UP") || isKey(key, "ARROW_DOWN")) {
                    event.preventDefault();
                }
                if (!opened && (isKey(key, "ARROW_UP") || isKey(key, "ARROW_DOWN"))) {
                    setOpened(true);
                }
            };

        const renderCaret = () => {
            switch (theme) {
                case EButtonTheme.GENERAL:
                case EButtonTheme.DANGER:
                    return <DropdownwhiteSrvxIcon16 className="cssClass[caretIcon]" />;
                case EButtonTheme.SECONDARY:
                    return <CaretdownSrvxIcon16 className="cssClass[caretIcon]" />;
            }
        };

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            const classNames = classnames("cssClass[buttonDropdownMenu]", className);

            return (
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <ButtonDropdownExtended.Dropdown
                        className={classNames}
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={buttonRef}
                        ref={dropdownRef}
                        mobileViewProps={{
                            children: (
                                <>
                                    <DropdownMobileHeader>
                                        <Text tag="div" size={ETextSize.B1}>
                                            {children}
                                        </Text>
                                        <DropdownMobileClose onClick={() => setOpened(false)} />
                                    </DropdownMobileHeader>
                                    <DropdownMobileBody>
                                        <DropdownMobileList>
                                            {options.map((option) => (
                                                <DropdownMobileListItem
                                                    {...option}
                                                    key={option.id}
                                                    selected={option.id === selected?.id}
                                                    onSelect={() => {
                                                        option.onSelect?.();
                                                        setOpened(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </DropdownMobileListItem>
                                            ))}
                                        </DropdownMobileList>
                                    </DropdownMobileBody>
                                </>
                            ),
                        }}
                    >
                        <DropdownList dropdownOpened={opened} id={instanceId.current}>
                            {options.map((option) => (
                                <DropdownList.Item
                                    {...option}
                                    className="cssClass[buttonDropdownMenuItem]"
                                    key={option.id}
                                    selected={option.id === selected?.id}
                                    onSelect={() => {
                                        option.onSelect?.();
                                        setOpened(false);
                                    }}
                                >
                                    {option.label}
                                </DropdownList.Item>
                            ))}
                        </DropdownList>
                    </ButtonDropdownExtended.Dropdown>
                </DropdownListContext.Provider>
            );
        };

        /** Функция для хранения ссылки. */
        const setRef = (instance: HTMLButtonElement | null) => {
            buttonRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <ButtonDropdownExtended
                className={classNames}
                renderButton={renderButton}
                renderDropdown={renderDropdown}
                dropdownRef={dropdownRef}
                closeOnTab
                {...rest}
            />
        );
    }
);

ButtonDropdown.displayName = "ButtonDropdown";
