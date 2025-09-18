import React, { useRef, useState } from "react";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "@sberbusiness/triplex-next/components/Button/ButtonDropdownExtended";
import { Button } from "@sberbusiness/triplex-next/components/Button/Button";
import { EButtonSize, EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { CaretdownStrokeSrvIcon24, DotshorizontalStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import {
    DropdownList,
    EDropdownListSize,
    EDropdownSize,
    IDropdownListItemProps,
} from "@sberbusiness/triplex-next/components/Dropdown";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import { uniqueId } from "lodash-es";
import { DropdownMobileHeader } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileHeader";
import { DropdownMobileBody } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileBody";
import { DropdownMobileList } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileList";
import { DropdownMobileListItem } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileListItem";
import { DropdownMobileClose } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileClose";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import clsx from "clsx";
import styles from "./styles/ButtonDropdown.module.less";

export const dotsTheme = "dots";

const getDropdownSize = (size: EButtonSize) => {
    switch (size) {
        case EButtonSize.SM:
            return EDropdownSize.SM;
        case EButtonSize.MD:
            return EDropdownSize.MD;
        case EButtonSize.LG:
            return EDropdownSize.LG;
        default:
            return EDropdownSize.MD;
    }
};
const getDropdownListSize = (size: EButtonSize) => {
    switch (size) {
        case EButtonSize.SM:
            return EDropdownListSize.SM;
        case EButtonSize.MD:
            return EDropdownListSize.MD;
        case EButtonSize.LG:
            return EDropdownListSize.LG;
        default:
            return EDropdownListSize.MD;
    }
};

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
    theme: typeof dotsTheme;
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
        const classNames = clsx(styles.buttonDropdown, { [styles.block]: !!block }, className);
        const [activeDescendant, setActiveDescendant] = useState<string>();
        const instanceId = useRef(uniqueId());

        const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => {
            const classNames = clsx(styles.buttonDropdownTarget, "hoverable", {
                [styles.active]: opened,
                [styles.block]: !!block,
            });

            return (
                <Button
                    className={classNames}
                    theme={theme as EButtonTheme}
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

        const renderButtonDots = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => {
            const classNames = clsx(styles.buttonDropdownTarget, "hoverable", {
                [styles.active]: opened,
                [styles.block]: !!block,
            });

            return (
                <Button
                    className={classNames}
                    theme={EButtonTheme.SECONDARY}
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
                    icon={<DotshorizontalStrokeSrvIcon24 paletteIndex={0} />}
                />
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
                case dotsTheme:
                    return <CaretdownStrokeSrvIcon24 paletteIndex={7} className={styles.caretIcon} />;
                case EButtonTheme.SECONDARY:
                    return <CaretdownStrokeSrvIcon24 paletteIndex={0} className={styles.caretIcon} />;
                default:
                    return null;
            }
        };

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            const classNames = clsx(styles.buttonDropdownMenu, className);

            return (
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <ButtonDropdownExtended.Dropdown
                        size={getDropdownSize(size)}
                        className={classNames}
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={buttonRef}
                        ref={dropdownRef}
                        mobileViewProps={{
                            children: (
                                <>
                                    <DropdownMobileHeader>
                                        <Text tag="div" size={ETextSize.B3}>
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
                        <DropdownList dropdownOpened={opened} id={instanceId.current} size={getDropdownListSize(size)}>
                            {options.map((option) => (
                                <DropdownList.Item
                                    {...option}
                                    className={styles.buttonDropdownMenuItem}
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
                renderButton={theme === dotsTheme ? renderButtonDots : renderButton}
                renderDropdown={renderDropdown}
                dropdownRef={dropdownRef}
                closeOnTab
                {...rest}
            />
        );
    },
);

ButtonDropdown.displayName = "ButtonDropdown";
