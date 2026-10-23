import React, { useRef, useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { ETextSize } from "../../Typography/enums";
import { Text } from "../../Typography/Text";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "../../Button/ButtonDropdownExtended";
import { isKey } from "../../../utils/keyboard";
import { DropdownListContext } from "../../Dropdown/DropdownListContext";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";
import { IButtonDropdownProps } from "../../Button/ButtonDropdown";
import { IListItemControlsButtonProps, ListItemControlsButton } from "./ListItemControlsButton";
import { PullerBody, PullerClose, PullerHeader, PullerList, PullerListItem } from "../../Puller";
import { setForwardedRef } from "../../../helpers/setForwardedRef";
import styles from "../styles/ListItemControlsButton.module.less";

export interface IListItemControlsButtonDropdownProps
    extends Omit<IButtonDropdownProps, "size">, Pick<IListItemControlsButtonProps, "icon"> {}

/** Кнопка-дропдаун listItem для области под свайпом. */
export const ListItemControlsButtonDropdown = React.forwardRef<HTMLButtonElement, IListItemControlsButtonDropdownProps>(
    (props, ref) => {
        const { buttonAttributes, children, className, icon, options, selected, disabled, ...rest } = props;
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const [activeDescendant, setActiveDescendant] = useState<string>();
        const instanceId = useRef(uniqueId());

        const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => {
            return (
                <ListItemControlsButton
                    onKeyDown={handleKeyDown({ opened, setOpened })}
                    onClick={handleClick({ opened, setOpened })}
                    disabled={disabled}
                    aria-haspopup="menu"
                    aria-expanded={opened}
                    aria-controls={instanceId.current}
                    aria-activedescendant={activeDescendant}
                    icon={icon}
                    {...buttonAttributes}
                    ref={setRef}
                >
                    {children}
                </ListItemControlsButton>
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

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            return (
                <DropdownListContext.Provider value={{ activeDescendant, setActiveDescendant }}>
                    <ButtonDropdownExtended.Dropdown
                        className={className}
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={buttonRef}
                        ref={dropdownRef}
                        pullerProps={{
                            children: (
                                <>
                                    <PullerHeader controlButtons={<PullerClose onClick={() => setOpened(false)} />}>
                                        <Text tag="div" size={ETextSize.B1}>
                                            {children}
                                        </Text>
                                    </PullerHeader>
                                    <PullerBody>
                                        <PullerList>
                                            {options.map((option) => (
                                                <PullerListItem
                                                    {...option}
                                                    key={option.id}
                                                    selected={option.id === selected?.id}
                                                    onSelect={() => {
                                                        option.onSelect?.();
                                                        setOpened(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </PullerListItem>
                                            ))}
                                        </PullerList>
                                    </PullerBody>
                                </>
                            ),
                        }}
                    >
                        <DropdownList dropdownOpened={opened} id={instanceId.current}>
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

        const setRef = (instance: HTMLButtonElement | null) => {
            buttonRef.current = instance;
            setForwardedRef(ref, instance);
        };

        return (
            <ButtonDropdownExtended
                className={clsx(styles.listItemControlsButtonDropdown, className)}
                renderButton={renderButton}
                renderDropdown={renderDropdown}
                dropdownRef={dropdownRef}
                closeOnTab
                {...rest}
            />
        );
    },
);

ListItemControlsButtonDropdown.displayName = "ListItemControlsButtonDropdown";
