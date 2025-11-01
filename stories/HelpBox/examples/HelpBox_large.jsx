import React from "react";
import { HelpBox } from "@sber-business/triplex/components/HelpBox/HelpBox";
import { ETooltipSize } from "@sber-business/triplex/components/Tooltip/enums";
import { Gap } from "@sber-business/triplex/components/Gap/Gap";
import { TooltipLink } from "@sber-business/triplex/components/Tooltip/components/common/TooltipLink";

<HelpBox tooltipSize={ETooltipSize.LG}>
    Текст подсказки.
    <Gap size={16} />
    <TooltipLink href="#" onClick={(event) => event.preventDefault()}>
        Подробнее
    </TooltipLink>
</HelpBox>