
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Users, BookOpen, Sparkles, LogOut, Search } from 'lucide-react';
import { adminContentGenerator } from '@/ai/flows/admin-content-generator';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genAiInput, setGenAiInput] = useState({ title: '', details: '', type: 'image' as const });
  const [genAiResult, setGenAiResult] = useState<{ description: string; caption: string } | null>(null);
  const { toast } = useToast();

  const handleLogout = () => {
    window.location.href = '/admin/login';
  };

  const generateContent = async () => {
    if (!genAiInput.title || !genAiInput.details) {
      toast({ variant: 'destructive', title: 'Input required', description: 'Please provide title and details.' });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await adminContentGenerator({
        itemTitle: genAiInput.title,
        itemDetails: genAiInput.details,
        itemType: genAiInput.type
      });
      setGenAiResult(result);
      toast({ title: 'Content Generated', description: 'Your elegant description is ready!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate content.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const stats = [
    { label: 'Pending Bookings', value: '12', color: 'text-primary' },
    { label: 'Completed Shoots', value: '45', color: 'text-secondary' },
    { label: 'New Inquiries', value: '8', color: 'text-accent' },
    { label: 'Total Revenue', value: '₹1,24,500', color: 'text-foreground' }
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r min-h-screen p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-primary p-2 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-headline font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'bookings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('ai-tool')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'ai-tool' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
          >
            <Sparkles size={20} />
            <span className="font-medium">AI Content Tool</span>
          </button>
        </nav>

        <div className="mt-auto pt-40">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-headline font-bold">Welcome back, <span className="text-primary">Admin</span></h1>
              <p className="text-muted-foreground mt-2">Manage your studio operations and booking inquiries.</p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Input placeholder="Search bookings..." className="pl-10 w-64 rounded-full bg-white" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-3xl p-6">
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <h3 className={`text-3xl font-headline font-bold ${stat.color}`}>{stat.value}</h3>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="bookings" className="mt-0">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-white px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-headline">Recent Inquiries</CardTitle>
                      <CardDescription>Manage incoming booking requests from the website.</CardDescription>
                    </div>
                    <Badge variant="outline" className="px-4 py-1 rounded-full">24 Total</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="pl-8">Client</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right pr-8">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: 'Sarah Miller', email: 'sarah@example.com', type: 'Wedding', date: 'Dec 15, 2024', status: 'Pending' },
                        { name: 'James Wilson', email: 'james@example.com', type: 'Portrait', date: 'Nov 22, 2024', status: 'Confirmed' },
                        { name: 'Emma Davis', email: 'emma@example.com', type: 'Maternity', date: 'Dec 05, 2024', status: 'Pending' },
                        { name: 'David Lee', email: 'david@example.com', type: 'Birthday', date: 'Nov 30, 2024', status: 'Cancelled' }
                      ].map((booking, i) => (
                        <TableRow key={i} className="hover:bg-muted/10 transition-colors">
                          <TableCell className="pl-8 font-medium">
                            <div className="flex flex-col">
                              <span>{booking.name}</span>
                              <span className="text-xs text-muted-foreground font-normal">{booking.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="rounded-md">{booking.type}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{booking.date}</TableCell>
                          <TableCell>
                            <Badge className={
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' :
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                              'bg-red-100 text-red-700 hover:bg-red-100'
                            }>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="sm" className="rounded-full text-primary font-bold">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-tool" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-primary" />
                    <h3 className="text-2xl font-headline font-bold">GenAI Content Generator</h3>
                  </div>
                  <p className="text-muted-foreground mb-8">Generate professional descriptions and captions for your portfolio or services.</p>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Item Title</label>
                      <Input 
                        placeholder="e.g. Sunset Wedding at Malibu" 
                        value={genAiInput.title}
                        onChange={(e) => setGenAiInput({...genAiInput, title: e.target.value})}
                        className="rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Details & Mood</label>
                      <Textarea 
                        placeholder="Key emotions, location details, specific highlights..." 
                        value={genAiInput.details}
                        onChange={(e) => setGenAiInput({...genAiInput, details: e.target.value})}
                        className="rounded-xl min-h-[120px]"
                      />
                    </div>
                    <Button 
                      onClick={generateContent} 
                      disabled={isGenerating}
                      className="w-full rounded-full py-6 h-auto text-lg"
                    >
                      {isGenerating ? 'Creating Magic...' : 'Generate Marketing Copy'}
                    </Button>
                  </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl p-8 bg-primary/5">
                  <h3 className="text-2xl font-headline font-bold mb-6">Result</h3>
                  {genAiResult ? (
                    <div className="space-y-8 animate-fade-in-up">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-primary tracking-widest">Full Description</label>
                        <div className="bg-white p-6 rounded-2xl shadow-sm text-muted-foreground leading-relaxed">
                          {genAiResult.description}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-primary tracking-widest">Social Media Caption</label>
                        <div className="bg-white p-6 rounded-2xl shadow-sm font-medium italic">
                          {genAiResult.caption}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full rounded-full" onClick={() => {
                        navigator.clipboard.writeText(genAiResult.description);
                        toast({ title: 'Copied', description: 'Description copied to clipboard.' });
                      }}>
                        Copy Full Content
                      </Button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                      <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                      <p>Generated content will appear here.</p>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
