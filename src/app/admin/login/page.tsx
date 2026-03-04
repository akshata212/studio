
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Camera, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Valid email is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    // In a real app, integrate Firebase Auth here
    setTimeout(() => {
      if (values.email === 'admin@pixelstudio.com' && values.password === 'password123') {
        toast({ title: 'Login Successful', description: 'Welcome back, Admin.' });
        router.push('/admin/dashboard');
      } else {
        toast({ 
          variant: 'destructive',
          title: 'Login Failed', 
          description: 'Invalid credentials. Please check and try again.' 
        });
      }
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl border-none">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-primary p-4 rounded-3xl text-white mb-6 shadow-lg shadow-primary/20">
            <Camera size={32} />
          </div>
          <h1 className="text-3xl font-headline font-bold">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage PixelStudio</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@pixelstudio.com" {...field} className="rounded-xl h-12 bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="password" {...field} className="rounded-xl h-12 bg-white" />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full rounded-full py-7 h-auto text-lg font-bold">
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
