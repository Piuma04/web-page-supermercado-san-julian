'use client'

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

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
  
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
        
      }}
      {...props}
    >
      <span className="text-sm">Categorias</span>
    </Button>
  )
}