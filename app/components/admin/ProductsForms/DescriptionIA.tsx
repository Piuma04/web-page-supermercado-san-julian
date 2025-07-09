import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  setDescription: (desc: string) => void;
};

export default function DescriptionIA({ setDescription }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const handleDescSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const productName = productRef.current?.value || "";
    const category = categoryRef.current?.value || "";

    try {
      const response = await fetch('/api/gemini/generateDescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, category }),
      });

      const data = await response.json();

      if (response.ok) {
        setDescription(data.description);
        setOpen(false); 
      } else {
        setError(data.message || 'Algo salió mal.');
      }
    } catch (err) {
        if (err instanceof Error)
            setError(err.message);
        else
            setError('Error de red.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sugerir descripción IA</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleDescSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Descripción sugerida por IA</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="product">Ingrese el nombre del producto</Label>
              <Input id="product" name="product" ref={productRef} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Ingrese el nombre de la categoría (opcional)</Label>
              <Input id="category" name="category" ref={categoryRef} />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Generando..." : "Sugerir descripción"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}