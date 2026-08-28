import React from "react";
import {
    Page,
    EBodyPageType,
    EBodyPageVerticalMargin,
    EComponentSize,
    Text,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";

interface IPlaygroundArgs {
    type: EBodyPageType;
    size?: EComponentSize;
    verticalMarginTop: EBodyPageVerticalMargin;
    verticalMarginBottom: EBodyPageVerticalMargin;
}

export const Playground = ({ type, size, verticalMarginTop, verticalMarginBottom }: IPlaygroundArgs) => {
    const verticalMargin = { top: verticalMarginTop, bottom: verticalMarginBottom };
    const content = (
        <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Text>
    );

    // size доступен только для типа FIRST (контент в Island); для SECOND проп size типизирован как never.
    return type === EBodyPageType.FIRST ? (
        <Page.Body type={type} size={size} verticalMargin={verticalMargin}>
            {content}
        </Page.Body>
    ) : (
        <Page.Body type={type} verticalMargin={verticalMargin}>
            {content}
        </Page.Body>
    );
};
