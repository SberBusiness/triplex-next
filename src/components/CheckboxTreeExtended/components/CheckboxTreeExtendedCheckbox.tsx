import React from "react";
import { Checkbox, ICheckboxProps } from "../../Checkbox/Checkbox";
import clsx from "clsx";
import { isStaticCheckboxTreeExtended } from "../isStaticCheckboxTreeExtended";

/**
 * Свойства CheckboxTreeExtendedCheckbox.
 */
interface ICheckboxTreeExtendedCheckboxProps extends ICheckboxProps {
    // Текущая нода является активной при перемещении с клавиатуры.
    active?: boolean;
    // Текущая нода раскрыта.
    opened?: boolean;
}

/**
 * Обертка над базовым компонентом чекбокс.
 * Используется для фокуса чекбокса при перемещении с клавиатуры.
 */
export class CheckboxTreeExtendedCheckbox extends React.Component<ICheckboxTreeExtendedCheckboxProps> {
    private checkboxNode?: HTMLInputElement;

    public componentDidUpdate(prevProps: ICheckboxTreeExtendedCheckboxProps): void {
        const { active } = this.props;
        const { active: prevActive } = prevProps;

        // Триггер фокуса на чекбоксе при изменении флага активности при перемещении по дереву с клавиатуры. Если нода имеет дочерние ноды, то фокус получает не чекбокс, а CheckboxTreeExtendedArrow.
        if (active && !prevActive) {
            // При взаимодействии мышью триггер фокуса не нужен.
            if (!document.activeElement?.contains(this.checkboxNode as Node)) {
                this.checkboxNode?.focus();
            }
        }
    }

    public render(): JSX.Element {
        const { active, className, opened, ...checkboxProps } = this.props;

        return (
            <Checkbox
                className={clsx("cssClass[checkboxTreeCheckbox]", className)}
                ref={this.setCheckboxNode}
                labelAttributes={{ className: "cssClass[checkboxTreeCheckboxLabel]", onFocus: this.handleFocus }}
                {...checkboxProps}
            />
        );
    }

    private handleFocus = (event: React.FocusEvent<HTMLLabelElement>) => {
        // Предотвращает всплытие до ноды дерева.
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !isStaticCheckboxTreeExtended && event.stopPropagation();
    };

    private setCheckboxNode = (DOMNode: HTMLInputElement) => {
        this.checkboxNode = DOMNode;
    };
}
