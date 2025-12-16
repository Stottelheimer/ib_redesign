'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, LayoutDashboard, TrendingUp, Gift, Star, Menu, X, Settings, HelpCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuSection {
  label: string;
  items: MenuItem[];
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  href?: string;
}

const menuSections: MenuSection[] = [
  {
    label: 'Analyse',
    items: [
      { label: 'Klicks', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'Angebote', icon: <Gift className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { label: 'idealo Badge', icon: <Star className="w-5 h-5" /> },
      { label: 'Bewertungen', icon: <Star className="w-5 h-5" /> },
    ],
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed left-4 top-4 z-40 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 bg-slate-100 border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-12 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-xs">
              idealo<br />BUSINESS
            </div>
          </div>

          {/* Select Dropdown */}
          <div className="relative">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50 shadow-xs">
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-xs font-semibold">CN</div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs text-slate-500">Text</p>
                <p className="text-sm text-slate-900 truncate">Select an item</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
            </button>
          </div>

          {/* Dashboard Item - Active */}
          <button
            onClick={() => {
              router.push('/');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 h-8 rounded-md transition-colors ${
              pathname === '/'
                ? 'bg-slate-300 hover:bg-slate-400'
                : 'hover:bg-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <span className={`text-sm font-normal ${pathname === '/' ? 'text-slate-700' : 'text-slate-700'}`}>Dashboard</span>
          </button>

          {/* Menu Sections */}
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 px-3 py-1.5 uppercase tracking-wider">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full flex items-center gap-3 px-3 py-2 h-8 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm font-normal text-slate-700">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 p-4 space-y-2">
          {/* Settings */}
          <button
            onClick={() => {
              router.push('/settings');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 h-8 rounded-md transition-colors ${
              pathname === '/settings'
                ? 'bg-slate-300 hover:bg-slate-400'
                : 'hover:bg-slate-200'
            }`}
          >
            <Settings className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <span className={`text-sm font-normal ${pathname === '/settings' ? 'text-slate-700' : 'text-slate-700'}`}>Settings</span>
          </button>

          {/* Get Help */}
          <button className="w-full flex items-center gap-3 px-3 py-2 h-8 rounded-md hover:bg-slate-200 transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0" />
            <span className="text-sm font-normal text-slate-700">Get help</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-xs">
            <img
              src="/avatars/01.png"
              alt="User"
              className="w-5 h-5 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-900 font-medium">shadcn</p>
              <p className="text-xs text-slate-500 truncate">m@example.com</p>
            </div>
            <button className="flex-shrink-0">
              <MoreVertical className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
