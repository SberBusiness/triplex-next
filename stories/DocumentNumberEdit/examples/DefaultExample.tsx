import React, { useState } from "react";
import { DocumentNumberEdit } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <DocumentNumberEdit
            value={value}
            buttonLabel="Изменить"
            emptyNumberButtonLabel="Задать номер"
            emptyNumberLabel="Номер документа будет присвоен автоматически"
            numberLabel="Документ №"
            onChange={handleChange}
        />
    );
};
