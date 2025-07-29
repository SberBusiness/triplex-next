import {
    ETextSize,
    ECaptionSize,
    ETitleSize,
    EFontType,
    EFontWeightText,
    EFontWeightTitle,
    ELineType
} from "../enums";

describe("Typography Enums", () => {
    describe("ETextSize", () => {
        it("has correct values", () => {
            expect(ETextSize.B1).toBe(0);
            expect(ETextSize.B2).toBe(1);
            expect(ETextSize.B3).toBe(2);
            expect(ETextSize.B4).toBe(3);
        });
    });

    describe("ECaptionSize", () => {
        it("has correct values", () => {
            expect(ECaptionSize.C1).toBe(0);
            expect(ECaptionSize.C2).toBe(1);
            expect(ECaptionSize.D1).toBe(2);
        });
    });

    describe("ETitleSize", () => {
        it("has correct values", () => {
            expect(ETitleSize.H1).toBe(0);
            expect(ETitleSize.H2).toBe(1);
            expect(ETitleSize.H3).toBe(2);
        });
    });

    describe("EFontType", () => {
        it("has correct string values", () => {
            expect(EFontType.PRIMARY).toBe("primary");
            expect(EFontType.COMPLEMENTARY).toBe("complementary");
            expect(EFontType.SECONDARY).toBe("secondary");
            expect(EFontType.TERTIARY).toBe("tertiary");
            expect(EFontType.DISABLED).toBe("disabled");
            expect(EFontType.BRAND).toBe("brand");
            expect(EFontType.INFO).toBe("info");
            expect(EFontType.SUCCESS).toBe("success");
            expect(EFontType.WARNING).toBe("warning");
            expect(EFontType.ERROR).toBe("error");
        });
    });

    describe("EFontWeightText", () => {
        it("has correct string values", () => {
            expect(EFontWeightText.REGULAR).toBe("regular");
            expect(EFontWeightText.SEMIBOLD).toBe("semibold");
        });
    });

    describe("EFontWeightTitle", () => {
        it("has correct string values", () => {
            expect(EFontWeightTitle.MEDIUM).toBe("medium");
            expect(EFontWeightTitle.REGULAR).toBe("regular");
            expect(EFontWeightTitle.SEMIBOLD).toBe("semibold");
            expect(EFontWeightTitle.BOLD).toBe("bold");
        });
    });

    describe("ELineType", () => {
        it("has correct string values", () => {
            expect(ELineType.NORMAL).toBe("normal");
            expect(ELineType.COMPACT).toBe("compact");
        });
    });
}); 