import moment from "moment";
import React, { useState } from "react";
import { Calendar } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => {
    const [pickedDate, setPickedDate] = useState(moment("19700101"));

    return <Calendar pickedDate={pickedDate} onDateChange={setPickedDate} />;
};
