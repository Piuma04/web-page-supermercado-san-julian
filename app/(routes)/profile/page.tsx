import { fetchUserByEmail } from "@/app/lib/data";
import { auth, signOut } from "@/auth";
import { userRole } from "@prisma/client";
import { LogOut } from "lucide-react";



export default async function Profile(){

    const session  = await auth();
    

    return(
    


        <main>
            {
                
                (session?.user?.role == userRole.ADMIN) 
                ?
                <div>PERFIL ADMIN</div>

                
                :
                <div>PERFIL USER</div>

            }
            <form
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button
                    type="submit"
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                    <span className="block sm:hidden">
                        <LogOut size={20} />
                    </span>
                    <span className="hidden sm:block">
                        Cerrar sesión
                    </span>
                </button>
            </form>
        </main>

    );
}