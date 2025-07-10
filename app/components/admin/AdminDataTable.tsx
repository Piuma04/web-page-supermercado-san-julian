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
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import clsx from "clsx";

type Purchase = {
  id: number;
  email: string;
  total: number;
  description: string;
  date: Date;
  status?:string;
};

type Props = {
  purchases: Purchase[];
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export default function AdminDataTable({ purchases }: Props) {
  return (
    <div className="p-2">
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap px-2 sm:px-4">ID</TableHead>
              
              <TableHead className="whitespace-nowrap px-2 sm:px-4 hidden sm:table-cell">Mail</TableHead>
              <TotalHead />
              
              <TableHead className="whitespace-nowrap px-2 sm:px-4 hidden sm:table-cell">Descripción</TableHead>
              <TableHead className="whitespace-nowrap px-2 sm:px-4">Fecha</TableHead>
              <TableHead className="whitespace-nowrap px-2 sm:px-4 hidden sm:table-cell">Estado</TableHead>
              
              <TableHead className="whitespace-nowrap px-2 sm:hidden">Detalles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id} className="hover:bg-gray-50/50">
                <TableCell className="px-2 sm:px-4">{purchase.id}</TableCell>
                
                
                <TableCell className="px-2 sm:px-4 max-w-[120px] sm:max-w-[200px] truncate hidden sm:table-cell">
                  <span title={purchase.email} className="cursor-help">
                    {purchase.email}
                  </span>
                </TableCell>
                
                <TableCell className="px-2 sm:px-4 font-medium">
                  ${purchase.total}
                </TableCell>
                
                
                <TableCell className="px-2 sm:px-4 hidden sm:table-cell">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Ver</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-lg">
                      <DialogTitle>Productos comprados</DialogTitle>
                      <div className="max-h-[60vh] overflow-auto py-2">
                        {purchase.description.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cerrar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                
                <TableCell className="px-2 sm:px-4 text-muted-foreground">
                  {formatDate(purchase.date)}
                </TableCell>
                <TableCell className={clsx("px-2 sm:px-4 hidden sm:table-cell", getStatusClass(purchase.status))}>
                  {getStatusLabel(purchase.status) || "No se encontro estado"}
                </TableCell>
                
                <TableCell className="px-2 sm:hidden">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                        Ver 
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw]">
                      <DialogTitle>Detalles de compra</DialogTitle>
                      <div className="space-y-4 py-2">
                        <div>
                          <h4 className="font-semibold mb-1">Email:</h4>
                          <p className="break-all">{purchase.email}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Estado:</h4>
                          <p className={getStatusClass(purchase.status)}>{getStatusLabel(purchase.status) || "Pendiente"}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Productos comprados:</h4>
                          <div className="max-h-[40vh] overflow-auto border rounded-md p-2 bg-gray-50">
                            {purchase.description.split('\n').map((line, index) => (
                              <p key={index} className="mb-1">{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cerrar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}



function getStatusLabel(status?: string) {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'approved':
      return 'Completado';
    case 'authorized':
      return 'Autorizado';
    case 'in_process':
      return 'En revisión';
    case 'in_mediation':
      return 'En disputa';
    case 'rejected':
      return 'Rechazado';
    case 'cancelled':
      return 'Cancelado';
    case 'refunded':
      return 'Reembolsado';
    case 'charged_back':
      return 'Contracargo';
    default:
      return status;
  }
}

function getStatusClass(status?: string) {
  return clsx('text-large', {
    'text-yellow-700': status === 'pending' || status === 'in_process' || status === 'authorized',
    'text-green-700': status === 'approved',
    'text-blue-700': status === 'in_mediation',
    'text-red-700': status === 'rejected' || status === 'cancelled' || status === 'charged_back',
    'text-gray-700': status === 'refunded' || !status,
  });
}
