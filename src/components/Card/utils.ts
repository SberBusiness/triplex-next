import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";
import cardStyles from "./styles/Card.module.less";

/** Соответствие типа скругления карточки стилевому классу. */
export const mapCardRoundingSizeToCssClass = {
    [ECardRoundingSize.MD]: cardStyles.roundingMD,
    [ECardRoundingSize.SM]: cardStyles.roundingSM,
};

/** Соответствие темы карточки стилевому классу.  */
export const mapCardThemeToCssClass = {
    [ECardTheme.GENERAL]: cardStyles.general,
    [ECardTheme.SECONDARY]: cardStyles.secondary,
};
