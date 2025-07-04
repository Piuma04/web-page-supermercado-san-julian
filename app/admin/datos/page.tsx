import { getTotalRevenue } from "@/app/lib/data";


export default async function PageDatos(){



    const totalRevenue = await getTotalRevenue();
    return(
        <h1>Ganacias totales hasta la fecha: {totalRevenue}</h1>
    );
}