'use client';

import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/shadcn/ui/navigation-menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavigationMenuNextLink = ({ href, ...props }: Parameters<typeof Link>[0]) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(typeof href === 'string' ? href : href.pathname ?? '');

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link href={href} className={navigationMenuTriggerStyle()} {...props} />
    </NavigationMenuLink>
  );
};

export function AuthenticatedNav() {
  const router = useRouter();

  return (
    <nav className="border-b border-orange-200 border-opacity-25 bg-orange-500 lg:border-none">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-orange-300 lg:border-opacity-25">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">Test</div>
            <div className="hidden lg:ml-10 lg:block">
              <div className="flex space-x-4">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuNextLink href="/dashboard">Dashboard</NavigationMenuNextLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuNextLink href="/settings">Settings</NavigationMenuNextLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
          {/* Insert hamburger when responsive */}
          <div className="hidden lg:ml-4 lg:block">
            <div className="flex items-center">
              <div className="relative ml-3 flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-8 w-8 text-sm">
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuItem onSelect={() => router.push('/my-account')}>
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        // Do full page routing since its not a page link
                        window.location.href = '/auth/sign-out';
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
