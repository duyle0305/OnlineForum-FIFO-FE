export const authKeys = {
    profile: () => ["auth", "profile"],
    userProfile: (id: string) => ["auth", "userProfile", id]
} as const
