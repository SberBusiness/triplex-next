import React, { useRef, useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import {
    CaretdownStrokeSrvIcon24,
    CaretdownStrokeSrvIcon20,
    CaretdownStrokeSrvIcon16,
    DotshorizontalStrokeSrvIcon32,
    DotshorizontalStrokeSrvIcon24,
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
import { DataAttributes } from "../../types/CoreTypes";
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
    /** HTML-атрибуты Dropdown. */
    dropdownAttributes?: React.HTMLAttributes<HTMLDivElement> & DataAttributes;
    /** Размер кнопки. */
    size: EComponentSize;
    /** Список опций. */
    options: IButtonDropdownOption[];
    /** Выбранная опция. */
    selected?: IButtonDropdownOption;
    /** Отключенное состояние кнопки. */
    disabled?: boolean;
}

/** Темы триггера, отображаемого как обычная кнопка (без dots-вариантов). */
export type TButtonDropdownButtonTheme =
    EButtonTheme.GENERAL | EButtonTheme.SECONDARY | EButtonTheme.SECONDARY_LIGHT | EButtonTheme.DANGER;

/** Свойства основной/вспомогательной кнопки с выпадающим списком действий. */
export interface IButtonDropdownBaseProps extends IButtonDropdownProps {
    /** Тема кнопки. */
    theme: TButtonDropdownButtonTheme;
    /** Блочное состояние кнопки. */
    block?: boolean;
}

/** Свойства контекстной кнопки с выпадающим списком действий. */
export interface IButtonDotsProps extends IButtonDropdownProps {
    /** Тема кнопки. */
    theme: EButtonDotsTheme;
    /** Блочное состояние кнопки. */
    block?: never;
}

/** Тема триггера: обычная кнопка либо кнопка-dots. */
export type TButtonDropdownTheme = TButtonDropdownButtonTheme | EButtonDotsTheme;

/** Триггер отображается как кнопка-dots (иконка вместо текста и каретки). */
const isDotsTheme = (theme: TButtonDropdownTheme): theme is EButtonDotsTheme =>
    theme === EButtonDotsTheme.DOTS_SECONDARY || theme === EButtonDotsTheme.DOTS_SECONDARY_LIGHT;

const DOTS_THEME_TO_BUTTON_THEME_MAP: Record<EButtonDotsTheme, TButtonDropdownButtonTheme> = {
    [EButtonDotsTheme.DOTS_SECONDARY]: EButtonTheme.SECONDARY,
    [EButtonDotsTheme.DOTS_SECONDARY_LIGHT]: EButtonTheme.SECONDARY_LIGHT,
};

/** Индекс палитры каретки: на цветной заливке — светлая иконка (7), на светлом фоне — тёмная (0). */
const THEME_TO_CARET_PALETTE_INDEX_MAP: Record<TButtonDropdownButtonTheme, 0 | 7> = {
    [EButtonTheme.GENERAL]: 7,
    [EButtonTheme.DANGER]: 7,
    [EButtonTheme.SECONDARY]: 0,
    [EButtonTheme.SECONDARY_LIGHT]: 0,
};

const SIZE_TO_DOTS_ICON_MAP: Record<EComponentSize, React.ReactElement> = {
    [EComponentSize.SM]: <DotshorizontalStrokeSrvIcon20 paletteIndex={0} />,
    [EComponentSize.MD]: <DotshorizontalStrokeSrvIcon24 paletteIndex={0} />,
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

/**
 * Кнопка с выпадающим списком действий.
 * Триггер отображается либо как обычная кнопка с текстом и кареткой, либо как кнопка-dots (тема EButtonDotsTheme).
 */
export const ButtonDropdown = React.forwardRef<HTMLButtonElement, IButtonDropdownBaseProps | IButtonDotsProps>(
    (props, ref) => {
        const {
            buttonAttributes,
            dropdownAttributes = {},
            children,
            className,
            theme,
            size,
            options,
            selected,
            block,
            disabled,
            ...rest
        } = props;

        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const classNames = clsx(styles.buttonDropdown, { [styles.block]: !!block }, className);
        const [activeDescendant, setActiveDescendant] = useState<string>();
        const [instanceId] = useState(() => uniqueId());

        const isDots = isDotsTheme(theme);
        const buttonTheme = isDots ? DOTS_THEME_TO_BUTTON_THEME_MAP[theme] : theme;

        const setRef = (instance: HTMLButtonElement | null) => {
            buttonRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
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

        const renderCaret = () => SIZE_TO_CARET_ICON_MAP[size](THEME_TO_CARET_PALETTE_INDEX_MAP[buttonTheme]);

        const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => {
            const classNames = clsx(styles.buttonDropdownTarget, {
                [styles.dots]: isDots,
                [styles.block]: !!block,
                [styles.active]: opened && !isDots,
            });

            return (
                <Button
                    className={classNames}
                    theme={buttonTheme}
                    size={size}
                    onKeyDown={handleKeyDown({ opened, setOpened })}
                    onClick={handleClick({ opened, setOpened })}
                    disabled={disabled}
                    aria-haspopup="menu"
                    aria-expanded={opened}
                    aria-controls={instanceId}
                    aria-activedescendant={activeDescendant}
                    icon={isDots ? SIZE_TO_DOTS_ICON_MAP[size] : undefined}
                    {...buttonAttributes}
                    ref={setRef}
                >
                    {isDots ? undefined : (
                        <>
                            {children}
                            {renderCaret()}
                        </>
                    )}
                </Button>
            );
        };

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            const { className: dropdownClassName, ...restDropdownAttributes } = dropdownAttributes;
            const classNames = clsx(className, dropdownClassName);

            return (
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <ButtonDropdownExtended.Dropdown
                        {...restDropdownAttributes}
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
                        <DropdownList dropdownOpened={opened} id={instanceId} size={size}>
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
    },
);

ButtonDropdown.displayName = "ButtonDropdown";
