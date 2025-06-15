import { User, TimestampDetail } from "@/types"

export interface Comment extends TimestampDetail {
    id: string
    title?: string
    body: string
    rating?: number
    user: User
}
