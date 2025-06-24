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
  Tag, 
  ShoppingBag, 
  Apple, 
  Beef, 
  Milk, 
  Cookie, 
  Coffee,
  UtensilsCrossed,
  Package
} from "lucide-react"

const categories = await fetchCategories()

// Icon mapping for supermarket categories
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('fruta') || name.includes('verdura') || name.includes('produce')) return Apple
  if (name.includes('carne') || name.includes('meat') || name.includes('pollo')) return Beef
  if (name.includes('lacteo') || name.includes('dairy') || name.includes('leche')) return Milk
  if (name.includes('panaderia') || name.includes('bakery') || name.includes('pan')) return Cookie
  if (name.includes('bebida') || name.includes('drink') || name.includes('cafe')) return Coffee
  if (name.includes('congelado') || name.includes('frozen') || name.includes('helado')) return Package
  if (name.includes('comida') || name.includes('food') || name.includes('preparada')) return UtensilsCrossed
  return ShoppingBag
}

export function CategoriesSidebar() {
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
            <p className="text-xs text-red-100">Productos por categoría</p>
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
                const IconComponent = getCategoryIcon(category.name)
                
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
                        <IconComponent className="h-4 w-4 text-red-600" />
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