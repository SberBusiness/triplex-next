import React, { useState } from "react";
import {
    DropdownListItem,
    EDropdownWidth,
    EFormFieldStatus,
    SelectExtendedField,
    SelectExtendedFieldDropdown,
    SelectExtendedFieldTarget,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "option1", label: "Первая опция" },
    { id: "option2", label: "Вторая опция" },
    { id: "option3", label: "Третья опция" },
];

const STATUSES = Object.values(EFormFieldStatus);

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [selectedId, setSelectedId] = useState<string>("option1");

    const selectedOption = OPTIONS.find((option) => option.id === selectedId);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
            <SelectExtendedField
                closeOnTab
                renderTarget={({ opened, setOpened }) => (
                    <SelectExtendedFieldTarget
                        opened={opened}
                        setOpened={setOpened}
                        status={status}
                        fieldLabel="Выберите опцию"
                        label={selectedOption?.label}
                        placeholder="Не выбрано"
                    />
                )}
            >
                {({ opened, setOpened, targetRef, dropdownRef }) => (
                    <SelectExtendedFieldDropdown
                        opened={opened}
                        setOpened={setOpened}
                        targetRef={targetRef}
                        forwardedRef={dropdownRef}
                        width={EDropdownWidth.TARGET}
                    >
                        <SelectExtendedFieldDropdown.List dropdownOpened={opened}>
                            {OPTIONS.map((option) => (
                                <DropdownListItem
                                    key={option.id}
                                    id={option.id}
                                    selected={option.id === selectedId}
                                    onSelect={() => {
                                        setSelectedId(option.id);
                                        setOpened(false);
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

export const Statuses = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
