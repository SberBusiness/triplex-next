import React from "react";
import { Page, EBodyPageType, EBodyPageVerticalMargin, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

interface IPlaygroundArgs {
    type: EBodyPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

export const Playground = ({ type, verticalMargin }: IPlaygroundArgs) => (
    <Page.Body type={type} verticalMargin={verticalMargin}>
        <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Text>
    </Page.Body>
);
