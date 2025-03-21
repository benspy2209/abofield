import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ImageItem {
  id: string;
  name: string;
  path: string;
  usage_locations?: string[];
  description?: string;
  type: 'local' | 'external';
}

const ImageManager = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'all' | 'local' | 'external'>('all');
  const [newImageDialogOpen, setNewImageDialogOpen] = useState(false);
  const [isExternalUrl, setIsExternalUrl] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setImages(data as ImageItem[] || []);
    } catch (error: any) {
      console.error('Error fetching images:', error.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les images. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages = images.filter(image => {
    if (currentView === 'all') return true;
    return image.type === currentView;
  });

  const handleImageSelect = (image: ImageItem) => {
    setSelectedImage(image);
    setNewImage(null);
    setPreviewUrl(null);
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
    if (!selectedImage) return;
    
    setIsUploading(true);
    
    try {
      if (newImage) {
        if (selectedImage.type === 'local') {
          const fileExt = newImage.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const filePath = `/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(fileName, newImage);
          
          if (uploadError) {
            throw uploadError;
          }
          
          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);
          
          const { error: updateError } = await supabase
            .from('images')
            .update({
              path: filePath,
              updated_at: new Date().toISOString(),
            })
            .eq('id', selectedImage.id);
          
          if (updateError) {
            throw updateError;
          }
        }
      }
      
      await fetchImages();
      
      toast({
        title: "Succès",
        description: "L'image a été mise à jour avec succès.",
      });
      
      setNewImage(null);
      setPreviewUrl(null);
      setSelectedImage(null);
    } catch (error: any) {
      console.error('Error updating image:', error.message);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddNewImage = async () => {
    setIsUploading(true);
    
    try {
      if (isExternalUrl) {
        const { error } = await supabase
          .from('images')
          .insert({
            name: newImageName,
            description: newImageDescription,
            path: newImageUrl,
            type: 'external',
            usage_locations: [],
          });
        
        if (error) {
          throw error;
        }
      } else if (newImage) {
        const fileExt = newImage.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, newImage);
        
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        
        const { error } = await supabase
          .from('images')
          .insert({
            name: newImageName || newImage.name,
            description: newImageDescription,
            path: `/${fileName}`,
            type: 'local',
            usage_locations: [],
          });
        
        if (error) {
          throw error;
        }
      }
      
      await fetchImages();
      
      toast({
        title: "Succès",
        description: "L'image a été ajoutée avec succès.",
      });
      
      setNewImageDialogOpen(false);
      setNewImage(null);
      setNewImageUrl('');
      setNewImageName('');
      setNewImageDescription('');
      setIsExternalUrl(false);
      setPreviewUrl(null);
    } catch (error: any) {
      console.error('Error adding image:', error.message);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!selectedImage) return;
    
    try {
      if (selectedImage.type === 'local') {
        const fileName = selectedImage.path.split('/').pop();
        if (fileName) {
          const { error: deleteStorageError } = await supabase.storage
            .from('images')
            .remove([fileName]);
          
          if (deleteStorageError) {
            console.error('Error deleting storage file:', deleteStorageError);
          }
        }
      }
      
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', selectedImage.id);
      
      if (error) {
        throw error;
      }
      
      await fetchImages();
      
      toast({
        title: "Succès",
        description: "L'image a été supprimée avec succès.",
      });
      
      setDeleteDialogOpen(false);
      setSelectedImage(null);
    } catch (error: any) {
      console.error('Error deleting image:', error.message);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleNewImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setNewImageName(file.name.split('.')[0]);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin-dashboard" className="flex items-center text-abofield-blue hover:text-abofield-lightblue">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Gestionnaire d'images</h1>
          <Button 
            onClick={() => setNewImageDialogOpen(true)}
            className="bg-abofield-green hover:bg-abofield-green/90"
          >
            <Upload className="w-4 h-4 mr-2" /> Ajouter une image
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Images du site</h2>
            
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'all' | 'local' | 'external')} className="mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Toutes</TabsTrigger>
                <TabsTrigger value="local" className="flex-1">Locales</TabsTrigger>
                <TabsTrigger value="external" className="flex-1">Externes</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abofield-blue"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {images.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune image trouvée. Ajoutez votre première image en cliquant sur "Ajouter une image".</p>
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
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            {selectedImage ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Modifier l'image: {selectedImage.name}
                  {selectedImage.type === 'external' && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Externe <ExternalLink className="inline ml-1 w-3 h-3" />
                    </span>
                  )}
                </h2>
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
                      <p><span className="font-medium">Description:</span> {selectedImage.description || "Aucune description"}</p>
                      <div>
                        <span className="font-medium">Utilisée dans:</span>
                        {selectedImage.usage_locations && selectedImage.usage_locations.length > 0 ? (
                          <ul className="list-disc list-inside ml-2 mt-1">
                            {selectedImage.usage_locations.map((location, idx) => (
                              <li key={idx}>{location}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ml-2 mt-1 text-gray-500">Non utilisée</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Remplacer l'image</h3>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="image-upload" className="block mb-2 text-sm font-medium">
                        Sélectionner une nouvelle image
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-abofield-blue/10 file:text-abofield-blue
                          hover:file:bg-abofield-blue/20"
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
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setNewImage(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        disabled={!newImage || isUploading}
                        onClick={handleImageUpdate}
                        className="bg-abofield-blue hover:bg-abofield-blue/90"
                      >
                        {isUploading ? "Mise à jour..." : (
                          <>
                            <Upload className="w-4 h-4 mr-2" /> Mettre à jour
                          </>
                        )}
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
                <p className="text-gray-500 max-w-md">
                  Choisissez une image dans la liste à gauche pour la visualiser et la modifier
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={newImageDialogOpen} onOpenChange={setNewImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle image</DialogTitle>
            <DialogDescription>
              Téléchargez une image ou ajoutez une URL externe.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="external-url"
                checked={isExternalUrl}
                onCheckedChange={setIsExternalUrl}
              />
              <Label htmlFor="external-url">URL externe</Label>
            </div>
            
            {isExternalUrl ? (
              <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="image-url">URL de l'image</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                </div>
                
                {newImageUrl && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={newImageUrl} 
                      alt="External preview" 
                      className="w-full h-full object-contain"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="new-image-upload">Fichier image</Label>
                  <Input
                    id="new-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageFileChange}
                    className="cursor-pointer"
                  />
                </div>
                
                {previewUrl && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="File preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="image-name">Nom de l'image</Label>
              <Input
                id="image-name"
                placeholder="Logo Abofield"
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Label htmlFor="image-description">Description (optionnel)</Label>
              <Textarea
                id="image-description"
                placeholder="Description de l'image..."
                value={newImageDescription}
                onChange={(e) => setNewImageDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setNewImageDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleAddNewImage}
              disabled={isUploading || (!newImage && !newImageUrl) || !newImageName}
              className="bg-abofield-green hover:bg-abofield-green/90"
            >
              {isUploading ? "Ajout en cours..." : "Ajouter l'image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleDeleteImage}
              variant="destructive"
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageManager;
