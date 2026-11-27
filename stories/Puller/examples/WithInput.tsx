import React, { useRef, useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    Puller,
    PullerBody,
    PullerClose,
    PullerHeader,
    PullerInput,
    PullerList,
    PullerListItem,
    PullerLoader,
    Text,
    ETextSize,
    EVENT_KEY_CODES,
    useDropdownListKeyboard,
    DropdownListContext,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "with-input-option-1", label: "Moscow" },
    { id: "with-input-option-2", label: "Mombasa" },
    { id: "with-input-option-3", label: "Montreal" },
    { id: "with-input-option-4", label: "Madrid" },
    { id: "with-input-option-5", label: "Berlin" },
    { id: "with-input-option-6", label: "Boston" },
];

// В поле ввода пробел — часть текста, поэтому элемент выбирается только по Enter.
const KEY_CODES_FOR_SELECTION = [EVENT_KEY_CODES.ENTER];

export const WithInput = () => {
    const [opened, setOpened] = useState(false);
    const [inputValue, setInputValue] = useState("Mo");
    // Клавиатурная связка поля ввода со списком: фокус остаётся в поле, подсветку ведёт PullerList.
    const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();
    const inputRef = useRef<HTMLInputElement>(null);
    // Фокус на поле при каждом открытии, в том числе повторном во время анимации закрытия: autoFocus сработал бы
    // только при монтировании. Поле фокусируется здесь же, до ловушки: уже сфокусированный узел она не трогает
    // и не выделяет его текст.
    const focusTrapProps = {
        focusTrapOptions: {
            initialFocus: () => {
                const input = inputRef.current;

                input?.focus({ preventScroll: true });

                return input ?? undefined;
            },
        },
    };

    const query = inputValue.trim().toLowerCase();
    const filteredOptions = OPTIONS.filter((option) => option.label.toLowerCase().includes(query));
    const optionsFound = filteredOptions.length > 0;

    const handleSelect = (label: string) => {
        setInputValue(label);
        setOpened(false);
    };

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={() => setOpened(true)}
            >
                Open
            </Button>
            <DropdownListContext.Provider value={context}>
                <Puller
                    opened={opened}
                    setOpened={setOpened}
                    focusTrapProps={focusTrapProps}
                    role="dialog"
                    aria-label="City search"
                >
                    <PullerHeader
                        controlButtons={
                            <>
                                {/* В реальном сценарии лоадер показывается на время запроса подсказок. */}
                                <PullerLoader />
                                <PullerClose aria-label="Close" onClick={() => setOpened(false)} />
                            </>
                        }
                    >
                        <PullerInput
                            ref={inputRef}
                            value={inputValue}
                            placeholder="Enter a city"
                            aria-label="City"
                            role="combobox"
                            aria-expanded={optionsFound}
                            aria-controls={optionsFound ? "with-input-listbox" : undefined}
                            aria-autocomplete="list"
                            aria-activedescendant={activeDescendant}
                            onChange={(event) => setInputValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </PullerHeader>
                    <PullerBody>
                        {optionsFound ? (
                            <PullerList id="with-input-listbox" aria-label="Suggestions">
                                {filteredOptions.map((option) => (
                                    <PullerListItem
                                        key={option.id}
                                        id={option.id}
                                        keyCodesForSelection={KEY_CODES_FOR_SELECTION}
                                        onSelect={() => handleSelect(option.label)}
                                    >
                                        {option.label}
                                    </PullerListItem>
                                ))}
                            </PullerList>
                        ) : (
                            <Text tag="div" size={ETextSize.B3} role="status" style={{ padding: "16px" }}>
                                Nothing found
                            </Text>
                        )}
                    </PullerBody>
                </Puller>
            </DropdownListContext.Provider>
        </div>
    );
};
