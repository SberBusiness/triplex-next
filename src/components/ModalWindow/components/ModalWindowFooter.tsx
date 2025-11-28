import React from "react";
import { Footer } from "@sber-business/triplex/components/Footer/Footer";

/** Свойства компонента ModalWindowFooter. */
interface IModalWindowFooterProps {
    children?: React.ReactNode;
}

/** Футер модального окна. */
export const ModalWindowFooter: React.FC<IModalWindowFooterProps> = ({ children }) => (
    <div>
        <Footer className="cssClass[modalWindowFooter]">{children}</Footer>
    </div>
);

ModalWindowFooter.displayName = "ModalWindowFooter";
