import React, { useState } from "react";
import { DesignTokensCore } from "../../src/components/DesignTokens/DesignTokensCore";
import {
    designTokensCoreGroupShadowKeys,
    TDesignTokensCoreGroupShadowValue,
} from "../../src/components/DesignTokens/types/DesignTokensTypes";
import styles from "./ShadowTokensVisualizer.module.less";

type ShadowGroupName = "Shadow" | "DarkShadow";

/** Тени показываются по группам палитры — Shadow (светлая тема) и DarkShadow (тёмная), как и цветовые core-группы. */
const shadowGroups: Record<
    ShadowGroupName,
    { shadows: TDesignTokensCoreGroupShadowValue; background: string | undefined }
> = {
    Shadow: {
        shadows: DesignTokensCore.Shadow,
        background: DesignTokensCore.ColorNeutral[100].value,
    },
    DarkShadow: {
        shadows: DesignTokensCore.DarkShadow,
        background: DesignTokensCore.ColorDarkNeutral[50].value,
    },
};

const shadowGroupNames = Object.keys(shadowGroups) as ShadowGroupName[];

export const ShadowTokensVisualizer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ShadowGroupName>(shadowGroupNames[0]);
    const { shadows, background } = shadowGroups[activeTab];

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {shadowGroupNames.map((groupName) => (
                    <button
                        type="button"
                        key={groupName}
                        onClick={() => setActiveTab(groupName)}
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

            <div role="tabpanel" aria-labelledby={activeTab} className={styles.shadowContainer}>
                {designTokensCoreGroupShadowKeys.map((tokenName) => (
                    <div key={tokenName} className={styles.shadowToken}>
                        <div className={styles.shadowPanel} style={{ backgroundColor: background }}>
                            <div
                                className={styles.shadowCard}
                                style={{ backgroundColor: background, boxShadow: shadows[tokenName].value }}
                            />
                        </div>

                        <div className={styles.shadowValue}>{shadows[tokenName].value}</div>

                        <div className={styles.shadowVariable}>{`${activeTab}.${tokenName}`}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
