import { userRole } from "@prisma/client"

declare module 'next-auth' {
    interface Session{

        user: User & {
            role: userRole
        }

    }
}