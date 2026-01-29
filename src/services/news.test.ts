import { fetchFilteredNews, fetchNewsPages } from "@/services/news";

describe("News Service", () => {
  it("should fetch news posts (real DB test)", async () => {
    try {
      const news = await fetchFilteredNews("", 1);
      expect(Array.isArray(news)).toBe(true);
    } catch (error) {
      console.error("Service test failed:", error);
      throw error;
    }
  });

  it("should fetch news pages count", async () => {
    try {
      const pages = await fetchNewsPages("");
      expect(typeof pages).toBe("number");
    } catch (error) {
      console.error("Service test failed:", error);
      throw error;
    }
  });
});
