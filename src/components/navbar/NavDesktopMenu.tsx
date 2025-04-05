
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const NavDesktopMenu = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    {
      title: "Services",
      path: "/services",
      sections: [
        { name: "Aménagement", path: "/services" },
        { name: "Travaux préparatoires", path: "/services" },
        { name: "Systèmes drainants", path: "/services" }
      ]
    },
    {
      title: "Plaines de jeux",
      path: "/playgrounds",
      sections: [
        { name: "Sols amortissants", path: "/playgrounds" },
        { name: "Aires de fitness", path: "/playgrounds" },
        { name: "Espaces récréatifs", path: "/playgrounds" }
      ]
    },
    {
      title: "Terrains de sports",
      path: "/sports",
      sections: [
        { name: "Multisport", path: "/sports" },
        { name: "Gazon synthétique", path: "/sports" },
        { name: "Tennis", path: "/sports" },
        { name: "Padel", path: "/sports" },
        { name: "Piste d'athlétisme", path: "/sports" },
        { name: "Padfield", path: "/sports" }
      ]
    },
    {
      title: "Entretien",
      path: "/maintenance",
      sections: []
    },
    {
      title: "Contact",
      path: "/contact",
      sections: []
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map(link => {
          // Si la page est différente de la page d'accueil ou si le lien n'a pas de sections, utiliser un lien simple
          if (!isHomePage || link.sections.length === 0) {
            return (
              <NavigationMenuItem key={link.title}>
                <Link 
                  to={link.path}
                  className={cn(
                    "px-4 py-2 text-abofield-dark-text hover:text-abofield-blue transition-colors font-medium",
                    location.pathname === link.path && "text-abofield-blue"
                  )}
                >
                  {link.title}
                </Link>
              </NavigationMenuItem>
            );
          }

          // Si on est sur la page d'accueil et que le lien a des sections, utiliser un menu déroulant
          return (
            <NavigationMenuItem key={link.title}>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-abofield-blue data-[state=open]:bg-transparent">
                {link.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  {link.sections.map((section) => (
                    <li key={section.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={section.path}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{section.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavDesktopMenu;
