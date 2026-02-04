import { describe, it, expect, vi, beforeEach } from "vitest"
import { SchedulesEndpoint } from "../../src/endpoints/schedules"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the SchedulesEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see SchedulesEndpoint
 */
describe("SchedulesEndpoint", () => {
  let client: JikanClient
  let schedulesEndpoint: SchedulesEndpoint

  beforeEach(() => {
    client = new JikanClient()
    schedulesEndpoint = new SchedulesEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get schedules with parameters", async () => {
    await schedulesEndpoint.getSchedules({ filter: "monday", limit: 10 })
    expect(client.request).toHaveBeenCalledWith("/schedules", {
      filter: "monday",
      limit: 10,
    })
  })
})


