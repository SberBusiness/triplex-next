import { ETextSize, ECaptionSize, ETitleSize, EFontType, EFontWeightText, EFontWeightTitle, ELineType } from "../enums";

describe("Typography Enums", () => {
    describe("ETextSize", () => {
        it("has correct values", () => {
            expect(ETextSize.B1).toBe("B1");
            expect(ETextSize.B2).toBe("B2");
            expect(ETextSize.B3).toBe("B3");
            expect(ETextSize.B4).toBe("B4");
        });
    });

    describe("ECaptionSize", () => {
        it("has correct values", () => {
            expect(ECaptionSize.C1).toBe("C1");
            expect(ECaptionSize.C2).toBe("C2");
            expect(ECaptionSize.D1).toBe("D1");
        });
    });

    describe("ETitleSize", () => {
        it("has correct values", () => {
            expect(ETitleSize.H1).toBe("H1");
            expect(ETitleSize.H2).toBe("H2");
            expect(ETitleSize.H3).toBe("H3");
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
