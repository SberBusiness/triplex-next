import React, { useState } from "react";
import { EComponentSize, FormField, FormFieldInput, FormFieldLabel, FormGroup } from "@sberbusiness/triplex-next";

export const SizesExample = () => {
    const [sm, setSm] = useState("");
    const [md, setMd] = useState("");
    const [lg, setLg] = useState("");
    return (
        <div style={{ maxWidth: "400px" }}>
            <div style={{ marginBottom: "32px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <FormGroup>
                    <FormField size={EComponentSize.SM}>
                        <FormFieldLabel>Маленькое поле</FormFieldLabel>
                        <FormFieldInput
                            value={sm}
                            onChange={(e) => setSm(e.target.value)}
                            placeholder="Введите текст..."
                        />
                    </FormField>
                </FormGroup>
            </div>
            <div style={{ marginBottom: "32px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <FormGroup>
                    <FormField size={EComponentSize.MD}>
                        <FormFieldLabel>Среднее поле</FormFieldLabel>
                        <FormFieldInput
                            value={md}
                            onChange={(e) => setMd(e.target.value)}
                            placeholder="Введите текст..."
                        />
                    </FormField>
                </FormGroup>
            </div>
            <div style={{ marginBottom: "32px" }}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <FormGroup>
                    <FormField size={EComponentSize.LG}>
                        <FormFieldLabel>Большое поле</FormFieldLabel>
                        <FormFieldInput
                            value={lg}
                            onChange={(e) => setLg(e.target.value)}
                            placeholder="Введите текст..."
                        />
                    </FormField>
                </FormGroup>
            </div>
        </div>
    );
};
