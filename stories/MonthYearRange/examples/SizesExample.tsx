import React, { useState } from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    EMonthYearRangeShiftUnit,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
    EComponentSize,
} from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);

    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" size={size} {...props} />
    );
    const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: 500 }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <MonthYearRange
                value={value}
                onChange={setValue}
                shiftAmount={1}
                shiftUnit={EMonthYearRangeShiftUnit.MONTH}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButton}
                renderButtonForward={renderButton}
            />
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
// const [valueSM, setValueSM] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);
// const [valueMD, setValueMD] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);
// const [valueLG, setValueLG] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);
// const renderPickerSM = (props: IMonthYearRangePickerProvideProps) => (
//     <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.SM} {...props} />
// );
// const renderPickerMD = (props: IMonthYearRangePickerProvideProps) => (
//     <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.MD} {...props} />
// );
// const renderPickerLG = (props: IMonthYearRangePickerProvideProps) => (
//     <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.LG} {...props} />
// );
// const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;
// return (
//     <div style={{ display: "flex", gap: 24, flexDirection: "column" }}>
//         {/* <div>
//             <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
//             <MonthYearRange
//                 value={valueSM}
//                 onChange={setValueSM}
//                 shiftAmount={1}
//                 shiftUnit={EMonthYearRangeShiftUnit.MONTH}
//                 renderPickerFrom={renderPickerSM}
//                 renderPickerTo={renderPickerSM}
//                 renderButtonBack={renderButton}
//                 renderButtonForward={renderButton}
//             />
//         </div> */}
//         {/* <div>
//             <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
//             <MonthYearRange
//                 value={valueMD}
//                 onChange={setValueMD}
//                 shiftAmount={1}
//                 shiftUnit={EMonthYearRangeShiftUnit.MONTH}
//                 renderPickerFrom={renderPickerMD}
//                 renderPickerTo={renderPickerMD}
//                 renderButtonBack={renderButton}
//                 renderButtonForward={renderButton}
//             />
//         </div> */}
//         {/* <div>
//             <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
//             <MonthYearRange
//                 value={valueLG}
//                 onChange={setValueLG}
//                 shiftAmount={1}
//                 shiftUnit={EMonthYearRangeShiftUnit.MONTH}
//                 renderPickerFrom={renderPickerLG}
//                 renderPickerTo={renderPickerLG}
//                 renderButtonBack={renderButton}
//                 renderButtonForward={renderButton}
//             />
//         </div> */}
//     </div>
// );
