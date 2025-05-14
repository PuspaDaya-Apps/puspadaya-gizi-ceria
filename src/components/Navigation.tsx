
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navigation = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-primary text-2xl font-bold">Puspadaya</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={cn(navigationMenuTriggerStyle())}>
                  Beranda
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#features" className={cn(navigationMenuTriggerStyle())}>
                  Fitur
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#demo" className={cn(navigationMenuTriggerStyle())}>
                  Demo
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="#download" className={cn(navigationMenuTriggerStyle())}>
                  Download
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/team" className={cn(navigationMenuTriggerStyle())}>
                  Tim Kami
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <Button variant="ghost" size="icon" className="btn-circle">
              <Menu size={24} />
            </Button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li><Link to="/">Beranda</Link></li>
              <li><a href="#features">Fitur</a></li>
              <li><a href="#demo">Demo</a></li>
              <li><a href="#download">Download</a></li>
              <li><Link to="/team">Tim Kami</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
