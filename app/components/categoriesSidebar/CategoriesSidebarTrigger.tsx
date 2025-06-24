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
      className={`hover:bg-transparent ${className}`}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      
      {...props}
    >
      <Menu className="size-4 lg:size-8" aria-label="Menú" size={32} />
    </Button>
  )
}
