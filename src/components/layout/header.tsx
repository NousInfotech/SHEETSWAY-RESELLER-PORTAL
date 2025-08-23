'use client';
import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';

import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import { Bell, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

export default function Header() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Theme-based background colors - More subtle for light theme
  const headerBg = isDark 
    ? 'bg-black border-slate-800' 
    : 'bg-slate-50 border-slate-200';

  return (
    <header className={`sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 transition-all duration-300 ease-in-out group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ${headerBg} border-b shadow-sm`}>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className={`-ml-1 rounded-lg p-1 transition-all duration-200 ease-in-out ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200/80'}`} />
        <Separator orientation='vertical' className={`mr-2 h-4 ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-3 px-4 md:pr-6'>

        
        {/* Action Buttons */}
        <div className='flex items-center gap-2'>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 transition-all duration-200 ease-in-out ${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/80'}`}
            onClick={() => {/* Add notification functionality */}}
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 transition-all duration-200 ease-in-out ${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200/80'}`}
            onClick={() => {/* Add help functionality */}}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          
          <Separator orientation='vertical' className={`h-6 ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
          
          {/* Theme Toggle */}
          <ModeToggle />
          
          <Separator orientation='vertical' className={`h-6 ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
          
          {/* User Navigation */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
