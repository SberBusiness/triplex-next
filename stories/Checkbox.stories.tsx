import React from "react";
import { Checkbox } from "../src/components/Checkbox/Checkbox";
import { StoryObj } from "@storybook/react";
// import { Checkbox } from "../src/components/Checkbox/Checkbox";
// import { CheckboxXGroup } from "../src/components/Checkbox/CheckboxXGroup";
// import { CheckboxYGroup } from "../src/components/Checkbox/CheckboxYGroup";
// import { StoryObj } from "@storybook/react";
// import { action } from "storybook/actions";
// import { Gap } from "../src/components/Gap";

export default {
    title: "Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент чекбокса с поддержкой различных состояний и режимов.

## Особенности

- **Состояния**: обычный, отмеченный, отключенный, частичный (bulk)
- **Фокус**: поддержка клавиатурной навигации с визуальным индикатором
- **Группировка**: поддержка группировки по осям X и Y
- **Доступность**: полная поддержка ARIA атрибутов и семантической разметки
- **Кастомизация**: возможность передачи атрибутов для label и input

## Использование

\`\`\`tsx
import { Checkbox } from '../src/components/Checkbox/Checkbox';

// Базовый чекбокс
<Checkbox onChange={handleChange}>
    Согласен с условиями
</Checkbox>

// Чекбокс в состоянии частичного выбора
<Checkbox bulk checked onChange={handleChange}>
    Выбрать все
</Checkbox>

// Отключенный чекбокс
<Checkbox disabled>
    Недоступная опция
</Checkbox>
\`\`\`

## Группировка

Для группировки чекбоксов используйте компоненты \`CheckboxXGroup\` (горизонтальная) и \`CheckboxYGroup\` (вертикальная).
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof Checkbox> = {
    name: "Default",
    args: {
        children: "Checkbox label",
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Текст метки чекбокса",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        checked: {
            control: { type: "boolean" },
            description: "Состояние чекбокса",
            table: {
                type: { summary: "boolean" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Отключенное состояние",
            table: {
                type: { summary: "boolean" },
            },
        },
        bulk: {
            control: { type: "boolean" },
            description: "Режим частичного выбора (индикатор минуса вместо галочки)",
            table: {
                type: { summary: "boolean" },
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => <Checkbox {...args} />,
};

// export const States: StoryObj<typeof Checkbox> = {
//     name: "Different States",
//     render: () => (
//         <CheckboxYGroup>
//             <Checkbox>Unchecked</Checkbox>
//             <Checkbox checked>Checked</Checkbox>
//             <Checkbox bulk checked>
//                 Bulk (partial selection)
//             </Checkbox>
//             <Checkbox disabled>Disabled unchecked</Checkbox>
//             <Checkbox disabled checked>
//                 Disabled checked
//             </Checkbox>
//             <Checkbox disabled bulk checked>
//                 Disabled bulk
//             </Checkbox>
//         </CheckboxYGroup>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Различные состояния чекбокса: обычный, отмеченный, частичный выбор, отключенный",
//             },
//         },
//     },
// };

// export const WithoutLabel: StoryObj<typeof Checkbox> = {
//     name: "Without Label",
//     render: () => (
//         <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <Checkbox aria-label="Checkbox without visible label" />
//             <Checkbox checked aria-label="Checked checkbox without visible label" />
//             <Checkbox bulk checked aria-label="Bulk checkbox without visible label" />
//             <Checkbox disabled aria-label="Disabled checkbox without visible label" />
//         </div>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Чекбоксы без видимой метки. Важно использовать aria-label для доступности.",
//             },
//         },
//     },
// };

// export const Interactive: StoryObj<typeof Checkbox> = {
//     name: "Interactive Example",
//     render: () => {
//         const InteractiveCheckbox = () => {
//             const [isChecked, setIsChecked] = useState(false);
//             const [isBulk, setIsBulk] = useState(false);

//             const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 setIsChecked(event.target.checked);
//                 action("onChange")(event);
//             };

//             const handleBulkToggle = () => {
//                 setIsBulk(!isBulk);
//             };

//             return (
//                 <CheckboxYGroup>
//                     <Checkbox checked={isChecked} bulk={isBulk} onChange={handleChange}>
//                         Interactive checkbox (checked: {isChecked.toString()}, bulk: {isBulk.toString()})
//                     </Checkbox>
//                     <Gap size={8} />
//                     <button
//                         type="button"
//                         onClick={handleBulkToggle}
//                         style={{
//                             padding: "8px 16px",
//                             border: "1px solid #ccc",
//                             borderRadius: "4px",
//                             background: "#f5f5f5",
//                             cursor: "pointer",
//                         }}
//                     >
//                         Toggle bulk mode
//                     </button>
//                 </CheckboxYGroup>
//             );
//         };

//         return <InteractiveCheckbox />;
//     },
//     parameters: {
//         docs: {
//             description: {
//                 story: "Интерактивный пример с возможностью переключения состояний",
//             },
//         },
//     },
// };

// export const XGroup: StoryObj<typeof CheckboxXGroup> = {
//     name: "Horizontal Group (X)",
//     render: () => (
//         <div>
//             <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
//                 Horizontal group with default indent (12px):
//             </h4>
//             <CheckboxXGroup>
//                 <Checkbox>Option 1</Checkbox>
//                 <Checkbox>Option 2</Checkbox>
//                 <Checkbox checked>Option 3</Checkbox>
//                 <Checkbox disabled>Option 4</Checkbox>
//             </CheckboxXGroup>

//             <Gap size={24} />

//             <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
//                 Horizontal group with larger indent (24px):
//             </h4>
//             <CheckboxXGroup indent={24}>
//                 <Checkbox>Large spacing 1</Checkbox>
//                 <Checkbox>Large spacing 2</Checkbox>
//                 <Checkbox checked>Large spacing 3</Checkbox>
//             </CheckboxXGroup>
//         </div>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Горизонтальная группировка чекбоксов с настраиваемыми отступами",
//             },
//         },
//     },
// };

// export const YGroup: StoryObj<typeof CheckboxYGroup> = {
//     name: "Vertical Group (Y)",
//     render: () => (
//         <div>
//             <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Vertical group:</h4>
//             <CheckboxYGroup>
//                 <Checkbox>First option</Checkbox>
//                 <Checkbox>Second option</Checkbox>
//                 <Checkbox checked>Third option (selected)</Checkbox>
//                 <Checkbox bulk checked>
//                     Fourth option (bulk)
//                 </Checkbox>
//                 <Checkbox disabled>Fifth option (disabled)</Checkbox>
//             </CheckboxYGroup>
//         </div>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Вертикальная группировка чекбоксов",
//             },
//         },
//     },
// };

// export const FormExample: StoryObj<typeof Checkbox> = {
//     name: "Form Example",
//     render: () => {
//         const FormExample = () => {
//             const [formData, setFormData] = useState({
//                 newsletter: false,
//                 terms: false,
//                 marketing: false,
//                 selectAll: false,
//             });

//             const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 const checked = event.target.checked;
//                 setFormData({
//                     newsletter: checked,
//                     terms: checked,
//                     marketing: checked,
//                     selectAll: checked,
//                 });
//             };

//             const handleIndividualChange =
//                 (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
//                     const newFormData = { ...formData, [field]: event.target.checked };

//                     // Update selectAll based on other checkboxes
//                     const individualFields = ["newsletter", "terms", "marketing"] as const;
//                     const allChecked = individualFields.every((f) => newFormData[f]);

//                     newFormData.selectAll = allChecked;

//                     setFormData(newFormData);
//                 };

//             const isIndeterminate =
//                 ["newsletter", "terms", "marketing"].some((field) => formData[field as keyof typeof formData]) &&
//                 !formData.selectAll;

//             return (
//                 <form style={{ padding: 16, border: "1px solid #e0e0e0", borderRadius: 8 }}>
//                     <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Subscription Preferences</h4>

//                     <CheckboxYGroup>
//                         <Checkbox checked={formData.selectAll} bulk={isIndeterminate} onChange={handleSelectAll}>
//                             Select All
//                         </Checkbox>

//                         <div style={{ marginLeft: 24 }}>
//                             <CheckboxYGroup>
//                                 <Checkbox checked={formData.newsletter} onChange={handleIndividualChange("newsletter")}>
//                                     Newsletter subscription
//                                 </Checkbox>
//                                 <Checkbox checked={formData.terms} onChange={handleIndividualChange("terms")}>
//                                     Accept terms and conditions
//                                 </Checkbox>
//                                 <Checkbox checked={formData.marketing} onChange={handleIndividualChange("marketing")}>
//                                     Marketing communications
//                                 </Checkbox>
//                             </CheckboxYGroup>
//                         </div>
//                     </CheckboxYGroup>

//                     <Gap size={16} />

//                     <div style={{ fontSize: 14, color: "#666" }}>
//                         <strong>Current selection:</strong>
//                         <br />
//                         Newsletter: {formData.newsletter ? "✓" : "✗"}
//                         <br />
//                         Terms: {formData.terms ? "✓" : "✗"}
//                         <br />
//                         Marketing: {formData.marketing ? "✓" : "✗"}
//                     </div>
//                 </form>
//             );
//         };

//         return <FormExample />;
//     },
//     parameters: {
//         docs: {
//             description: {
//                 story: "Пример использования в форме с логикой «Выбрать все» и индикатором частичного выбора",
//             },
//         },
//     },
// };

// export const AccessibilityExample: StoryObj<typeof Checkbox> = {
//     name: "Accessibility Features",
//     render: () => (
//         <div>
//             <h4 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Accessibility Features:</h4>

//             <CheckboxYGroup>
//                 <Checkbox id="accessibility-1" aria-describedby="accessibility-1-desc">
//                     Checkbox with description
//                 </Checkbox>
//                 <div id="accessibility-1-desc" style={{ fontSize: 12, color: "#666", marginLeft: 24, marginTop: 4 }}>
//                     This checkbox has an associated description for screen readers
//                 </div>

//                 <Gap size={8} />

//                 <Checkbox required aria-label="Required checkbox without visible label" />
//                 <div style={{ fontSize: 12, color: "#666", marginLeft: 24, marginTop: 4 }}>
//                     Required checkbox without visible label (uses aria-label)
//                 </div>

//                 <Gap size={8} />

//                 <fieldset style={{ border: "1px solid #ccc", padding: 16, borderRadius: 4 }}>
//                     <legend style={{ fontWeight: 600 }}>Grouped options</legend>
//                     <CheckboxYGroup role="group" aria-labelledby="options-legend">
//                         <Checkbox name="options" value="option1">
//                             Option 1
//                         </Checkbox>
//                         <Checkbox name="options" value="option2">
//                             Option 2
//                         </Checkbox>
//                         <Checkbox name="options" value="option3">
//                             Option 3
//                         </Checkbox>
//                     </CheckboxYGroup>
//                 </fieldset>
//             </CheckboxYGroup>
//         </div>
//     ),
//     parameters: {
//         docs: {
//             description: {
//                 story: "Примеры использования возможностей доступности: описания, обязательные поля, группировка",
//             },
//         },
//     },
// };
