import { Guide } from "@prisma/client"

export function getGuideMock(overrides: Partial<Guide> = {}): Guide {
  return {
    id: "1",
    name: "Test Guide",
    text: "This is a test guide",
    updatedAt: new Date("2021-01-01T00:00:00Z"),
    createdAt: new Date("2021-01-01T00:00:00Z"),
    deleted: false,
    ...overrides,
  }
}
