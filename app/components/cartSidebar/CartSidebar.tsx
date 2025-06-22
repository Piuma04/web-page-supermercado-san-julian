

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


const categories =  [
  { id: 1, name: "Technology" },
  { id: 2, name: "Science" },
  { id: 3, name: "Health" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Entertainment" }
]
// const categories = await fetchCategories()

export function CartSidebar() {
  return (
    <Sidebar variant="sidebar" side = "right">
      <SidebarHeader> Categorias </SidebarHeader>
      <SidebarContent>
        <SidebarGroup> 
            <SidebarGroupContent>
                <SidebarMenu>
            {categories.map((category) => (
                 <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/categories/${category.id}`}>
                    
                      <span>{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}    
            </SidebarMenu>

            </SidebarGroupContent>
        </SidebarGroup >
        
      </SidebarContent>
      
    </Sidebar>
  )
}