'use client';

import { cn } from '@/lib/shadcn/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SettingsNav() {
  return (
    <nav className="w-full">
      <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
        <li>
          <SettingLink href="/settings/general" title="General" />
        </li>
        <li>
          <SettingLink href="/settings/users" title="Users" />
        </li>
        <li>
          <SettingLink href="/settings/integrations" title="Integrations" />
        </li>
      </ul>
    </nav>
  );
}

const SettingLink: React.FC<{ href: string; title: string }> = ({ href, title }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold',
        active
          ? 'bg-gray-50 text-indigo-600'
          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
      )}
    >
      {title}
    </Link>
  );
};
