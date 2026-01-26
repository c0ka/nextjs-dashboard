import {
  formatCurrency,
  formatDateToLocal,
  generateYAxis,
  generatePagination,
  cn,
} from "./utils";

describe("utils", () => {
  describe("formatCurrency", () => {
    it("should format positive amounts correctly", () => {
      expect(formatCurrency(1000)).toBe("$10.00");
      expect(formatCurrency(123456)).toBe("$1,234.56");
    });

    it("should format zero correctly", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should format negative amounts correctly", () => {
      expect(formatCurrency(-500)).toBe("-$5.00");
    });
  });

  describe("formatDateToLocal", () => {
    it("should format date to local string (US default)", () => {
      const date = "2023-11-20";
      // Adjust expectation based on default locale usage in function (en-US)
      expect(formatDateToLocal(date)).toBe("Nov 20, 2023");
    });

    it("should format date with specified locale", () => {
      const date = "2023-11-20";
      expect(formatDateToLocal(date, "en-GB")).toBe("20 Nov 2023");
    });
  });

  describe("generateYAxis", () => {
    it("should generate correct Y-axis labels and top label", () => {
      const revenue = [
        { month: "Jan", revenue: 2000 },
        { month: "Feb", revenue: 3500 },
      ];
      const { yAxisLabels, topLabel } = generateYAxis(revenue);

      expect(topLabel).toBe(4000);
      expect(yAxisLabels).toEqual(["$4K", "$3K", "$2K", "$1K", "$0K"]);
    });

    it("should handle higher values correctly", () => {
      const revenue = [{ month: "Jan", revenue: 12500 }];
      const { yAxisLabels, topLabel } = generateYAxis(revenue);

      expect(topLabel).toBe(13000);
      // Expect 14 labels: 13K down to 0K
      expect(yAxisLabels).toHaveLength(14);
      expect(yAxisLabels[0]).toBe("$13K");
    });
  });

  describe("generatePagination", () => {
    it("should show all pages when total pages is 7 or less", () => {
      expect(generatePagination(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(generatePagination(4, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should show first 3, dots, last 2 when current page is early (< 3)", () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, "...", 9, 10]);
      expect(generatePagination(2, 10)).toEqual([1, 2, 3, "...", 9, 10]);
      expect(generatePagination(3, 10)).toEqual([1, 2, 3, "...", 9, 10]);
    });

    it("should show first 2, dots, last 3 when current page is late (> total - 2)", () => {
      expect(generatePagination(8, 10)).toEqual([1, 2, "...", 8, 9, 10]);
      expect(generatePagination(9, 10)).toEqual([1, 2, "...", 8, 9, 10]);
      expect(generatePagination(10, 10)).toEqual([1, 2, "...", 8, 9, 10]);
    });

    it("should show middle window when current page is in the middle", () => {
      expect(generatePagination(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
    });
  });

  describe("cn", () => {
    it("should merge classes correctly", () => {
      expect(cn("p-4", "bg-red-500")).toBe("p-4 bg-red-500");
    });

    it("should handle conditional classes", () => {
      expect(cn("p-4", true && "text-center", false && "hidden")).toBe(
        "p-4 text-center",
      );
    });

    it("should handle tailwind conflicts", () => {
      expect(cn("p-4 p-8")).toBe("p-8");
    });
  });
});
