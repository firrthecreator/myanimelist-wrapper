import { describe, it, expect, vi, beforeEach } from "vitest"
import { SchedulesEndpoint } from "../../src/endpoints/schedules"
import { JikanClient } from "../../src/client"

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
