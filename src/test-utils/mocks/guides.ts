import { GuideDto } from "../../modules/guides/dto/guide.dto"
import { Guide } from "../../modules/guides/entities/guide.entity"

export function getGuideMock(overrides: Partial<Guide> = {}): Guide {
  return {
    id: "1",
    name: "Test Guide",
    text: "This is a test guide",
    primaryImages: [],
    contentImages: [],
    cities: [],
    countries: [],
    updatedAt: new Date("2021-01-01T00:00:00Z"),
    createdAt: new Date("2021-01-01T00:00:00Z"),
    deleted: false,
    ...overrides,
  }
}

export function getGuideDtoMock(overrides: Partial<GuideDto> = {}): GuideDto {
  return {
    id: "1",
    name: "Test Guide",
    text: "This is a test guide",
    primaryImages: [],
    contentImages: [],
    cities: [],
    countries: [],
    updatedAt: new Date("2021-01-01T00:00:00Z"),
    createdAt: new Date("2021-01-01T00:00:00Z"),
    deleted: false,
    ...overrides,
  }
}
