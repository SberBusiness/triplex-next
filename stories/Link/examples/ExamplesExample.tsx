import React from "react";
import { Link, Text, Gap, ETextSize, EFontType } from "@sberbusiness/triplex-next";
import { LinkStrokeSrvIcon16 } from "@sberbusiness/icons-next";

export const ExamplesExample = () => {
    const renderContentAfter = () => (
        <div style={{ paddingTop: "6px" }}>
            <LinkStrokeSrvIcon16 paletteIndex={0} />
        </div>
    );

    const renderContentBefore = () => (
        <div style={{ paddingTop: "4px" }}>
            <LinkStrokeSrvIcon16 paletteIndex={0} />
        </div>
    );

    return (
        <div>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                <Link href="#" contentAfter={renderContentAfter} onClick={(event) => event.preventDefault()}>
                    External link with content after
                </Link>
            </Text>
            <Gap size={16} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                <Link href="#" contentBefore={renderContentBefore} onClick={(event) => event.preventDefault()}>
                    External link with content before
                </Link>
            </Text>
            <Gap size={16} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                <Link
                    href="#"
                    contentBefore={renderContentBefore}
                    contentAfter={renderContentAfter}
                    onClick={(event) => event.preventDefault()}
                >
                    External link with content before and after
                </Link>
            </Text>
        </div>
    );
};
