import { describe, it, expect, vi, beforeEach } from "vitest"
import { SeasonsEndpoint } from "../../src/endpoints/seasons"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the SeasonsEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see SeasonsEndpoint
 */
describe("SeasonsEndpoint", () => {
  let client: JikanClient
  let seasonsEndpoint: SeasonsEndpoint

  beforeEach(() => {
    client = new JikanClient()
    seasonsEndpoint = new SeasonsEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get available seasons", async () => {
    await seasonsEndpoint.getList()
    expect(client.request).toHaveBeenCalledWith("/seasons")
  })

  it("should get seasonal anime with parameters", async () => {
    await seasonsEndpoint.getSeason(2024, "spring", { filter: "tv" })
    expect(client.request).toHaveBeenCalledWith("/seasons/2024/spring", {
      filter: "tv",
    })
  })

  it("should get current season anime with parameters", async () => {
    await seasonsEndpoint.getCurrent({ limit: 10 })
    expect(client.request).toHaveBeenCalledWith("/seasons/now", {
      limit: 10,
    })
  })

  it("should get upcoming season anime with parameters", async () => {
    await seasonsEndpoint.getUpcoming({ page: 2 })
    expect(client.request).toHaveBeenCalledWith("/seasons/upcoming", {
      page: 2,
    })
  })
})


