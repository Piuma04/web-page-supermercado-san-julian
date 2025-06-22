

import Link from "next/link";

import { auth, signOut } from "@/auth";


export default async function AdministerUserSession(){

    const session = await auth();

    if (session?.user?.email) {
        //esto es momentaneo, en realidad deberia dar la opcion de acceder al panel de administracion
        return (
            <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
            >
            <button
                type="submit"
                className="text-gray-500 hover:text-gray-700"
            >
                Cerrar sesion
            </button>
            </form>
        );
    }

  

    return(
        <Link className="text-gray-500 hover:text-gray-700" href="/login">
                Iniciar Sesión
        </Link>
    );

}