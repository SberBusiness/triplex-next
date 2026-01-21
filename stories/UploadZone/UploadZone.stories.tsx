import React, { useState } from "react";
import { ArgTypes, Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { StoryObj } from "@storybook/react";
import { Gap } from "../../src/components/Gap";
import { EFontType, ETextSize, Text } from "../../src/components/Typography";
import { Link } from "../../src/components/Link";
import { UploadZone } from "../../src/components/UploadZone";
import {
    DocumentStrokeSrvIcon32,
    AttachmentStrokeSrvIcon20,
    DeleteStrokeSrvIcon20,
    ClouddraguploadStrokeSrvIcon32,
} from "@sberbusiness/icons-next";
import { HelpBox } from "../../src/components/HelpBox";
import { ETooltipSize } from "../../src/components/Tooltip";
import { EVerticalAlign, TableBasic, ITableBasicColumn, ITableBasicRow, ECellType } from "../../src/components/Table";
import { EMarkerStatus } from "../../src/components/Marker";
import { MarkerStatus } from "../../src/components/MarkerStatus";
import { Button, EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import "./UploadZone.less";

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
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={UploadZone} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Default: StoryObj<typeof UploadZone> = {
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
                        Label text
                        {"\u00A0"}
                        <Link onClick={openUploadDialog}>Link text</Link>
                        {"\u00A0"}
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpbox text</HelpBox>
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

export const Examples: StoryObj<typeof UploadZone> = {
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

        const columns: ITableBasicColumn[] = [
            {
                fieldKey: "number",
                width: 38,
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: "logo",
                width: 56,
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: "summary",
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: "status",
                width: 122,
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: "attach",
                width: 64,
                cellType: ECellType.COMPONENTS,
                verticalAlign: EVerticalAlign.TOP,
            },
            {
                fieldKey: "delete",
                width: 64,
                cellType: ECellType.COMPONENTS,
                verticalAlign: EVerticalAlign.TOP,
            },
        ];

        const getData = (): ITableBasicRow[] => {
            const data = [
                {
                    summary: {
                        name: "File name",
                        size: "File size",
                    },
                    status: {
                        status: EMarkerStatus.SUCCESS,
                        text: "Status text",
                        desc: "Description",
                    },
                },
                {
                    summary: {
                        name: "File name",
                        size: "File size",
                    },
                    status: {
                        status: EMarkerStatus.WAITING,
                        text: "Status text",
                        desc: "Description",
                    },
                },
                {
                    summary: {
                        name: "File name",
                        size: "File size",
                    },
                    status: {
                        status: EMarkerStatus.WAITING,
                        text: "Status text",
                        desc: "Description",
                    },
                },
                {
                    summary: {
                        name: "File name",
                        size: "File size",
                    },
                    status: {
                        status: EMarkerStatus.WAITING,
                        text: "Status text",
                        desc: "Description",
                    },
                },
                {
                    summary: {
                        name: "File name",
                        size: "File size",
                    },
                    status: {
                        status: EMarkerStatus.SUCCESS,
                        text: "Status text",
                        desc: "Description",
                    },
                },
            ];

            return data.map((d, i) => {
                const rowNumber = i + 1;

                return {
                    rowKey: String(rowNumber),
                    rowData: {
                        number: String(rowNumber + "."),
                        logo: <DocumentStrokeSrvIcon32 paletteIndex={5} />,
                        summary: (
                            <>
                                <Text size={ETextSize.B3}>{d.summary.name}</Text>
                                <Gap size={4} />
                                <Text type={EFontType.SECONDARY} size={ETextSize.B4}>
                                    {d.summary.size}
                                </Text>
                            </>
                        ),
                        status: (
                            <MarkerStatus status={d.status.status} description={d.status.desc} size={EComponentSize.LG}>
                                {d.status.text}
                            </MarkerStatus>
                        ),
                        attach: (
                            <Button
                                size={EComponentSize.MD}
                                icon={<AttachmentStrokeSrvIcon20 paletteIndex={0} />}
                                theme={EButtonTheme.SECONDARY}
                            />
                        ),
                        delete: (
                            <Button
                                size={EComponentSize.MD}
                                icon={<DeleteStrokeSrvIcon20 paletteIndex={0} />}
                                theme={EButtonTheme.SECONDARY}
                            />
                        ),
                    },
                };
            });
        };

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
                        Label text
                        {"\u00A0"}
                        <Link onClick={openUploadDialog}>Link text</Link>
                        {"\u00A0"}
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpbox text</HelpBox>
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
                <Gap size={16} />
                <TableBasic columns={columns} data={getData()} headless />
            </div>
        );
    },
};
