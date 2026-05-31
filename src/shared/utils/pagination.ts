export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<T> {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

export function parsePaginationParams(page?: string, limit?: string): PaginationParams {
  const parsedPage = Math.max(1, Number.parseInt(page || "1", 10))
  const parsedLimit = Math.min(100, Math.max(1, Number.parseInt(limit || "10", 10)))

  return {
    page: parsedPage,
    limit: parsedLimit,
  }
}
