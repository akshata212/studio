
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  
  // Real apps would fetch this from Firestore
  const galleryItems = [
    { id: 1, category: 'wedding', title: 'Sarah & Mark', img: 'https://picsum.photos/seed/p1/800/600', hint: 'wedding photography' },
    { id: 2, category: 'maternity', title: 'Glow of Motherhood', img: 'https://picsum.photos/seed/p2/800/1000', hint: 'maternity portrait' },
    { id: 3, category: 'baby', title: 'Little Angel', img: 'https://picsum.photos/seed/p3/600/800', hint: 'baby photo' },
    { id: 4, category: 'wedding', title: 'Beach Ceremony', img: 'https://picsum.photos/seed/p4/1000/700', hint: 'beach wedding' },
    { id: 5, category: 'portrait', title: 'Urban Edge', img: 'https://picsum.photos/seed/p5/800/600', hint: 'fashion urban' },
    { id: 6, category: 'baby', title: 'First Smiles', img: 'https://picsum.photos/seed/p6/800/600', hint: 'newborn smile' },
    { id: 7, category: 'portrait', title: 'Golden Hour', img: 'https://picsum.photos/seed/p7/800/1000', hint: 'sunset portrait' },
    { id: 8, category: 'wedding', title: 'Forest Vows', img: 'https://picsum.photos/seed/p8/800/600', hint: 'forest wedding' },
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-headline font-extrabold mb-6">Our <span className="text-primary">Gallery</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            A curated selection of our most meaningful work. Every picture tells a story of love, joy, and connection.
          </p>

          <Tabs defaultValue="all" className="w-full max-w-2xl mx-auto" onValueChange={setFilter}>
            <TabsList className="grid grid-cols-5 w-full bg-white shadow-sm p-1 h-14 rounded-full">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="wedding" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Wedding</TabsTrigger>
              <TabsTrigger value="maternity" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Maternity</TabsTrigger>
              <TabsTrigger value="baby" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Baby</TabsTrigger>
              <TabsTrigger value="portrait" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Portrait</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <Image
                src={item.img}
                alt={item.title}
                width={800}
                height={1000}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white text-center">
                <h3 className="text-2xl font-headline font-bold mb-2">{item.title}</h3>
                <span className="bg-primary/80 px-4 py-1 rounded-full text-sm uppercase tracking-wider font-bold">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No items found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
