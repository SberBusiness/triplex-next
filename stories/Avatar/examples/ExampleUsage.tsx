import React from "react";
import { DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import {
    Avatar,
    EAvatarSize,
    EFontType,
    EFontWeightTitle,
    ETitleSize,
    Title as TypographyTitle,
} from "@sberbusiness/triplex-next";

export const ExampleUsage = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Avatar
            size={EAvatarSize.XXL}
            style={{ backgroundImage: "url(assets/images/avatar.png)", backgroundSize: "contain" }}
        />
        <Avatar size={EAvatarSize.XXL} style={{ backgroundColor: "#339FF1" }}>
            <TypographyTitle size={ETitleSize.H1} weight={EFontWeightTitle.REGULAR} type={EFontType.PRIMARY_INVERT}>
                AA
            </TypographyTitle>
        </Avatar>
        <Avatar size={EAvatarSize.XXL} style={{ backgroundColor: "#339FF1" }}>
            <DefaulticonStrokePrdIcon32 paletteIndex={7} />
        </Avatar>
    </div>
);
