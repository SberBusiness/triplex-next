import React, { useState, useEffect } from "react";
import { LightBox } from "@sber-business/triplex/components/LightBox/LightBox";
import { Button } from "@sber-business/triplex/components/Button/Button";
import { EButtonTheme, EButtonSize } from "@sber-business/triplex/components/Button/enums";
import { Page } from "@sber-business/triplex/components/Page/Page";

const [open, setOpen] = useState(false);
const [selectedTabId, setSelectedTabId] = useState("lightbox-tab-0");

useEffect(() => {
    if (open) {
        document.body.classList.add("dialogOpenExample");
    } else {
        document.body.classList.remove("dialogOpenExample");
    }
}, [open]);

const tabs = [
    { id: "lightbox-tab-0", label: "Tab Name" },
    { id: "lightbox-tab-1", label: "Tab Name" },
    { id: "lightbox-tab-2", label: "Tab Name" },
    { id: "lightbox-tab-3", label: "Tab Name" },
    { id: "lightbox-tab-4", label: "Tab Name" },
    { id: "lightbox-tab-5", label: "Tab Name" },
    { id: "lightbox-tab-6", label: "Tab Name" },
    { id: "lightbox-tab-7", label: "Tab Name" },
    { id: "lightbox-tab-8", label: "Tab Name" },
    { id: "lightbox-tab-9", label: "Tab Name" },
];

const renderLightBox = () => (
    <LightBox>
        <LightBox.Content>{renderPage()}</LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
            </Page.Header.Title>
            <Page.Header.Tabs>
                <Page.Header.Tabs.Content>
                    <Page.Header.Tabs.Content.Tabs
                        tabs={tabs}
                        selectedTabId={selectedTabId}
                        onSelectTab={(id) => setSelectedTabId(id)}
                    />
                </Page.Header.Tabs.Content>
            </Page.Header.Tabs>
        </Page.Header>
        <Page.Body>
            <div>
                Мой дядя самых честных правил,
                <br />
                Когда не в шутку занемог,
                <br />
                Он уважать себя заставил
                <br />
                И лучше выдумать не мог.
                <br />
                Его пример другим наука;
                <br />
                Но, боже мой, какая скука
                <br />
                С больным сидеть и день и ночь,
                <br />
                Не отходя ни шагу прочь!
                <br />
                Какое низкое коварство
                <br />
                Полуживого забавлять,
                <br />
                Ему подушки поправлять,
                <br />
                Печально подносить лекарство,
                <br />
                Вздыхать и думать про себя:
                <br />
                Когда же черт возьмет тебя
            </div>
        </Page.Body>
        <Page.Footer>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
</>