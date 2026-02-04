import { describe, it, expect, vi, beforeEach } from "vitest"
import { ProducersEndpoint } from "../../src/endpoints/producers"
import { JikanClient } from "../../src/client"

describe("ProducersEndpoint", () => {
  let client: JikanClient
  let producersEndpoint: ProducersEndpoint

  beforeEach(() => {
    client = new JikanClient()
    producersEndpoint = new ProducersEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get producer by ID with pagination", async () => {
    await producersEndpoint.getById(1, 2, 10)
    expect(client.request).toHaveBeenCalledWith("/producers/1", {
      page: 2,
      limit: 10,
    })
  })

  it("should get all producers with parameters", async () => {
    await producersEndpoint.getAll({ q: "bones", page: 1 })
    expect(client.request).toHaveBeenCalledWith("/producers", {
      q: "bones",
      page: 1,
    })
  })
})
