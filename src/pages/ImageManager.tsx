
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ImageItem {
  id: string;
  name: string;
  path: string;
  usedIn: string[];
  description: string;
}

const ImageManager = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      name: 'Jeux',
      path: '/jeux.jpg',
      usedIn: ['Services (Pleines de jeux)', 'Playgrounds'],
      description: 'Photo aire de jeux colorée'
    },
    {
      id: '2',
      name: 'Entretien',
      path: '/entretien.jpg',
      usedIn: ['Services (Entretien)', 'Maintenance'],
      description: 'Photo entretien de revêtement'
    },
    {
      id: '3',
      name: 'Gazon',
      path: '/Gazon artificiel vert luxuriant couvrant une surface lisse.jpg',
      usedIn: ['About'],
      description: 'Gazon artificiel vert luxuriant'
    },
    {
      id: '4',
      name: 'Terrain de sport',
      path: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
      usedIn: ['Services (Terrains de sports)'],
      description: 'Terrain de sport'
    }
  ]);
  
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      
      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageUpdate = () => {
    if (!selectedImage || !newImage) return;
    
    // In a real implementation, you would upload the file to your server
    // For now, we'll just simulate the update
    toast({
      title: "Fonctionnalité simulée",
      description: `L'image "${selectedImage.name}" serait remplacée par "${newImage.name}". Dans une implémentation complète avec Supabase, cette image serait téléchargée sur le serveur.`,
    });
    
    // Reset form
    setNewImage(null);
    setPreviewUrl(null);
    setSelectedImage(null);
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Images du site</h2>
            <div className="space-y-4">
              {images.map((image) => (
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
                      <p className="text-sm text-gray-500 truncate">{image.path}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            {selectedImage ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Modifier l'image: {selectedImage.name}</h2>
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
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">Détails</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nom:</span> {selectedImage.name}</p>
                      <p><span className="font-medium">Chemin:</span> {selectedImage.path}</p>
                      <p><span className="font-medium">Description:</span> {selectedImage.description}</p>
                      <div>
                        <span className="font-medium">Utilisée dans:</span>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {selectedImage.usedIn.map((location, idx) => (
                            <li key={idx}>{location}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-4">Remplacer l'image</h3>
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
                <p className="text-gray-500 max-w-md">
                  Choisissez une image dans la liste à gauche pour la visualiser et la modifier
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-abofield-blue/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Prochaines étapes</h2>
          <p className="mb-4">
            Cette interface est une simulation. Pour une fonctionnalité complète de gestion des images, nous devons connecter cette application à Supabase qui fournira :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Un stockage sécurisé pour vos images</li>
            <li>La possibilité de télécharger de nouvelles images</li>
            <li>Une gestion des permissions d'accès</li>
            <li>Des URLs optimisées pour vos images</li>
          </ul>
          <Button className="bg-abofield-green hover:bg-abofield-green/90">
            Configurer Supabase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
