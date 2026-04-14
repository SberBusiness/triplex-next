import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next";
import { DefaultExample } from "./DefaultExample";

interface IPlaygroundExampleProps {
    size: EComponentSize;
}

export const PlaygroundExample = ({ size }: IPlaygroundExampleProps) => <DefaultExample size={size} />;
