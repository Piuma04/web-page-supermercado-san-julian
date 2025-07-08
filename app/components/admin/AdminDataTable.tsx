import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TotalHead from "./TotalHead";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";


type Purchase = {
  id: number;
  email: string;
  total: number;
  description: string;
  date: Date;
};

type Props = {
  purchases: Purchase[];
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
};

export default function AdminDataTable({ purchases }: Props) {
  return (
    <div className="p-2 ">
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">ID</TableHead>
              <TableHead className="whitespace-nowrap">Mail</TableHead>
              <TotalHead />
              <TableHead className="whitespace-nowrap">Descripción</TableHead>
              <TableHead className="whitespace-nowrap">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="whitespace-nowrap">{purchase.id}</TableCell>
                <TableCell className=" truncate">
                  <span title={purchase.email} className="cursor-help">
                    {purchase.email}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  ${purchase.total}
                </TableCell>
                <TableCell className="max-w-[180px]">
                    <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Ver Descripción</Button>
                        </DialogTrigger>
                        <DialogContent className="">
                          <DialogTitle>Productos comprados</DialogTitle>
                          {purchase.description.split('\n').map((line, index) => (
                            <p key={index} className="mb-1">{line}</p>
                          ))}
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cerrar</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(purchase.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
