'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";


export default function DateOptions(){


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();


    const initialFrom = searchParams.get("from") ? new Date(searchParams.get("from")!) : undefined;
    const initialTo = searchParams.get("to") ? new Date(searchParams.get("to")!) : undefined;

    const [from, setFrom] = useState<Date | undefined>(initialFrom);
    const [to, setTo] = useState<Date | undefined>(initialTo);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const handleSelectFrom = (selectedDate: Date | undefined) => {
        setFrom(selectedDate);
        setOpenFrom(false);

        const params = new URLSearchParams(searchParams.toString());
        if (selectedDate) {
          params.set("from", selectedDate.toISOString());
        } else {
          params.delete("from");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      };

      const handleSelectTo = (selectedDate: Date | undefined) => {
        setTo(selectedDate);
        setOpenTo(false);

        const params = new URLSearchParams(searchParams.toString());
        if (selectedDate) {
          params.set("to", selectedDate.toISOString());
        } else {
          params.delete("to");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      };

    return(
        <div className="flex flex-col mt-3 gap-4">
      <Label htmlFor="from-date" className="px-1">
        Desde
      </Label>
      <Popover open={openFrom} onOpenChange={setOpenFrom}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="from-date"
            className="w-48 justify-between font-normal"
          >
            {from ? from.toLocaleDateString() : "Seleccionar fecha desde"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={from}
            captionLayout="dropdown"
            onSelect={handleSelectFrom}
          />
        </PopoverContent>
      </Popover>

      <Label htmlFor="to-date" className="px-1">
        Hasta
      </Label>
      <Popover open={openTo} onOpenChange={setOpenTo}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="to-date"
            className="w-48 justify-between font-normal"
          >
            {to ? to.toLocaleDateString() : "Seleccionar fecha hasta"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={to}
            captionLayout="dropdown"
            onSelect={handleSelectTo}
          />
        </PopoverContent>
      </Popover>
    </div>
    );
}