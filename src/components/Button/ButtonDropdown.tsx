import React, { useRef, useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import {
    CaretdownStrokeSrvIcon24,
    CaretdownStrokeSrvIcon20,
    CaretdownStrokeSrvIcon16,
    DotshorizontalStrokeSrvIcon32,
    DotshorizontalStrokeSrvIcon20,
} from "@sberbusiness/icons-next";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "./ButtonDropdownExtended";
import { Button } from "./Button";
import { EButtonDotsTheme, EButtonTheme } from "./enums";
import { isKey } from "../../utils/keyboard";
import {
    DropdownList,
    DropdownListContext,
    DropdownMobileHeader,
    DropdownMobileClose,
    DropdownMobileBody,
    DropdownMobileList,
    DropdownMobileListItem,
    IDropdownListItemProps,
    EDropdownWidth,
    EDropdownAlignment,
} from "../Dropdown";
import { Text, ETextSize } from "../Typography";
import { EComponentSize } from "../../enums/EComponentSize";
import styles from "./styles/ButtonDropdown.module.less";

/** Свойства опции в выпадающем списке действий. */
export interface IButtonDropdownOption extends Omit<
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
    size: EComponentSize;
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
    theme: EButtonTheme.GENERAL | EButtonTheme.SECONDARY | EButtonTheme.SECONDARY_LIGHT | EButtonTheme.DANGER;
    /** Блочное состояние кнопки. */
    block?: boolean;
}

/** Свойства контекстной кнопки с выпадающим списком действий. */
interface IButtonDotsProps extends IButtonDropdownProps {
    /** Тема кнопки. */
    theme: EButtonDotsTheme;
    /** Блочное состояние кнопки. */
    block?: never;
}

const SIZE_TO_DOTS_ICON_MAP: Record<EComponentSize, React.ReactElement> = {
    [EComponentSize.SM]: <DotshorizontalStrokeSrvIcon20 paletteIndex={0} />,
    [EComponentSize.MD]: <DotshorizontalStrokeSrvIcon20 paletteIndex={0} />,
    [EComponentSize.LG]: <DotshorizontalStrokeSrvIcon32 paletteIndex={0} />,
};

const SIZE_TO_CARET_ICON_MAP: Record<EComponentSize, (paletteIndex: 0 | 7) => React.ReactElement> = {
    [EComponentSize.SM]: (paletteIndex) => (
        <CaretdownStrokeSrvIcon16 paletteIndex={paletteIndex} className={styles.caretIcon} />
    ),
    [EComponentSize.MD]: (paletteIndex) => (
        <CaretdownStrokeSrvIcon20 paletteIndex={paletteIndex} className={styles.caretIcon} />
    ),
    [EComponentSize.LG]: (paletteIndex) => (
        <CaretdownStrokeSrvIcon24 paletteIndex={paletteIndex} className={styles.caretIcon} />
    ),
};

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
                    theme={
                        theme === EButtonDotsTheme.DOTS_SECONDARY
                            ? EButtonTheme.SECONDARY
                            : EButtonTheme.SECONDARY_LIGHT
                    }
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
                    icon={SIZE_TO_DOTS_ICON_MAP[size]}
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
                    return SIZE_TO_CARET_ICON_MAP[size](7);
                case EButtonTheme.SECONDARY:
                case EButtonTheme.SECONDARY_LIGHT:
                    return SIZE_TO_CARET_ICON_MAP[size](0);
                default:
                    return null;
            }
        };

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            const classNames = clsx(styles.buttonDropdownMenu, className);

            return (
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <ButtonDropdownExtended.Dropdown
                        className={classNames}
                        size={size}
                        width={EDropdownWidth.MIN_TARGET}
                        alignment={EDropdownAlignment.RIGHT}
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={buttonRef}
                        ref={dropdownRef}
                        mobileViewProps={{
                            children: (
                                <>
                                    <DropdownMobileHeader
                                        controlButtons={<DropdownMobileClose onClick={() => setOpened(false)} />}
                                    >
                                        <Text tag="div" size={ETextSize.B3}>
                                            {children}
                                        </Text>
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
                        <DropdownList dropdownOpened={opened} id={instanceId.current} size={size}>
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
                renderButton={
                    theme === EButtonDotsTheme.DOTS_SECONDARY || theme === EButtonDotsTheme.DOTS_SECONDARY_LIGHT
                        ? renderButtonDots
                        : renderButton
                }
                renderDropdown={renderDropdown}
                dropdownRef={dropdownRef}
                closeOnTab
                {...rest}
            />
        );
    },
);

ButtonDropdown.displayName = "ButtonDropdown";
