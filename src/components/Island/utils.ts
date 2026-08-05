import { EIslandType } from "./enums";
import styles from "./styles/Island.module.less";

/** Возвращает CSS-класс острова, соответствующий его типу. */
export const mapTypeToClassName = (type: EIslandType): string => {
    switch (type) {
        case EIslandType.TYPE_1:
            return styles.type1;

        case EIslandType.TYPE_2:
            return styles.type2;

        case EIslandType.TYPE_3:
            return styles.type3;
    }
};
