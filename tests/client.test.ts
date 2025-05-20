import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { JikanClient } from "../src/client";
import { JikanError } from "../src/types/error";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("JikanClient", () => {
    let client: JikanClient;

    beforeEach(() => {
        client = new JikanClient();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should initialize with default options", () => {
        expect(client).toBeDefined();
        expect(client.anime).toBeDefined();
        expect(client.manga).toBeDefined();
        expect(client.characters).toBeDefined();
    });

    it("should initialize with custom options", () => {
        const customClient = new JikanClient({
            baseUrl: "https://custom-api.example.com",
            timeout: 5000,
            headers: { "X-Custom-Header": "value" }
        });

        expect(customClient).toBeDefined();
    });

    it("should make a successful request", async () => {
        const mockResponse = {
            data: { id: 1, title: "Test Anime" }
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await client.request("/anime/1");
        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledTimes(1);

        // Use a more flexible assertion that doesn't care about the exact signal value
        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.jikan.moe/v4/anime/1",
            expect.objectContaining({
                method: "GET",
                headers: { Accept: "application/json" }
                // Don't check the signal property specifically
            })
        );

        // Verify that a signal was passed, but don't check its exact value
        const fetchCall = mockFetch.mock.calls[0][1];
        expect(fetchCall).toHaveProperty("signal");
    });

    it("should handle API errors", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({ message: "Not found" })
        });

        await expect(client.request("/anime/999999")).rejects.toThrow(
            JikanError
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should handle timeout errors", async () => {
        mockFetch.mockImplementationOnce(() => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            throw error;
        });

        await expect(client.request("/anime/1")).rejects.toThrow(
            "Request timeout"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should handle unexpected errors", async () => {
        mockFetch.mockImplementationOnce(() => {
            throw new Error("Network error");
        });

        await expect(client.request("/anime/1")).rejects.toThrow(
            "Network error"
        );
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should append query parameters to the URL", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: [] })
        });

        await client.request("/anime", { q: "naruto", limit: 10 });
        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.jikan.moe/v4/anime?q=naruto&limit=10",
            expect.anything()
        );
    });

    it("should skip null and undefined query parameters", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ data: [] })
        });

        await client.request("/anime", {
            q: "naruto",
            limit: null,
            page: undefined
        });
        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.jikan.moe/v4/anime?q=naruto",
            expect.anything()
        );
    });
});
