import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { Text } from "@sber-business/triplex/components/Typography/Text";
import { ELineType, ETextSize } from "@sber-business/triplex/components/Typography/enums";

/** Свойства компонента DropdownMobileListItem. */
export interface IDropdownMobileListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    onSelect?: () => void;
    selected?: boolean;
}

/** Элемент списка мобильной версии Dropdown. */
export const DropdownMobileListItem = React.forwardRef<HTMLDivElement, IDropdownMobileListItemProps>(
    ({ children, className, id, onClick, onSelect, selected, ...htmlAttributes }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        return (
            <Text
                tag="div"
                size={ETextSize.B1}
                line={ELineType.EXTRA}
                className={classnames(
                    "cssClass[dropdownMobileListItem]",
                    { "cssClass[selected]": Boolean(selected) },
                    className
                )}
                aria-selected={Boolean(selected)}
                role="option"
                ref={ref}
                onClick={handleClick}
                title={typeof children === "string" ? children : undefined}
                {...htmlAttributes}
            >
                {children}
            </Text>
        );
    }
);

DropdownMobileListItem.displayName = "DropdownMobileListItem";
