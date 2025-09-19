import React, { useEffect, useRef } from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListMasterHeader. */
export interface IListMasterHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Элемент позиционируется как sticky. */
    sticky?: boolean;
}

/** Хедер ListMaster. */
export const ListMasterHeader = React.forwardRef<HTMLDivElement, IListMasterHeaderProps>(
    ({ children, className, sticky = true, ...rest }, ref) => {
        // Ссылка на контейнер.
        const containerRef = useRef<HTMLDivElement | null>(null);
        // Высота контейнера.
        const containerHeightRef = useRef(0);

        useEffect(() => {
            if (!containerRef.current) {
                return;
            }

            containerHeightRef.current = containerRef.current.getBoundingClientRect().height;

            /** Компенсация высоты добавленного элемента ListMasterHeader.
             *  Иначе при выборе чекбокса, он уезжает вниз на высоту ListMasterHeader.
             */
            window.scrollTo({ top: window.scrollY + containerHeightRef.current });

            return () => {
                window.scrollTo({ top: Math.max(window.scrollY - containerHeightRef.current, 0) });
            };
        }, []);

        const setRef = (instance: HTMLDivElement | null) => {
            containerRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <div
                className={classnames(
                    "cssClass[listMasterHeader]",
                    {
                        "cssClass[sticky]": sticky,
                    },
                    className
                )}
                {...rest}
                ref={setRef}
            >
                {children}
            </div>
        );
    }
);

ListMasterHeader.displayName = "ListMasterHeader";
