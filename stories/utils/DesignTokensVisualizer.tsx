import React, { useState } from "react";
import { DesignTokensCore } from "../../src/components/DesignTokens/DesignTokensCore";
import { TDesignTokensCore } from "../../src/components/DesignTokens/types/DesignTokensTypes";
import styles from "./DesignTokensVisualizer.module.css";

type DesignTokensGroupName = keyof TDesignTokensCore;
type TokenGroup = Record<string, { value: string }>;

// Цветовые группы палитры. Тени показывает ShadowTokensVisualizer.
const colorGroupNames = Object.keys(DesignTokensCore).filter((groupName) =>
    groupName.startsWith("Color"),
) as DesignTokensGroupName[];

export const DesignTokensVisualizer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DesignTokensGroupName>(colorGroupNames[0]);

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {colorGroupNames.map((groupName) => (
                    <button
                        type="button"
                        key={groupName}
                        onClick={() => setActiveTab(groupName as DesignTokensGroupName)}
                        className={styles.tab}
                        style={{
                            borderBottom: activeTab === groupName ? "3px solid #005e7f" : "4px solid transparent",
                        }}
                        aria-selected={activeTab === groupName}
                        role="tab"
                        tabIndex={activeTab === groupName ? 0 : -1}
                    >
                        {groupName.slice(5)}
                    </button>
                ))}
            </div>

            <div role="tabpanel" aria-labelledby={activeTab}>
                {activeTab && (
                    <div className={styles.tokenList}>
                        {Object.entries(DesignTokensCore[activeTab] as TokenGroup).map(([tokenName, token]) => {
                            return (
                                <div key={tokenName} className={styles.token}>
                                    <div
                                        className={styles.tokenColor}
                                        style={{
                                            backgroundColor: token.value,
                                        }}
                                    />

                                    <div className={styles.tokenValue}>
                                        <span>{token.value}</span>
                                    </div>

                                    <div className={styles.variable}>
                                        <span>{`${activeTab}.${tokenName}`}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
