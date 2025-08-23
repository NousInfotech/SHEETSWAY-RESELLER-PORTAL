'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle,
  IconSettings,
  IconDashboard,
  IconUsers,
  IconCoins
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Icons } from '@/components/icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { useAuth } from './providers';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

export const company = {
  name: 'SheetSway',
  logo: '/assets/sheetswaylogo.png',
  plan: 'Reseller Portal'
};

const tenants = [
  { id: '1', name: 'SheetSway Inc' },
  { id: '2', name: 'Audit Solutions' },
  { id: '3', name: 'Compliance Hub' }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isOpen } = useMediaQuery();
  const router = useRouter();
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  const handleSignOut = async () => {
    console.log('Sign out clicked'); // Debug log
    try {
      await signOut(auth);
      router.push('/auth/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Theme-based background colors - More subtle for light theme
  const isDark = resolvedTheme === 'dark';
  const headerBg = isDark 
    ? 'bg-black border-slate-800' 
    : 'bg-slate-50 border-slate-200';
  const contentBg = isDark 
    ? 'bg-black' 
    : 'bg-slate-50/80';
  const footerBg = isDark 
    ? 'bg-black border-slate-800' 
    : 'bg-slate-50/80 border-slate-200';

  return (
    <Sidebar collapsible='icon' className="border-r-0 transition-all duration-300 ease-in-out">
      <SidebarHeader className={`${headerBg} border-b transition-all duration-300 ease-in-out`}>
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex items-center justify-center w-10 h-10 bg-[rgb(232_132_12)] rounded-xl shadow-lg">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <div className="flex items-center">
              <Image
                src={company.logo}
                alt="SheetSway Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className={`text-xs font-medium ${isDark ? 'text-[rgb(232_132_12)]' : 'text-slate-600'}`}>Reseller Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className={`${contentBg} overflow-x-hidden transition-all duration-300 ease-in-out`}>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon && Icons[item.icon];
              const isActive = pathname.startsWith(item.url);
              
              if (!Icon) {
                console.warn(`Icon not found for: ${item.icon}`);
                return null;
              }

              return (
                <SidebarMenuButton
                  key={item.title}
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`
                    group relative overflow-hidden transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-[rgb(232_132_12/0.1)] border-l-2 border-[rgb(232_132_12)] text-[rgb(232_132_12)] shadow-sm' 
                      : `${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'}`
                    }
                    rounded-lg mx-2 px-3 py-2.5
                  `}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-[rgb(232_132_12)] text-white shadow-lg' 
                        : `${isDark ? 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/70 group-hover:text-slate-200' : 'bg-slate-200/60 text-slate-600 group-hover:bg-slate-300/80 group-hover:text-slate-700'}`
                      }
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-[rgb(232_132_12)] rounded-full animate-pulse group-data-[collapsible=icon]:hidden" />
                    )}
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Quick Stats Section */}
        <SidebarGroup className="px-3 py-4 group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Quick Stats
          </SidebarGroupLabel>
          <div className="space-y-2">
            <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-700/30 border-slate-600/30' : 'bg-white/80 border-slate-200/60'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Total Earnings</span>
                <span className="text-sm font-semibold text-[rgb(232_132_12)]">$28,450</span>
              </div>
              <div className="mt-1 text-xs text-green-600">+8% this month</div>
            </div>
            <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-700/30 border-slate-600/30' : 'bg-white/80 border-slate-200/60'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Active Links</span>
                <span className="text-sm font-semibold text-blue-600">10</span>
              </div>
              <div className="mt-1 text-xs text-blue-600">+3 new</div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className={`${footerBg} border-t transition-all duration-300 ease-in-out`}>
        <SidebarMenu className="px-3 py-4">
          <SidebarMenuButton 
            asChild 
            tooltip="Settings"
            className={`group relative overflow-hidden transition-all duration-200 ease-in-out rounded-lg mx-2 px-3 py-2.5 ${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'}`}
          >
            <Link href="/reseller/settings" className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${isDark ? 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/70 group-hover:text-slate-200' : 'bg-slate-200/60 text-slate-600 group-hover:bg-slate-300/80 group-hover:text-slate-700'}`}>
                <IconSettings className="w-4 h-4" />
              </div>
              <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>
            </Link>
          </SidebarMenuButton>
          
          {/* User Profile Section */}
          <div className="px-3 py-3 group-data-[collapsible=icon]:hidden">
            <div className={`rounded-lg p-3 border ${isDark ? 'bg-slate-700/30 border-slate-600/30' : 'bg-white/80 border-slate-200/60'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[rgb(232_132_12)] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {user?.email || 'User'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Reseller</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className={`h-8 w-8 p-0 ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-600/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/80'}`}
                >
                  <IconLogout className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
