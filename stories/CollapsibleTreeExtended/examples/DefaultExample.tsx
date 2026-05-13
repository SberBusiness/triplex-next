import React from "react";
import { CollapsibleTreeExtended } from "../../../src/components/CollapsibleTreeExtended/CollapsibleTreeExtended";

export const DefaultExample = () => {
    const [paymentsOpened, setPaymentsOpened] = React.useState(true);

    return (
        <div style={{ maxWidth: "320px" }}>
            <CollapsibleTreeExtended>
                <CollapsibleTreeExtended.Node
                    id="payments"
                    opened={paymentsOpened}
                    toggle={setPaymentsOpened}
                    renderHeader={({ opened, toggle, hasChildNodes }) => (
                        <button
                            onClick={() => hasChildNodes && toggle(!opened)}
                            style={{ cursor: hasChildNodes ? "pointer" : "default" }}
                            type="button"
                        >
                            {hasChildNodes ? (opened ? "▼ " : "▶ ") : "• "}
                            Платежи
                        </button>
                    )}
                    renderBody={() => (
                        <>
                            <CollapsibleTreeExtended.Node
                                id="payments-incoming"
                                renderHeader={({ opened, toggle, hasChildNodes }) => (
                                    <button
                                        onClick={() => hasChildNodes && toggle(!opened)}
                                        style={{ cursor: hasChildNodes ? "pointer" : "default" }}
                                        type="button"
                                    >
                                        {hasChildNodes ? (opened ? "▼ " : "▶ ") : "• "}
                                        Входящие
                                    </button>
                                )}
                                renderBody={() => null}
                            />
                            <CollapsibleTreeExtended.Node
                                id="payments-outgoing"
                                renderHeader={({ opened, toggle, hasChildNodes }) => (
                                    <button
                                        onClick={() => hasChildNodes && toggle(!opened)}
                                        style={{ cursor: hasChildNodes ? "pointer" : "default" }}
                                        type="button"
                                    >
                                        {hasChildNodes ? (opened ? "▼ " : "▶ ") : "• "}
                                        Исходящие
                                    </button>
                                )}
                                renderBody={() => null}
                            />
                        </>
                    )}
                />
                <CollapsibleTreeExtended.Node
                    id="documents"
                    renderHeader={({ opened, toggle, hasChildNodes }) => (
                        <button
                            onClick={() => hasChildNodes && toggle(!opened)}
                            style={{ cursor: hasChildNodes ? "pointer" : "default" }}
                            type="button"
                        >
                            {hasChildNodes ? (opened ? "▼ " : "▶ ") : "• "}
                            Документы
                        </button>
                    )}
                    renderBody={() => (
                        <CollapsibleTreeExtended.Node
                            id="documents-contracts"
                            renderHeader={({ opened, toggle, hasChildNodes }) => (
                                <button
                                    onClick={() => hasChildNodes && toggle(!opened)}
                                    style={{ cursor: hasChildNodes ? "pointer" : "default" }}
                                    type="button"
                                >
                                    {hasChildNodes ? (opened ? "▼ " : "▶ ") : "• "}
                                    Договоры
                                </button>
                            )}
                            renderBody={() => null}
                        />
                    )}
                />
            </CollapsibleTreeExtended>
        </div>
    );
};
