import Link from "next/link";
import { auth, signOut } from "@/auth";
import { User, LogOut, LogIn } from "lucide-react";

export default async function AdministerUserSession() {
    const session = await auth();

    if (session?.user?.email) {
        
        return (
            <Link className="flex flex-col items-center justify-center pt-3" href="/profile">
            <span className="block sm:hidden">
                <User size={25} />
            </span>
            <span className="hidden sm:flex flex-col items-center text-sm">
                <User size={25} />
                Perfil
            </span>
            </Link>
        );
    }

 
    return (
        <Link
            className="flex flex-col items-center justify-center pt-3"
            href="/login"
        >
            <span className="block sm:hidden">
                <LogIn size={25} />
            </span>
            <span className="hidden sm:block text-sm text-black">
                Iniciar sesión
            </span>
        </Link>
    );
}