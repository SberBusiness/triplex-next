import React from "react";
import { MonthYearField, HelpBox, EComponentSize, EFormFieldStatus, ETooltipSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const STATUSES = Object.values(EFormFieldStatus);

export const VisualTestsExample = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap", maxWidth: 1000 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ width: 220 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <MonthYearField size={size} value="" label="Empty" placeholder="мм.гггг" onChange={() => {}} />
            </div>
        ))}
        {SIZES.map((size) => (
            <div key={`filled-${size}`} style={{ width: 220 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()} filled</div>
                <MonthYearField size={size} value="19700101" label="Filled" placeholder="мм.гггг" onChange={() => {}} />
            </div>
        ))}
        {STATUSES.map((status) => (
            <div key={status} style={{ width: 220 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
                <MonthYearField
                    status={status}
                    value="19700101"
                    label="Status"
                    placeholder="мм.гггг"
                    onChange={() => {}}
                />
            </div>
        ))}
        <div style={{ width: 220 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>With clear</div>
            <MonthYearField
                value="19700101"
                label="Clearable"
                placeholder="мм.гггг"
                onChange={() => {}}
                onClear={() => {}}
            />
        </div>
        <div style={{ width: 220 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>With postfix</div>
            <MonthYearField
                value="19700101"
                label="With postfix"
                placeholder="мм.гггг"
                onChange={() => {}}
                onClear={() => {}}
                targetProps={{
                    inputProps: {},
                    postfix: <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>,
                }}
            />
        </div>
    </div>
);
