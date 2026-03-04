
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Instagram } from 'lucide-react';

export function InstagramGallery() {
  const images = PlaceHolderImages.filter(img => img.id.startsWith('portfolio-')).slice(0, 6);

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
        <Instagram className="text-primary mb-4" size={40} />
        <h2 className="text-3xl font-headline font-bold text-center mb-2">Follow Us on Instagram</h2>
        <p className="text-muted-foreground">@pixelstudio_official</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
        {images.map((img) => (
          <div key={img.id} className="aspect-square relative group cursor-pointer overflow-hidden">
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={img.imageHint}
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white" size={32} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
