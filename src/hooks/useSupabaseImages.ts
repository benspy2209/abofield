
import { useState, useEffect } from 'react';
import { supabase, getSupabaseImageUrl } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { ImageItem, ImageUploadResponse } from '@/types/image';
import { useToast } from '@/components/ui/use-toast';

export function useSupabaseImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      // Récupérer les images depuis Supabase
      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('*')
        .order('createdAt', { ascending: false });

      if (imagesError) {
        throw imagesError;
      }

      const formattedImages: ImageItem[] = imagesData.map((image: any) => ({
        id: image.id,
        name: image.name,
        description: image.description,
        type: image.type as 'local' | 'external' | 'supabase',
        usedIn: image.used_in || [],
        path: image.type === 'supabase' 
          ? getSupabaseImageUrl(image.bucket_name, image.file_path)
          : image.path,
        bucketName: image.bucket_name,
        filePath: image.file_path,
        createdAt: image.created_at,
        updatedAt: image.updated_at
      }));

      // Charger les images existantes (pour la démo)
      const { data: existingImages, error } = await supabase
        .from('images')
        .select('*');

      if (error) {
        console.error('Erreur lors du chargement des images existantes', error);
      }

      // Si pas d'images dans la base, ajouter les images par défaut
      if (!existingImages || existingImages.length === 0) {
        const defaultImages = [
          {
            id: '1',
            name: 'Jeux',
            path: '/jeux.jpg',
            usedIn: ['Services (Pleines de jeux)', 'Playgrounds'],
            description: 'Photo aire de jeux colorée',
            type: 'local' as 'local' | 'external' | 'supabase',
          },
          {
            id: '2',
            name: 'Entretien',
            path: '/entretien.jpg',
            usedIn: ['Services (Entretien)', 'Maintenance'],
            description: 'Photo entretien de revêtement',
            type: 'local' as 'local' | 'external' | 'supabase',
          },
          {
            id: '3',
            name: 'Gazon',
            path: '/Gazon artificiel vert luxuriant couvrant une surface lisse.jpg',
            usedIn: ['About'],
            description: 'Gazon artificiel vert luxuriant',
            type: 'local' as 'local' | 'external' | 'supabase',
          },
          {
            id: '4',
            name: 'Terrain de sport',
            path: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
            usedIn: ['Services (Terrains de sports)', 'Sports (Gazon synthétique)'],
            description: 'Terrain de sport avec gazon synthétique',
            type: 'external' as 'local' | 'external' | 'supabase',
          },
          {
            id: '5',
            name: 'Hero background',
            path: 'https://images.unsplash.com/photo-1620366392312-a882ba99461c',
            usedIn: ['Hero (arrière-plan)'],
            description: 'Image d\'arrière-plan de la section Hero',
            type: 'external' as 'local' | 'external' | 'supabase',
          },
          {
            id: '6',
            name: 'Multisport',
            path: 'https://images.unsplash.com/photo-1468259275264-bbe089c59d1a',
            usedIn: ['Sports (Multisport)'],
            description: 'Terrain multisport',
            type: 'external' as 'local' | 'external' | 'supabase',
          },
          {
            id: '7',
            name: 'Piste d\'athlétisme',
            path: 'https://images.unsplash.com/photo-1595231712325-c9626d50b606',
            usedIn: ['Sports (Piste d\'athlétisme)'],
            description: 'Piste d\'athlétisme',
            type: 'external' as 'local' | 'external' | 'supabase',
          },
          {
            id: '8',
            name: 'ET layer',
            path: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e',
            usedIn: ['Sports (ET layer)'],
            description: 'Sous-couche ET layer',
            type: 'external' as 'local' | 'external' | 'supabase',
          },
          {
            id: '9',
            name: 'Logo Abofield',
            path: '/logo_abofield.jpeg',
            usedIn: ['Favicon', 'Métadonnées Open Graph'],
            description: 'Logo d\'Abofield',
            type: 'local' as 'local' | 'external' | 'supabase',
          }
        ];

        // Insérer les images par défaut dans Supabase
        for (const image of defaultImages) {
          await supabase.from('images').insert({
            id: image.id,
            name: image.name,
            path: image.path,
            description: image.description,
            type: image.type,
            used_in: image.usedIn,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }

        formattedImages.push(...defaultImages);
      }

      setImages(formattedImages);
    } catch (err: any) {
      console.error('Erreur lors du chargement des images:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, imageName: string, description: string = ''): Promise<ImageUploadResponse | null> => {
    try {
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const bucketName = 'images';
      const filePath = `${fileName}`;

      // Upload de l'image au stockage Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Insérer les métadonnées de l'image dans la table images
      const { data: imageData, error: insertError } = await supabase
        .from('images')
        .insert({
          name: imageName || file.name,
          description: description,
          type: 'supabase',
          bucket_name: bucketName,
          file_path: filePath,
          used_in: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      const fullPath = getSupabaseImageUrl(bucketName, filePath);

      // Rafraîchir la liste des images
      await fetchImages();

      toast({
        title: "Image téléchargée avec succès",
        description: `L'image ${imageName || file.name} a été téléchargée.`,
      });

      return {
        path: filePath,
        id: imageData.id,
        fullPath
      };
    } catch (err: any) {
      console.error('Erreur lors du téléchargement de l\'image:', err);
      toast({
        title: "Erreur lors du téléchargement",
        description: err.message || "Une erreur est survenue lors du téléchargement de l'image.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateImage = async (id: string, file: File, imageName: string, description: string): Promise<boolean> => {
    try {
      // Récupérer les infos de l'image existante
      const { data: existingImage, error: fetchError } = await supabase
        .from('images')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      let bucketName = existingImage.bucket_name;
      let filePath = existingImage.file_path;
      let type = existingImage.type;

      // Si c'est une image Supabase, mettre à jour le fichier physique
      if (type === 'supabase' && bucketName && filePath) {
        // Supprimer l'ancien fichier
        await supabase.storage.from(bucketName).remove([filePath]);

        // Créer un nouveau nom de fichier
        const fileExt = file.name.split('.').pop();
        filePath = `${uuidv4()}.${fileExt}`;

        // Upload du nouveau fichier
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
      } else if (type === 'local' || type === 'external') {
        // Si c'est une image locale ou externe, la convertir en type supabase
        bucketName = 'images';
        const fileExt = file.name.split('.').pop();
        filePath = `${uuidv4()}.${fileExt}`;
        type = 'supabase';

        // Upload du nouveau fichier
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
      }

      // Mettre à jour les métadonnées
      const { error: updateError } = await supabase
        .from('images')
        .update({
          name: imageName,
          description: description,
          type: type,
          bucket_name: bucketName,
          file_path: filePath,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      // Rafraîchir la liste des images
      await fetchImages();

      toast({
        title: "Image mise à jour",
        description: `L'image ${imageName} a été mise à jour avec succès.`,
      });

      return true;
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour de l\'image:', err);
      toast({
        title: "Erreur lors de la mise à jour",
        description: err.message || "Une erreur est survenue lors de la mise à jour de l'image.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteImage = async (id: string): Promise<boolean> => {
    try {
      // Récupérer les infos de l'image
      const { data: image, error: fetchError } = await supabase
        .from('images')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Si c'est une image Supabase, supprimer le fichier physique
      if (image.type === 'supabase' && image.bucket_name && image.file_path) {
        const { error: deleteFileError } = await supabase.storage
          .from(image.bucket_name)
          .remove([image.file_path]);

        if (deleteFileError) {
          console.error('Erreur lors de la suppression du fichier:', deleteFileError);
          // Continuer malgré l'erreur pour supprimer au moins l'entrée de la base
        }
      }

      // Supprimer l'entrée de la base de données
      const { error: deleteError } = await supabase
        .from('images')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Rafraîchir la liste des images
      setImages(images.filter(img => img.id !== id));

      toast({
        title: "Image supprimée",
        description: `L'image a été supprimée avec succès.`,
      });

      return true;
    } catch (err: any) {
      console.error('Erreur lors de la suppression de l\'image:', err);
      toast({
        title: "Erreur lors de la suppression",
        description: err.message || "Une erreur est survenue lors de la suppression de l'image.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateUsage = async (id: string, usedIn: string[]): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('images')
        .update({
          used_in: usedIn,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Mettre à jour l'état local
      setImages(images.map(img => 
        img.id === id ? { ...img, usedIn } : img
      ));

      toast({
        title: "Utilisation mise à jour",
        description: `Les informations d'utilisation de l'image ont été mises à jour.`,
      });

      return true;
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour des utilisations:', err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    updateImage,
    deleteImage,
    updateUsage,
    refreshImages: fetchImages
  };
}
