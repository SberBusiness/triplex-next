/** Компоненты, в которых можно открыть Confirm.
 *  От этого зависит максимальная ширина Confirm.
 */
export enum EConfirmParentComponent {
    /** LightBox — ширина контента лайтбокса. */
    LIGHTBOX = "lightBox",
    /** LightBoxSideOverlay размера SM. */
    SIDE_OVERLAY_SM = "sideOverlaySM",
    /** LightBoxSideOverlay размера MD. */
    SIDE_OVERLAY_MD = "sideOverlayMD",
    /** LightBoxSideOverlay размера LG. */
    SIDE_OVERLAY_LG = "sideOverlayLG",
}
