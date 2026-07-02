import React, { useState } from "react";
import moment from "moment";
import { Calendar } from "@sberbusiness/triplex-next";

export const ReversedPickExample = () => {
    const [pickedDate, setPickedDate] = useState(moment());

    return <Calendar pickedDate={pickedDate} onDateChange={setPickedDate} reversedPick />;
};
