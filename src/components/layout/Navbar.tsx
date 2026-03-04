
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-lg border-b' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <Camera size={24} />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight">
            Pixel<span className="text-primary">Studio</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" className="rounded-full px-6 bg-accent hover:bg-accent/90">
            <Link href="/booking">Book Your Shoot</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[72px] bg-background border-b shadow-xl transition-all duration-300 transform md:hidden flex flex-col items-center gap-6 py-10 z-40',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              'text-xl font-headline font-medium transition-colors hover:text-primary',
              pathname === link.href ? 'text-primary' : 'text-foreground/80'
            )}
          >
            {link.name}
          </Link>
        ))}
        <Button asChild onClick={() => setIsOpen(false)} className="rounded-full px-10 bg-accent hover:bg-accent/90 text-lg py-6 h-auto">
          <Link href="/booking">Book Now</Link>
        </Button>
      </div>
    </nav>
  );
}
