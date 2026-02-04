import { describe, it, expect, vi, beforeEach } from "vitest"
import { CharactersEndpoint } from "../../src/endpoints/characters"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the CharactersEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see CharactersEndpoint
 */
describe("CharactersEndpoint", () => {
  let client: JikanClient
  let charactersEndpoint: CharactersEndpoint

  beforeEach(() => {
    client = new JikanClient()
    charactersEndpoint = new CharactersEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get character by ID", async () => {
    await charactersEndpoint.getById(1)
    expect(client.request).toHaveBeenCalledWith("/characters/1")
  })

  it("should get character pictures", async () => {
    await charactersEndpoint.getPictures(1)
    expect(client.request).toHaveBeenCalledWith("/characters/1/pictures")
  })

  it("should search for characters with parameters", async () => {
    await charactersEndpoint.search({ q: "naruto", limit: 5 })
    expect(client.request).toHaveBeenCalledWith("/characters", {
      q: "naruto",
      limit: 5,
    })
  })
})


