export const feedbackKeys = {
  all: ['feedbacks'] as const,
  listing: (params: object = {}) => [...feedbackKeys.all, 'listing', params] as const,
}