import React, { useState } from "react";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { Gap } from "../../src/components/Gap";
import { EFontType, ETextSize } from "../../src/components/Typography/enums";
import { Text } from "../../src/components/Typography/Text";
import { Link } from "../../src/components/Link";
import { UploadZone } from "../../src/components/UploadZone/UploadZone";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import "./UploadZone.less";
import { HelpBox } from "../../src/components/HelpBox/HelpBox";
import { ETooltipSize } from "../../src/components/Tooltip/enums";

export default {
    title: "Components/UploadZone",
    component: UploadZone,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент зоны загрузки файлов.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Default} />
                </>
            ),
        },
    },
};

export const Default: StoryObj<typeof UploadZone> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [container, setContainer] = useState<HTMLDivElement | null>(null);

        const renderContainerContent = () => (
            <div className="uploadZoneContainerContent">
                <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
                <Gap size={4} />
                <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                    Положите файлы сюда
                </Text>
            </div>
        );

        const handleChange = () => {
            alert("Change handler called.");
        };

        const renderUploadZoneContent = (openUploadDialog) => (
            <div className="uploadZoneContent">
                <UploadZone.Input multiple />
                <Gap size={16} />
                <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
                <Gap size={4} />
                <div>
                    <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                        Перетащите файлы или
                        {"\u00A0"}
                        <Link onClick={openUploadDialog}>выберите на компьютере</Link>
                        {"\u00A0"}
                        <HelpBox tooltipSize={ETooltipSize.SM}>
                            Допустимые форматы файлов: PDF, TIFF, JPEG, PNG, PCX, DOCX.
                        </HelpBox>
                    </Text>
                </div>
                <Gap size={16} />
            </div>
        );
        return (
            <div ref={(node) => setContainer(node)} style={{ display: "flow-root", position: "relative" }}>
                <UploadZone
                    renderContainerContent={renderContainerContent}
                    dropZoneContainer={container}
                    onChange={handleChange}
                >
                    {({ openUploadDialog }) => renderUploadZoneContent(openUploadDialog)}
                </UploadZone>
            </div>
        );
    },
};
