import React from "react";
import { EScreenWidth } from "../../helpers/breakpoints";
import { MediaWidth } from "../MediaWidth";

/**
 * Свойства MobileView.
 */
export interface IMobileViewProps {
    /** Элементы, которые рендерятся, когда ширина окна браузера соответствует ширине мобильного устройства (<768px). */
    children: React.ReactElement | null;
    /** Элементы, которые рендерятся, когда ширина окна браузера не соответствует ширине мобильного устройства (<768px). */
    fallback: React.ReactElement | null;
}

/**
 * Компонент, который рендерит children в случае просмотра на мобильном устройстве.
 * В противном случае рендерится fallback.
 */
export const MobileView: React.FC<IMobileViewProps> = ({ children, fallback }) => (
    <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={fallback}>
        {children}
    </MediaWidth>
);
