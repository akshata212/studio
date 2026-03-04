
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play } from 'lucide-react';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);
  
  const portfolioItems = useMemo(() => {
    return PlaceHolderImages.filter(img => img.id.startsWith('port-')).map(img => {
      let category = 'other';
      let isVideo = false;
      if (img.id.includes('motion')) {
        category = 'motion-video';
        isVideo = true;
      } else if (img.id.includes('video')) {
        category = 'video';
        isVideo = true;
      } else if (img.id.includes('graphics')) category = 'graphics';
      else if (img.id.includes('thumb')) category = 'thumbnails';
      else if (img.id.includes('podcast')) category = 'podcasts';
      else if (img.id.includes('wedding')) category = 'wedding';

      return {
        id: img.id,
        category,
        title: img.description,
        img: img.imageUrl,
        hint: img.imageHint,
        isVideo,
        // Using a high-quality sample video for demonstration
        videoUrl: isVideo ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : null
      };
    });
  }, []);

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Motion Video', value: 'motion-video' },
    { label: 'Video', value: 'video' },
    { label: 'Graphics', value: 'graphics' },
    { label: 'Thumbnails', value: 'thumbnails' },
    { label: 'Podcasts', value: 'podcasts' },
    { label: 'Wedding', value: 'wedding' },
  ];

  const handleItemClick = (item: typeof portfolioItems[0]) => {
    if (item.isVideo && item.videoUrl) {
      setActiveVideo({ title: item.title, url: item.videoUrl });
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-headline font-extrabold mb-6">Our <span className="text-primary">Portfolio</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Explore our diverse range of creative work across motion, video production, design, and more.
          </p>

          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-12 justify-center">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat.value} 
                  value={cat.value} 
                  className="rounded-full border px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all shadow-sm"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item)}
              className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={800}
                height={1000}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              
              {/* Video Overlay Icon */}
              {item.isVideo && (
                <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
                  <Play size={20} fill="currentColor" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white text-center">
                {item.isVideo && <Play size={48} className="mb-4 text-primary animate-pulse" fill="currentColor" />}
                <h3 className="text-2xl font-headline font-bold mb-2">{item.title}</h3>
                <span className="bg-primary/80 px-4 py-1 rounded-full text-xs uppercase tracking-widest font-bold">
                  {item.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-muted-foreground animate-fade-in-up">
            <p className="text-xl">No projects found in this category yet.</p>
          </div>
        )}
      </div>

      {/* Video Playback Dialog */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-3xl">
          <DialogHeader className="p-6 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
            <DialogTitle className="text-white font-headline text-xl">{activeVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full flex items-center justify-center">
            {activeVideo && (
              <video 
                src={activeVideo.url} 
                controls 
                autoPlay 
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
