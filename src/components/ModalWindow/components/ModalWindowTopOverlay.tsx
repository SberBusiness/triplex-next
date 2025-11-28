import React from "react";
import {
    ITopOverlayConfirmProps,
    TopOverlayConfirm,
} from "@sber-business/triplex/components/TopOverlay/TopOverlayConfirm";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import FocusTrap from "focus-trap-react";

/**
 * Свойства ModalWindowTopOverlay.
 */
interface ModalWindowTopOverlayProps extends ITopOverlayConfirmProps {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
}

export const overlayDataAttributeIsOpen = "data-is-open";

export class ModalWindowTopOverlay extends React.PureComponent<ModalWindowTopOverlayProps> {
    public static displayName = "ModalWindowTopOverlay";

    public render() {
        const { isOpen, focusTrapProps } = this.props;

        return (
            <FocusTrap
                active={isOpen}
                {...focusTrapProps}
                focusTrapOptions={{ clickOutsideDeactivates: true, ...focusTrapProps?.focusTrapOptions }}
            >
                <div
                    className={classnames("cssClass[modalWindowTopOverlayWrapper]")}
                    {...(isOpen && { [overlayDataAttributeIsOpen]: true })}
                >
                    <TopOverlayConfirm {...this.props} />
                </div>
            </FocusTrap>
        );
    }
}
