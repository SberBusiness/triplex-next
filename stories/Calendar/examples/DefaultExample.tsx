import React, { useState } from "react";
import moment from "moment";
import { Calendar } from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [pickedDate, setPickedDate] = useState(moment());

    return <Calendar pickedDate={pickedDate} onDateChange={setPickedDate} />;
};
