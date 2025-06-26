import Link from "next/link";
import { auth, signOut } from "@/auth";
import { User, LogOut, LogIn } from "lucide-react";

export default async function AdministerUserSession() {
    const session = await auth();

    if (session?.user?.email) {
        // Show logout icon on mobile, text on larger screens
        return (
            <Link href="/profile">
                <button
                    type="submit"
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                    <span className="block sm:hidden">
                        <User size={20} />
                    </span>
                    <span className="hidden sm:block">
                        Perfil
                    </span>
                </button>
            </Link>
        );
    }

    // Show user icon on mobile, text on larger screens
    return (
        <Link
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
            href="/login"
        >
            <span className="block sm:hidden">
                <LogIn size={20} />
            </span>
            <span className="hidden sm:block">
                Iniciar sesión
            </span>
        </Link>
    );
}