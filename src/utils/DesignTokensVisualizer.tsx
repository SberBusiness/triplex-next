import React, { useState } from "react";
import { DesignTokensCore } from "../components/DesignTokens/DesignTokensCore";
import styles from "./DesignTokensVisualizer.module.css";
import { TDesignTokensCore } from "../components/DesignTokens/types/DesignTokensTypes";

type DesignTokensGroupName = keyof TDesignTokensCore;
type TokenGroup = Record<string, { value: string }>;

export const DesignTokensVisualizer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DesignTokensGroupName>(
        Object.keys(DesignTokensCore)[0] as DesignTokensGroupName,
    );

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {Object.keys(DesignTokensCore).map((groupName) => (
                    <button
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
                        {groupName}
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

                                    <button className={styles.variable}>
                                        <span>{`${activeTab}.${tokenName}`}</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
