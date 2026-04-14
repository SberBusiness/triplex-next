import React, { useState } from "react";
import { DocumentNumberEdit } from "../../../src/components/DocumentNumberEdit/DocumentNumberEdit";

export const VisualTestsExample = () => {
    const [value, setValue] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <DocumentNumberEdit
                value={value}
                onChange={handleChange}
                buttonLabel="Изменить"
                emptyNumberButtonLabel="Задать номер"
                emptyNumberLabel="Номер документа будет присвоен автоматически"
                numberLabel="Документ №"
                maxLength={6}
            />
            <DocumentNumberEdit
                value="123456"
                onChange={handleChange}
                buttonLabel="Изменить"
                emptyNumberButtonLabel="Задать номер"
                emptyNumberLabel="Номер документа будет присвоен автоматически"
                numberLabel="Документ №"
                maxLength={6}
            />
        </div>
    );
};
