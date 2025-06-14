


import { fetchCategories } from "@/app/lib/data"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


const categories = await fetchCategories()

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
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