import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    DropdownListItem,
    EComponentSize,
    EDropdownWidth,
    EFormFieldStatus,
    SelectExtendedField,
    SelectExtendedFieldDropdown,
    SelectExtendedFieldTarget,
} from "@sberbusiness/triplex-next";

/** Свойства Playground: props компонента и вспомогательные настройки поля выбора. */
export interface IPlaygroundProps {
    /** Закрытие выпадающего блока по Tab. */
    closeOnTab: boolean;
    /** Размер поля выбора. */
    size: EComponentSize;
    /** Визуальное состояние поля выбора. */
    status: EFormFieldStatus;
    /** Заголовок поля выбора. */
    fieldLabel: string;
    /** Текст, отображаемый пока значение не выбрано. */
    placeholder: string;
    /** Состояние загрузки поля выбора. */
    loading: boolean;
    /** Кнопка очистки значения. */
    withClearButton: boolean;
}

const OPTIONS = [
    { id: "option1", label: "Первая опция" },
    { id: "option2", label: "Вторая опция" },
    { id: "option3", label: "Третья опция" },
    { id: "option4", label: "Четвёртая опция" },
    { id: "option5", label: "Пятая опция" },
];

export const Playground = ({
    closeOnTab,
    size,
    status,
    fieldLabel,
    placeholder,
    loading,
    withClearButton,
}: IPlaygroundProps) => {
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const selectedOption = OPTIONS.find((option) => option.id === selectedId);

    return (
        <div style={{ maxWidth: "300px" }}>
            <SelectExtendedField
                closeOnTab={closeOnTab}
                onOpen={action("onOpen")}
                onClose={action("onClose")}
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        size={size}
                        status={status}
                        loading={loading}
                        fieldLabel={fieldLabel}
                        label={selectedOption?.label}
                        placeholder={placeholder}
                        onClear={
                            withClearButton && selectedOption
                                ? () => {
                                      setSelectedId(undefined);
                                      action("onClear")();
                                  }
                                : undefined
                        }
                    />
                )}
            >
                {({ opened, setOpened, targetRef, dropdownRef }) => (
                    <SelectExtendedFieldDropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={targetRef}
                        forwardedRef={dropdownRef}
                        size={size}
                        width={EDropdownWidth.TARGET}
                    >
                        <SelectExtendedFieldDropdown.List dropdownOpened={opened} size={size}>
                            {OPTIONS.map((option) => (
                                <DropdownListItem
                                    key={option.id}
                                    id={option.id}
                                    selected={option.id === selectedId}
                                    onSelect={() => {
                                        setSelectedId(option.id);
                                        setOpened(false);
                                        action("onSelect")(option.id);
                                    }}
                                >
                                    {option.label}
                                </DropdownListItem>
                            ))}
                        </SelectExtendedFieldDropdown.List>
                    </SelectExtendedFieldDropdown>
                )}
            </SelectExtendedField>
        </div>
    );
};
