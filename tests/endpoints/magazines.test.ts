import { describe, it, expect, vi, beforeEach } from "vitest"
import { MagazinesEndpoint } from "../../src/endpoints/magazines"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the MagazinesEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see MagazinesEndpoint
 */
describe("MagazinesEndpoint", () => {
  let client: JikanClient
  let magazinesEndpoint: MagazinesEndpoint

  beforeEach(() => {
    client = new JikanClient()
    magazinesEndpoint = new MagazinesEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get magazine by ID with pagination", async () => {
    await magazinesEndpoint.getById(1, 2, 10)
    expect(client.request).toHaveBeenCalledWith("/magazines/1", {
      page: 2,
      limit: 10,
    })
  })

  it("should get all magazines with parameters", async () => {
    await magazinesEndpoint.getAll({ q: "jump", page: 1 })
    expect(client.request).toHaveBeenCalledWith("/magazines", {
      q: "jump",
      page: 1,
    })
  })
})


