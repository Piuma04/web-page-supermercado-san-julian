'use client'

import clsx from "clsx";
import { HomeIcon, ImagePlusIcon, ListIcon, PackageSearchIcon, SquareKanbanIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ name: "Home", href: "/admin", icon: HomeIcon },
	{
		name: "Productos",
		href: "/admin/crudProducts",
		icon: PackageSearchIcon,
	},
	{
		name: "Categorias",
		href: "/admin/crudCategories",
		icon: ListIcon,
	},
	{
		name: "Visualización de Datos",
		href: "/admin/datos",
		icon: SquareKanbanIcon,
	},
	{
		name: "CRUD Banners",
		href: "/admin/crudBanners",
		icon: ImagePlusIcon,
	},
];

export default function NavLinks() {
	const pathname = usePathname();
	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700 hover:bg-red-100 hover:text-red-800 md:flex-none md:justify-start md:p-2 md:px-3",
							{
								"bg-red-200 text-red-800 font-bold": pathname === link.href,
							}
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}