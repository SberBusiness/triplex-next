import React from "react";
import { ELinkSize, ELinkType, ILinkTextProps, Link } from "../../../Link/Link";

/** Свойства компонента HeaderLink. */
export interface IHeaderLinkProps extends Omit<ILinkTextProps, "linkType" | "size"> {}

/** Ссылка компонента Header. Может вести к началу сценария/раздела. */
export const HeaderLink = React.forwardRef<HTMLAnchorElement, IHeaderLinkProps>(({ children, ...rest }, ref) => (
    <div className="cssClass[headerLink]">
        <Link {...rest} linkType={ELinkType.TEXT} size={ELinkSize.LG} ref={ref}>
            {children}
        </Link>
    </div>
));

HeaderLink.displayName = "HeaderLink";
