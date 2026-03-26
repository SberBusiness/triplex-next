import React from "react";
import { Link, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
        <Link href="#" onClick={(event) => event.preventDefault()}>
            Link text
        </Link>
    </Text>
);
