
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface NavMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMobileMenu = ({ isOpen, onClose }: NavMobileMenuProps) => {
  const location = useLocation();
  
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
      <div className="py-4">
        {navLinks.map((link) => (
          <div key={link.title} className="border-b border-gray-100">
            {link.sections.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={link.title} className="border-none">
                  <AccordionTrigger className="py-3 px-6 hover:no-underline">
                    <span className="text-abofield-dark-text">{link.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2 pl-8 pb-2">
                      {link.sections.map((section) => (
                        <Link 
                          key={section.name}
                          to={section.path} 
                          className="py-2 text-gray-600 hover:text-abofield-blue"
                          onClick={onClose}
                        >
                          {section.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link 
                to={link.path} 
                className={cn(
                  "block py-3 px-6 text-abofield-dark-text hover:bg-gray-50",
                  location.pathname === link.path && "text-abofield-blue font-medium"
                )}
                onClick={onClose}
              >
                {link.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavMobileMenu;
