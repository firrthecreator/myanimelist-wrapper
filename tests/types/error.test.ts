import { describe, it, expect } from "vitest";
import { JikanError } from "../../src/types/error";

describe("JikanError", () => {
    it("should create an error with message and status", () => {
        const error = new JikanError("Not found", 404);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(JikanError);
        expect(error.message).toBe("Not found");
        expect(error.status).toBe(404);
        expect(error.data).toBeUndefined();
    });

    it("should create an error with message, status, and data", () => {
        const errorData = { error: "Resource not found" };
        const error = new JikanError("Not found", 404, errorData);

        expect(error.message).toBe("Not found");
        expect(error.status).toBe(404);
        expect(error.data).toEqual(errorData);
    });

    it("should have the correct name", () => {
        const error = new JikanError("Error", 500);
        expect(error.name).toBe("JikanError");
    });
});
