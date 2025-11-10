import { EIslandType } from "./enums";
import { TIslandBorderRadiusSize, TIslandPaddingSize } from "./types";
import styles from "./styles/Island.module.less";

export const mapBorderRadiusToClassName = (borderRadius: TIslandBorderRadiusSize) => {
    switch (borderRadius) {
        case 16:
            return styles.borderRadius16;
        case 24:
            return styles.borderRadius24;
        case 32:
            return styles.borderRadius32;
    }

    return "";
};

export const mapPaddingSizeToClassName = (paddingSize: TIslandPaddingSize) => {
    switch (paddingSize) {
        case 16:
            return styles.padding16;

        case 24:
            return styles.padding24;

        case 32:
            return styles.padding32;
    }
};

export const mapTypeToClassName = (type: EIslandType) => {
    switch (type) {
        case EIslandType.TYPE_1:
            return styles.type1;

        case EIslandType.TYPE_2:
            return styles.type2;

        case EIslandType.TYPE_3:
            return styles.type3;
    }
};
