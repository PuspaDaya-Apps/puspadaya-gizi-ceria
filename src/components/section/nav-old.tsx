
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
                    <img
                        src="	https://puspadaya.netlify.app/_next/image?url=%2Fimages%2Flogo%2Flogo-puspa.png&w=256&q=75"
                        alt="Puspadaya Logo"
                        className="h-6 w-auto"
                    />
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
                            <NavigationMenuItem>
                                <button
                                    onClick={() => {
                                        // Simple URL obfuscation using character codes
                                        const urlParts = [112, 117, 115, 112, 97, 100, 97, 121, 97, 46, 110, 101, 116, 108, 105, 102, 121, 46, 97, 112, 112, 47, 97, 117, 116, 104, 47, 115, 105, 103, 110, 105, 110];
                                        const loginUrl = `https://${String.fromCharCode(...urlParts)}`;
                                        window.location.href = loginUrl;
                                    }}
                                    className={cn(navigationMenuTriggerStyle(), "bg-primary text-white hover:bg-blue-700")}
                                >
                                    Login
                                </button>
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
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 mt-4 right-0">
                            <li><Link to="/">Beranda</Link></li>
                            <li><a href="#features">Fitur</a></li>
                            <li><a href="#demo">Demo</a></li>
                            <li><a href="#download">Download</a></li>
                            <li><Link to="/team">Tim Kami</Link></li>
                            <li>
                                <button
                                    onClick={() => {
                                        // Close the dropdown first
                                        const dropdown = document.querySelector('.dropdown');
                                        if (dropdown) {
                                            (dropdown as HTMLElement).classList.remove('dropdown-open');
                                        }

                                        // Simple URL obfuscation using character codes
                                        const urlParts = [112, 117, 115, 112, 97, 100, 97, 121, 97, 46, 110, 101, 116, 108, 105, 102, 121, 46, 97, 112, 112, 47, 97, 117, 116, 104, 47, 115, 105, 103, 110, 105, 110];
                                        const loginUrl = `https://${String.fromCharCode(...urlParts)}`;
                                        window.location.href = loginUrl;
                                    }}
                                    className="text-left"
                                >
                                    Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
