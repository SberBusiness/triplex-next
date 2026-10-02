import { ISuggestFieldOption, ISuggestFieldProps } from "./types";
import { MobileView } from "../MobileView/MobileView";
import { SuggestFieldDesktop } from "./desktop/SuggestFieldDesktop";
import { SuggestFieldMobile } from "./mobile/SuggestFieldMobile";
import { FormFieldInput } from "../FormField";

// TODO: Переписать через useSuggest.
const SuggestFieldBase = <T extends ISuggestFieldOption = ISuggestFieldOption>(
    props: ISuggestFieldProps<T>,
): JSX.Element => (
    <MobileView fallback={<SuggestFieldDesktop<T> {...props} />}>
        <SuggestFieldMobile<T> {...props} />
    </MobileView>
);

/** Выпадающий список с возможностью поиска по введённому значению. */
export const SuggestField = Object.assign(SuggestFieldBase, { Input: FormFieldInput });
