import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsLineItemProps } from "./components/TabsLineItem";

/** Общие свойства TabsLineDesktop и TabsLine Mobile. */
export interface ITabsLineBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Коллекция табов. */
    tabs: ITabsLineItemProps[];
    /** Коллбек смены таба. */
    onChangeTab: (tabId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
    /** Размер компонента. */
    size?: EComponentSize;
}
