import React from "react";
import { Divider, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ maxWidth: 600 }}>
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </Text>
        <Divider marginTopSize={24} marginBottomSize={16} />
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
        </Text>
        <Divider marginTopSize={24} marginBottomSize={16} />
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Text>
    </div>
);
