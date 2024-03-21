import { Card } from '@/components/shadcn/ui/card';
import { SettingsNav } from './settings-nav';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Card className="lg:flex lg:gap-x-16">
          <aside className="flex py-4 px-4 min-w-36 inset-y-0">
            <SettingsNav />
          </aside>

          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20 w-full">
            {children}
          </main>
        </Card>
      </div>
    </>
  );
}
