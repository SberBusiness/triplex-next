import React from "react";
import { SuggestField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

export const LoadingExample = () => {
    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                value={undefined}
                options={[]}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={false}
                loading={true}
                onFilter={() => {}}
                onSelect={() => {}}
                inputProps={{}}
            />
        </div>
    );
};
