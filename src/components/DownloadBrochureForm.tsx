
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface DownloadBrochureFormProps {
  className?: string;
  buttonText?: string;
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  showIcon?: boolean;
  pdfUrl: string;
}

const DownloadBrochureForm = ({
  className,
  buttonText = "Télécharger la brochure",
  buttonVariant = 'default',
  showIcon = true,
  pdfUrl,
}: DownloadBrochureFormProps) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleDownload = (data: FormValues) => {
    // Here you would typically send the email to your backend
    console.log('Form data submitted:', data);
    
    // Simulate API call delay
    setTimeout(() => {
      // Create a hidden link element to trigger the download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'abofield-brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close dialog and show toast
      setOpen(false);
      form.reset();
      
      toast({
        title: "Téléchargement démarré",
        description: "Merci pour votre intérêt! Votre brochure est en cours de téléchargement.",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          className={className}
        >
          {showIcon && <Download className="w-4 h-4" />}
          <span>{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Télécharger notre brochure</DialogTitle>
          <DialogDescription>
            Complétez le formulaire ci-dessous pour télécharger notre brochure détaillée sur les revêtements de sol amortissant.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDownload)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="votre@email.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" className="bg-abofield-blue hover:bg-abofield-blue/90">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadBrochureForm;
