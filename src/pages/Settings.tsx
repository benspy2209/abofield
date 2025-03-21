
import React from 'react';
import { ArrowLeft, Database, Key, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Settings = () => {
  const { toast } = useToast();
  const [supabaseUrl, setSupabaseUrl] = React.useState(import.meta.env.VITE_SUPABASE_URL || '');
  const [supabaseKey, setSupabaseKey] = React.useState(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
  
  const saveSettings = () => {
    // Dans un environnement réel, on sauvegarderait ces valeurs de manière sécurisée
    // Pour l'instant, on affiche juste un toast de confirmation
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de configuration ont été mis à jour.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-abofield-blue hover:text-abofield-lightblue mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au site
          </Link>
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Paramètres</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="supabase" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="supabase">Supabase</TabsTrigger>
              <TabsTrigger value="general">Général</TabsTrigger>
            </TabsList>
            
            <TabsContent value="supabase">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Configuration Supabase
                  </CardTitle>
                  <CardDescription>
                    Configurez les informations de connexion à votre projet Supabase.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="supabaseUrl">URL Supabase</Label>
                    <div className="flex">
                      <Input
                        id="supabaseUrl"
                        placeholder="https://votre-projet.supabase.co"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supabaseKey">Clé Anon Supabase</Label>
                    <div className="flex">
                      <Input
                        id="supabaseKey"
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
                        value={supabaseKey}
                        onChange={(e) => setSupabaseKey(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        className="ml-2"
                        onClick={() => {
                          const input = document.getElementById('supabaseKey') as HTMLInputElement;
                          if (input) {
                            input.type = input.type === 'password' ? 'text' : 'password';
                          }
                        }}
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
                    <p className="font-medium mb-1">Instructions de configuration Supabase</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Créez une table <code>images</code> avec les colonnes suivantes :
                        <ul className="list-disc list-inside ml-4 mt-1">
                          <li>id (uuid, clé primaire)</li>
                          <li>name (text, non null)</li>
                          <li>description (text)</li>
                          <li>path (text)</li>
                          <li>type (text, non null)</li>
                          <li>used_in (array de texte)</li>
                          <li>bucket_name (text)</li>
                          <li>file_path (text)</li>
                          <li>created_at (timestamp avec fuseau horaire)</li>
                          <li>updated_at (timestamp avec fuseau horaire)</li>
                        </ul>
                      </li>
                      <li>Créez un bucket de stockage nommé "images"</li>
                      <li>Configurez les politiques RLS appropriées</li>
                    </ol>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-abofield-blue hover:bg-abofield-blue/90" onClick={saveSettings}>
                      <Save className="w-4 h-4 mr-2" /> 
                      Enregistrer les paramètres
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres généraux</CardTitle>
                  <CardDescription>
                    Configurez les paramètres généraux de votre application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 italic">
                    Les paramètres généraux seront disponibles prochainement.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
