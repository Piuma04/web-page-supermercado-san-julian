import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";


export function CreateProduct() {
  return (
    <Link
      href="/admin/crud/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      
      href={`/admin/crud/${id}/update`}
      className="text-red-700 border-red-300 hover:bg-red-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

/*
export function DeleteProduct({ id }: { id: string }) {
   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
     <form action={deleteInvoiceWithId}>
      <button type="submit" className="flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1.5 rounded-xl hover:bg-red-700">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
  */