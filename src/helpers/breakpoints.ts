export enum EBreakpoints {
    XS_MAX = "xs-max",
    SM = "sm",
    SM_MAX = "sm-max",
    MD = "md",
    MD_MAX = "md-max",
    LG = "lg",
    LG_MAX = "lg-max",
    XL = "xl",
}

export const BREAKPOINT_VALUES: Record<EBreakpoints, number> = {
    [EBreakpoints.XS_MAX]: 575,
    [EBreakpoints.SM]: 576,
    [EBreakpoints.SM_MAX]: 767,
    [EBreakpoints.MD]: 768,
    [EBreakpoints.MD_MAX]: 991,
    [EBreakpoints.LG]: 992,
    [EBreakpoints.LG_MAX]: 1199,
    [EBreakpoints.XL]: 1200,
};
