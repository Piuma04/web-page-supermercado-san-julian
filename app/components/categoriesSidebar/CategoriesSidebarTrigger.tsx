'use client'

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export default function CategoriesSidebarTrigger({
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
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      
      <span className="text-sm hidden sm:inline">Categorías</span>
      <Menu className="sm:hidden" aria-label="Menú" size={28} />
      
    </Button>
  )
}