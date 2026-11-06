import React, { useRef } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { ETextSize } from "../../Typography/enums";
import { Text } from "../../Typography/Text";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "../../Button/ButtonDropdownExtended";
import { DropdownList } from "../../Dropdown/desktop/DropdownList";
import { IButtonDropdownProps } from "../../Button/ButtonDropdown";
import { createButtonDropdownKeyDownHandler } from "../../Button/utils";
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
        const instanceId = useRef(uniqueId());

        const renderButton = ({ opened, setOpened, activeDescendant }: IButtonDropdownExtendedButtonProvideProps) => {
            return (
                <ListItemControlsButton
                    onKeyDown={createButtonDropdownKeyDownHandler({ opened, setOpened })}
                    onClick={() => setOpened(!opened)}
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

        const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => {
            return (
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
