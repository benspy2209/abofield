
import { Link } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContentEditor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [heroTitle, setHeroTitle] = useState("Sécurisant, durable et esthétique");
  const [heroDescription, setHeroDescription] = useState("Le gazon synthétique d'Abofield transforme vos espaces extérieurs");
  
  // Pour une démo simple, on ne sauvegarde pas réellement les données
  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Les modifications ont été sauvegardées avec succès.",
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
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Éditeur de contenu</h1>
          <Button 
            onClick={handleSave}
            className="bg-abofield-green hover:bg-abofield-green/90"
          >
            Enregistrer les modifications
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Gestion du contenu simplifiée</AlertTitle>
            <AlertDescription>
              Modifiez les textes des différentes sections du site pour les adapter à vos besoins.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <TabsTrigger value="hero">Héro</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="playgrounds">Aires de jeux</TabsTrigger>
              <TabsTrigger value="footer">Pied de page</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hero" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Section Héro</CardTitle>
                  <CardDescription>
                    La section principale en haut de la page d'accueil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="hero-title" className="text-sm font-medium">Titre principal</label>
                    <Input 
                      id="hero-title" 
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hero-description" className="text-sm font-medium">Description</label>
                    <Textarea 
                      id="hero-description" 
                      rows={3}
                      value={heroDescription}
                      onChange={(e) => setHeroDescription(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Section Services</CardTitle>
                  <CardDescription>
                    Gérer les services proposés par Abofield
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Fonctionnalité en développement</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>Section À propos</CardTitle>
                  <CardDescription>
                    Modifier les informations sur Abofield
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Fonctionnalité en développement</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="playgrounds">
              <Card>
                <CardHeader>
                  <CardTitle>Section Aires de jeux</CardTitle>
                  <CardDescription>
                    Modifier les informations sur les aires de jeux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Fonctionnalité en développement</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="footer">
              <Card>
                <CardHeader>
                  <CardTitle>Pied de page</CardTitle>
                  <CardDescription>
                    Modifier les informations du pied de page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Fonctionnalité en développement</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
