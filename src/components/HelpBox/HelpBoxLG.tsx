import { HelpBox, IHelpBoxProps } from "@sber-business/triplex/components/HelpBox/HelpBox";
import { ETooltipSize } from "@sber-business/triplex/components/Tooltip/enums";
import React from "react";

/** Свойства компонента HelpBoxLG. */
export interface IHelpBoxLGProps extends Omit<IHelpBoxProps, "tooltipSize"> {}

/**
 * Компонент HelpBoxLG. Иконка "?" со всплывающей подсказкой большого размера.
 * @deprecated Используйте компонент HelpBox.
 */
export const HelpBoxLG: React.FC<IHelpBoxLGProps> = (props) => <HelpBox tooltipSize={ETooltipSize.LG} {...props} />;

HelpBoxLG.displayName = "HelpBoxLG";
