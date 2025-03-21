
import { supabase, getImageUrl } from "@/integrations/supabase/client";

// Type pour l'élément d'image
export interface ImageItem {
  id: string;
  name: string;
  path: string;
  usage_locations?: string[];
  description?: string;
  type: 'local' | 'external';
  created_at?: string;
  updated_at?: string;
}

// Liste des images par défaut de l'application
export const defaultImages = [
  {
    name: "Aire de jeux colorée",
    path: "/jeux.jpg",
    type: "local" as const,
    usage_locations: ["Carte Services (Pleines de jeux)", "Section Playgrounds"],
    description: "Image d'une aire de jeux colorée avec sol amortissant"
  },
  {
    name: "Entretien de revêtement",
    path: "/entretien.jpg",
    type: "local" as const,
    usage_locations: ["Carte Services (Entretien)", "Section Maintenance"],
    description: "Image montrant l'entretien d'un revêtement de sol"
  },
  {
    name: "Terrain de football en gazon synthétique",
    path: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
    type: "external" as const,
    usage_locations: ["Carte Services (Terrains de sports)", "Section Sports (onglet Gazon synthétique)"],
    description: "Vue aérienne d'un terrain de football en gazon synthétique"
  },
  {
    name: "Gazon artificiel vert luxuriant",
    path: "/Gazon artificiel vert luxuriant couvrant une surface lisse.jpg",
    type: "local" as const,
    usage_locations: ["Section About"],
    description: "Gazon artificiel vert luxuriant couvrant une surface lisse"
  },
  {
    name: "Arrière-plan Hero",
    path: "https://images.unsplash.com/photo-1620366392312-a882ba99461c",
    type: "external" as const,
    usage_locations: ["Arrière-plan Hero"],
    description: "Image d'arrière-plan pour la section Hero"
  },
  {
    name: "Terrain multisport",
    path: "https://images.unsplash.com/photo-1468259275264-bbe089c59d1a",
    type: "external" as const,
    usage_locations: ["Section Sports (onglet Multisport)"],
    description: "Terrain multisport extérieur"
  },
  {
    name: "Piste d'athlétisme",
    path: "https://images.unsplash.com/photo-1595231712325-c9626d50b606",
    type: "external" as const,
    usage_locations: ["Section Sports (onglet Piste d'athlétisme)"],
    description: "Piste d'athlétisme rouge"
  },
  {
    name: "ET layer",
    path: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e",
    type: "external" as const,
    usage_locations: ["Section Sports (onglet ET layer)"],
    description: "Image illustrant la sous-couche ET layer"
  },
  {
    name: "Logo Abofield",
    path: "/logo_abofield.jpeg",
    type: "local" as const,
    usage_locations: ["Favicon", "Métadonnées Open Graph", "Barre de navigation"],
    description: "Logo principal de l'entreprise Abofield"
  }
];

/**
 * Récupère toutes les images depuis Supabase
 */
export const fetchAllImages = async (): Promise<ImageItem[]> => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erreur lors de la récupération des images:', error);
      throw error;
    }
    
    return data as ImageItem[];
  } catch (error) {
    console.error('Exception lors de la récupération des images:', error);
    return [];
  }
};

/**
 * Obtient l'URL réelle d'une image à afficher
 */
export const getDisplayImageUrl = (image: ImageItem): string => {
  return getImageUrl(image.path);
};

/**
 * Vérifie si le bucket images existe, sinon le crée
 */
export const checkAndCreateImagesBucket = async (): Promise<boolean> => {
  try {
    // Vérifier si le bucket existe
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Erreur lors de la vérification des buckets:', error);
      return false;
    }
    
    const imagesBucketExists = buckets?.some(bucket => bucket.name === 'images');
    
    if (!imagesBucketExists) {
      console.log('Le bucket images n\'existe pas, tentative de création...');
      
      // Le bucket n'existe pas, le créer
      const { error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (createError) {
        console.error('Erreur lors de la création du bucket:', createError);
        return false;
      }
      
      console.log('Bucket images créé avec succès');
    } else {
      console.log('Le bucket images existe déjà');
    }
    
    return true;
  } catch (error) {
    console.error('Exception lors de la vérification/création du bucket:', error);
    return false;
  }
};

/**
 * Initialise la table d'images avec les images par défaut si nécessaire
 */
export const initializeDefaultImages = async (): Promise<void> => {
  try {
    // Récupérer les images existantes
    const existingImages = await fetchAllImages();
    
    // Pour chaque image par défaut
    for (const defaultImage of defaultImages) {
      // Vérifier si l'image existe déjà (par le chemin)
      const imageExists = existingImages.some(img => img.path === defaultImage.path);
      
      if (!imageExists) {
        console.log(`Ajout de l'image par défaut: ${defaultImage.name}`);
        
        // Ajouter l'image à la base de données
        const { error } = await supabase
          .from('images')
          .insert({
            name: defaultImage.name,
            description: defaultImage.description,
            path: defaultImage.path,
            type: defaultImage.type,
            usage_locations: defaultImage.usage_locations,
          });
        
        if (error) {
          console.error(`Erreur lors de l'ajout de l'image ${defaultImage.name}:`, error);
        }
      }
    }
    
    console.log('Initialisation des images par défaut terminée');
  } catch (error) {
    console.error('Exception lors de l\'initialisation des images par défaut:', error);
  }
};

/**
 * Ajoute une nouvelle image dans la base de données et dans le stockage si nécessaire
 */
export const addNewImage = async (
  file: File | null, 
  imageUrl: string, 
  imageName: string, 
  imageDescription: string, 
  isExternalUrl: boolean
): Promise<boolean> => {
  try {
    if (isExternalUrl) {
      console.log('Ajout d\'une image externe:', imageUrl);
      const { error } = await supabase
        .from('images')
        .insert({
          name: imageName,
          description: imageDescription,
          path: imageUrl,
          type: 'external',
          usage_locations: [],
        });
      
      if (error) {
        console.error('Erreur lors de l\'ajout de l\'image externe:', error);
        return false;
      }
    } else if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      console.log('Téléchargement du fichier vers le stockage:', fileName);
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);
      
      if (uploadError) {
        console.error('Erreur lors du téléchargement:', uploadError);
        return false;
      }
      
      console.log('Ajout de l\'image dans la base de données');
      const { error } = await supabase
        .from('images')
        .insert({
          name: imageName || file.name,
          description: imageDescription,
          path: `/${fileName}`,
          type: 'local',
          usage_locations: [],
        });
      
      if (error) {
        console.error('Erreur lors de l\'ajout de l\'image:', error);
        return false;
      }
    } else {
      console.error('Aucun fichier ou URL fourni');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception lors de l\'ajout de l\'image:', error);
    return false;
  }
};

/**
 * Met à jour une image existante
 */
export const updateImage = async (image: ImageItem, newFile: File | null): Promise<boolean> => {
  try {
    if (!newFile) return false;
    
    if (image.type === 'local') {
      const fileExt = newFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      // Télécharger le nouveau fichier
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, newFile);
      
      if (uploadError) {
        console.error('Erreur lors du téléchargement:', uploadError);
        return false;
      }
      
      // Supprimer l'ancien fichier si possible
      const oldFileName = image.path.split('/').pop();
      if (oldFileName) {
        await supabase.storage
          .from('images')
          .remove([oldFileName]);
      }
      
      // Mettre à jour l'enregistrement dans la base de données
      const { error: updateError } = await supabase
        .from('images')
        .update({
          path: `/${fileName}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', image.id);
      
      if (updateError) {
        console.error('Erreur lors de la mise à jour:', updateError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Exception lors de la mise à jour de l\'image:', error);
    return false;
  }
};

/**
 * Supprime une image
 */
export const deleteImage = async (image: ImageItem): Promise<boolean> => {
  try {
    if (image.type === 'local') {
      const fileName = image.path.split('/').pop();
      if (fileName) {
        console.log('Suppression du fichier du stockage:', fileName);
        const { error: deleteStorageError } = await supabase.storage
          .from('images')
          .remove([fileName]);
        
        if (deleteStorageError) {
          console.error('Erreur lors de la suppression du fichier:', deleteStorageError);
        }
      }
    }
    
    console.log('Suppression de l\'image de la base de données:', image.id);
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', image.id);
    
    if (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception lors de la suppression de l\'image:', error);
    return false;
  }
};
