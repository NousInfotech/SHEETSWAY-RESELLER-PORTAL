'use client';

import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { useState, useEffect } from 'react';

export default function ResellerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [defaultOpen, setDefaultOpen] = useState(false);
  
  useEffect(() => {
    // Check for sidebar state in localStorage on client side
    const sidebarState = localStorage.getItem("sidebar_state");
    if (sidebarState === "true") {
      setDefaultOpen(true);
    }
  }, []);
  
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>

    </KBar>
  );
}
