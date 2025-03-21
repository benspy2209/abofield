
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { isSupabaseConfigured } from "@/lib/supabase";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('VITE_SUPABASE_URL') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('VITE_SUPABASE_ANON_KEY') || '');
  const [saving, setSaving] = useState(false);
  const [configured, setConfigured] = useState(isSupabaseConfigured());
  
  const handleSave = () => {
    try {
      setSaving(true);
      
      if (!supabaseUrl.trim() || !supabaseKey.trim()) {
        toast({
          title: "Erreur de configuration",
          description: "L'URL et la clé Supabase sont requises.",
          variant: "destructive"
        });
        return;
      }
      
      // Save to localStorage (this is a workaround since we can't set env vars at runtime)
      localStorage.setItem('VITE_SUPABASE_URL', supabaseUrl.trim());
      localStorage.setItem('VITE_SUPABASE_ANON_KEY', supabaseKey.trim());
      
      toast({
        title: "Configuration sauvegardée",
        description: "Les paramètres Supabase ont été enregistrés. Veuillez recharger la page pour les appliquer.",
      });
      
      // Set a flag to reload the page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des paramètres:", err);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Supabase</CardTitle>
                <CardDescription>
                  Configurez les paramètres de connexion à votre projet Supabase.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supabase-url">URL Supabase</Label>
                  <Input
                    id="supabase-url"
                    placeholder="https://xxxxxxxxxxxx.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    L'URL de votre projet Supabase (ex: https://xxxxxxxxxxxx.supabase.co)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supabase-key">Clé anonyme (anon key)</Label>
                  <Input
                    id="supabase-key"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    type="password"
                  />
                  <p className="text-sm text-gray-500">
                    La clé anonyme de votre projet Supabase. Vous pouvez la trouver dans les paramètres du projet, section API.
                  </p>
                </div>
                
                <Alert className="mt-4">
                  <AlertDescription>
                    Ces identifiants seront stockés localement dans votre navigateur à l'aide de localStorage. 
                    Pour une application en production, utilisez des variables d'environnement côté serveur.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Annuler
                </Button>
                <Button onClick={handleSave} disabled={saving} className="bg-abofield-blue hover:bg-abofield-blue/90">
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Aide et ressources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Où trouver vos identifiants Supabase</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Connectez-vous à votre compte Supabase</li>
                    <li>Sélectionnez votre projet</li>
                    <li>Allez dans "Paramètres du projet" (icône engrenage)</li>
                    <li>Sélectionnez "API"</li>
                    <li>Les identifiants se trouvent dans la section "Configuration de l'API"</li>
                  </ol>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Configuration de Supabase</h3>
                  <p className="text-sm">
                    Assurez-vous d'avoir créé une table "images" dans votre base de données Supabase, ainsi qu'un bucket de stockage nommé "images".
                  </p>
                  <a 
                    href="https://supabase.com/docs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-abofield-blue hover:text-abofield-lightblue text-sm inline-flex items-center mt-2"
                  >
                    Documentation Supabase
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
