import React, { useState } from 'react';
import { ArrowLeft, Upload, ExternalLink, Trash2, Plus, Edit, RefreshCw, Check, X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSupabaseImages } from "@/hooks/useSupabaseImages";
import { ImageItem } from "@/types/image";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const ImageManager = () => {
  const { toast } = useToast();
  const { 
    images, 
    loading, 
    error,
    uploadImage,
    updateImage,
    deleteImage,
    updateUsage,
    refreshImages
  } = useSupabaseImages();
  
  const supabaseConfigured = isSupabaseConfigured();
  
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'all' | 'local' | 'external' | 'supabase'>('all');
  const [newUsageLocation, setNewUsageLocation] = useState<string>('');
  const [isAddingNewImage, setIsAddingNewImage] = useState<boolean>(false);
  const [newImageName, setNewImageName] = useState<string>('');
  const [newImageDescription, setNewImageDescription] = useState<string>('');

  const filteredImages = images.filter(image => {
    if (currentView === 'all') return true;
    return image.type === currentView;
  });

  const handleImageSelect = (image: ImageItem) => {
    setSelectedImage(image);
    setNewImage(null);
    setPreviewUrl(null);
    setNewImageName('');
    setNewImageDescription('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageUpdate = async () => {
    if (!selectedImage || !newImage) return;
    
    const success = await updateImage(
      selectedImage.id,
      newImage,
      newImageName || selectedImage.name,
      newImageDescription || selectedImage.description
    );
    
    if (success) {
      setNewImage(null);
      setPreviewUrl(null);
      setSelectedImage(null);
      setNewImageName('');
      setNewImageDescription('');
    }
  };

  const handleImageDelete = async () => {
    if (!selectedImage) return;
    
    const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer l'image "${selectedImage.name}" ?`);
    if (!confirmed) return;
    
    const success = await deleteImage(selectedImage.id);
    
    if (success) {
      setSelectedImage(null);
    }
  };

  const handleAddUsage = async () => {
    if (!selectedImage || !newUsageLocation.trim()) return;
    
    const newUsedIn = [...selectedImage.usedIn, newUsageLocation.trim()];
    const success = await updateUsage(selectedImage.id, newUsedIn);
    
    if (success) {
      setNewUsageLocation('');
    }
  };

  const handleRemoveUsage = async (location: string) => {
    if (!selectedImage) return;
    
    const newUsedIn = selectedImage.usedIn.filter(loc => loc !== location);
    const success = await updateUsage(selectedImage.id, newUsedIn);
    
    if (success && selectedImage) {
      setSelectedImage({
        ...selectedImage,
        usedIn: newUsedIn
      });
    }
  };

  const handleAddNewImage = async () => {
    if (!newImage || !newImageName.trim()) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une image et lui donner un nom.",
        variant: "destructive"
      });
      return;
    }
    
    const result = await uploadImage(
      newImage,
      newImageName.trim(),
      newImageDescription.trim()
    );
    
    if (result) {
      setIsAddingNewImage(false);
      setNewImage(null);
      setPreviewUrl(null);
      setNewImageName('');
      setNewImageDescription('');
    }
  };

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-abofield-blue hover:text-abofield-lightblue mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au site
            </Link>
            <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Gestionnaire d'images</h1>
          </div>
          
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration manquante</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-2">Les variables d'environnement Supabase sont manquantes. Veuillez configurer Supabase pour utiliser le gestionnaire d'images.</p>
              <Link to="/settings">
                <Button variant="outline" className="mt-2">
                  Aller à la configuration
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration requise</h2>
            <p className="mb-4">Pour utiliser le gestionnaire d'images, vous devez configurer les variables d'environnement Supabase :</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>VITE_SUPABASE_URL - L'URL de votre projet Supabase</li>
              <li>VITE_SUPABASE_ANON_KEY - La clé anonyme de votre projet Supabase</li>
            </ul>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">SQL pour la création de la table</h3>
              <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`-- Créer la table images
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  path TEXT,
  type TEXT CHECK (type IN ('local', 'external', 'supabase')),
  bucket_name TEXT,
  file_path TEXT,
  used_in TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer l'extension uuid-ossp si ce n'est pas déjà fait
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Créer une fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer un trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_images_updated_at
BEFORE UPDATE ON images
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Configurer la politique RLS (Row Level Security)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'accès à tous (vous pouvez la restreindre plus tard)
CREATE POLICY "Allow full access to all users" ON images
  FOR ALL
  USING (true)
  WITH CHECK (true);`}
              </pre>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Configuration du bucket de stockage</h3>
              <p className="mb-2">Dans l'interface Supabase, créez un bucket de stockage nommé "images" avec les paramètres suivants :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Nom du bucket : images</li>
                <li>Accès public : Activé</li>
                <li>Politique de téléchargement : Autoriser pour tous les utilisateurs</li>
                <li>Politique de téléchargement depuis le storage : Autoriser pour tous les utilisateurs</li>
              </ul>
            </div>
            
            <Link to="/settings">
              <Button className="bg-abofield-blue hover:bg-abofield-blue/90">
                Configurer Supabase
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin w-8 h-8 mx-auto mb-4 text-abofield-blue" />
          <h2 className="text-xl font-medium">Chargement des images...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
          <X className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-medium mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refreshImages}>
            <RefreshCw className="w-4 h-4 mr-2" /> Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-abofield-blue hover:text-abofield-lightblue mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au site
            </Link>
            <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Gestionnaire d'images</h1>
          </div>
          <Dialog open={isAddingNewImage} onOpenChange={setIsAddingNewImage}>
            <DialogTrigger asChild>
              <Button className="bg-abofield-green hover:bg-abofield-green/90">
                <Plus className="w-4 h-4 mr-2" /> Ajouter une image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle image</DialogTitle>
                <DialogDescription>
                  Téléchargez une nouvelle image pour votre site web.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-image">Sélectionner une image</Label>
                  <Input
                    id="new-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                {previewUrl && (
                  <div className="mt-4">
                    <Label>Aperçu</Label>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mt-2">
                      <img 
                        src={previewUrl} 
                        alt="Aperçu" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="image-name">Nom de l'image</Label>
                  <Input
                    id="image-name"
                    value={newImageName}
                    onChange={(e) => setNewImageName(e.target.value)}
                    placeholder="Nom descriptif de l'image"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image-description">Description (optionnelle)</Label>
                  <Textarea
                    id="image-description"
                    value={newImageDescription}
                    onChange={(e) => setNewImageDescription(e.target.value)}
                    placeholder="Décrivez cette image..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingNewImage(false)}>
                  Annuler
                </Button>
                <Button 
                  disabled={!newImage || !newImageName.trim()} 
                  onClick={handleAddNewImage}
                  className="bg-abofield-blue hover:bg-abofield-blue/90"
                >
                  <Upload className="w-4 h-4 mr-2" /> Télécharger
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Images du site</h2>
            
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'all' | 'local' | 'external' | 'supabase')} className="mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Toutes</TabsTrigger>
                <TabsTrigger value="local" className="flex-1">Locales</TabsTrigger>
                <TabsTrigger value="external" className="flex-1">Externes</TabsTrigger>
                <TabsTrigger value="supabase" className="flex-1">Supabase</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredImages.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-500">
                    {currentView === 'all' 
                      ? 'Aucune image disponible' 
                      : `Aucune image de type ${currentView}`}
                  </h3>
                </div>
              ) : (
                filteredImages.map((image) => (
                  <div 
                    key={image.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedImage?.id === image.id ? 'bg-abofield-blue/10 border border-abofield-blue' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                        {image.path.startsWith('http') ? (
                          <img 
                            src={`${image.path}?w=100&h=100&fit=crop&auto=format`} 
                            alt={image.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src={image.path} 
                            alt={image.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{image.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {image.path.length > 25 
                            ? image.path.substring(0, 25) + '...' 
                            : image.path}
                          {image.type === 'external' && (
                            <ExternalLink className="inline ml-1 w-3 h-3" />
                          )}
                          {image.type === 'supabase' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 ml-1">
                              S
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            {selectedImage ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedImage.name}
                    {selectedImage.type === 'external' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Externe <ExternalLink className="inline ml-1 w-3 h-3" />
                      </span>
                    )}
                    {selectedImage.type === 'supabase' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Supabase
                      </span>
                    )}
                    {selectedImage.type === 'local' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Locale
                      </span>
                    )}
                  </h2>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleImageDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </Button>
                </div>
                
                <div className="mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Image actuelle</h3>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      {selectedImage.path.startsWith('http') ? (
                        <img 
                          src={`${selectedImage.path}?w=800&auto=format`} 
                          alt={selectedImage.name} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img 
                          src={selectedImage.path} 
                          alt={selectedImage.name} 
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    {selectedImage.type === 'external' && (
                      <div className="mt-2 text-sm text-blue-600">
                        <a 
                          href={selectedImage.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:underline"
                        >
                          Voir l'URL originale <ExternalLink className="inline ml-1 w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">Détails</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nom:</span> {selectedImage.name}</p>
                      <p><span className="font-medium">Chemin:</span> {selectedImage.path}</p>
                      <p><span className="font-medium">Description:</span> {selectedImage.description}</p>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Utilisée dans:</span>
                          <div className="flex space-x-2 items-center">
                            <Input
                              value={newUsageLocation}
                              onChange={(e) => setNewUsageLocation(e.target.value)}
                              placeholder="Ajouter un emplacement..."
                              className="text-sm h-8 w-48"
                            />
                            <Button 
                              size="sm"
                              onClick={handleAddUsage}
                              disabled={!newUsageLocation.trim()}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {selectedImage.usedIn.length === 0 ? (
                          <p className="text-gray-500 ml-2 mt-1">Aucun emplacement défini</p>
                        ) : (
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {selectedImage.usedIn.map((location, idx) => (
                              <li key={idx} className="flex justify-between items-center">
                                <span>{location}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                                  onClick={() => handleRemoveUsage(location)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-4">Remplacer l'image</h3>
                    <div className="mb-4">
                      <Label htmlFor="image-upload" className="block mb-2 text-sm font-medium">
                        Sélectionner une nouvelle image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                    </div>
                    
                    {previewUrl && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Aperçu</h4>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <Label htmlFor="updated-name" className="text-sm font-medium">
                          Nouveau nom (optionnel)
                        </Label>
                        <Input
                          id="updated-name"
                          value={newImageName}
                          onChange={(e) => setNewImageName(e.target.value)}
                          placeholder={selectedImage.name}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="updated-description" className="text-sm font-medium">
                          Nouvelle description (optionnelle)
                        </Label>
                        <Textarea
                          id="updated-description"
                          value={newImageDescription}
                          onChange={(e) => setNewImageDescription(e.target.value)}
                          placeholder={selectedImage.description}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setNewImage(null);
                          setPreviewUrl(null);
                          setNewImageName('');
                          setNewImageDescription('');
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        disabled={!newImage}
                        onClick={handleImageUpdate}
                        className="bg-abofield-blue hover:bg-abofield-blue/90"
                      >
                        <Upload className="w-4 h-4 mr-2" /> Mettre à jour
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 rounded-full bg-abofield-blue/10 flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10 text-abofield-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Sélectionnez une image</h3>
                <p className="text-gray-500 max-w-md mb-6">
                  Choisissez une image dans la liste à gauche pour la visualiser et la modifier, ou ajoutez une nouvelle image.
                </p>
                <Button 
                  onClick={() => setIsAddingNewImage(true)}
                  className="bg-abofield-green hover:bg-abofield-green/90"
                >
                  <Plus className="w-4 h-4 mr-2" /> Ajouter une image
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
