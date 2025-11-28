import { EModalWindowSize } from "@sber-business/triplex/components/ModalWindow/enums";

/** Соответствие размера ModalWindow к стилевому классу. */
export const mapModalWindowSizeToClassName = {
    [EModalWindowSize.SM]: "cssClass[modalWindowSm]",
    [EModalWindowSize.MD]: "cssClass[modalWindowMd]",
    [EModalWindowSize.LG]: "cssClass[modalWindowLg]",
};
