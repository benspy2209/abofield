
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const SiteSettings = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("contact@abofield.be");
  const [phone, setPhone] = useState("+32 123 456 789");
  const [address, setAddress] = useState("123 Rue du Gazon, 1000 Bruxelles");
  const [website, setWebsite] = useState("www.abofield.be");
  const [facebook, setFacebook] = useState("facebook.com/abofield");
  const [instagram, setInstagram] = useState("instagram.com/abofield");
  const [linkedin, setLinkedin] = useState("linkedin.com/company/abofield");

  const handleSave = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres du site ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin-dashboard" className="flex items-center text-abofield-blue hover:text-abofield-lightblue">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Paramètres du site</h1>
          <Button 
            onClick={handleSave}
            className="bg-abofield-green hover:bg-abofield-green/90"
          >
            Enregistrer les paramètres
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Configuration du site</AlertTitle>
            <AlertDescription>
              Personnalisez les informations générales et les coordonnées affichées sur le site.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="contact" className="space-y-4">
            <TabsList className="grid grid-cols-2 gap-2">
              <TabsTrigger value="contact">Informations de contact</TabsTrigger>
              <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Coordonnées</CardTitle>
                  <CardDescription>
                    Les informations de contact affichées sur le site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                      <Input 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                      <Input 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <label htmlFor="website" className="text-sm font-medium">Site web</label>
                      <Input 
                        id="website" 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Réseaux sociaux</CardTitle>
                  <CardDescription>
                    Les liens vers vos réseaux sociaux
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <label htmlFor="facebook" className="text-sm font-medium">Facebook</label>
                      <Input 
                        id="facebook" 
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <div className="flex-1">
                      <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
                      <Input 
                        id="instagram" 
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Linkedin className="h-5 w-5 text-blue-800" />
                    <div className="flex-1">
                      <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</label>
                      <Input 
                        id="linkedin" 
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
