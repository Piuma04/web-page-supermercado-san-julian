import { fetchCategories } from "@/app/lib/data"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { 
  ShoppingBag
} from "lucide-react"



export async function CategoriesSidebar() {


  const categories = await fetchCategories()

  return (
    <Sidebar 
      variant="floating" 
      side="left" 
      className="[&_[data-sidebar=sidebar]]:bg-white [&_[data-sidebar=sidebar]]:border-gray-200"
    >
      <SidebarHeader className="bg-red-600 text-white border-b border-red-700">
        <div className="flex items-center gap-3 py-3 px-4">
          <ShoppingBag className="h-5 w-5" />
          <div>
            <h2 className="text-base font-semibold">Categorías</h2>
            
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 text-xs font-medium px-4 py-2">
            Explorar productos
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {categories.map((category) => {
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton 
                      asChild 
                      className="hover:bg-red-50 hover:text-red-700 border-transparent hover:border-red-100 transition-colors duration-200"
                    >
                      <Link 
                        href={`/categories/${category.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 text-gray-700"
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}    
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}