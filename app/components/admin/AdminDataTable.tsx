import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TotalHead from "./TotalHead";

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
              <TableHead className="whitespace-nowrap">Mail</TableHead>
              <TotalHead />
              <TableHead className="whitespace-nowrap">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="max-w-[120px] sm:max-w-[200px] truncate">
                  <span title={purchase.email} className="cursor-help">
                    {purchase.email}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  ${purchase.total}
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
