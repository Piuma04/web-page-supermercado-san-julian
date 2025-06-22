'use client'

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ShoppingCart } from "lucide-react"

export default function CartSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
  
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
        <ShoppingCart className="h-5 w-5" />
    </Button>
  )
}