import { AuthenticatedNav } from './authenticated-nav';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Add redirect to login if not logged in

  return (
    <div className="min-h-full">
      <div className="bg-orange-500 pb-48">
        <AuthenticatedNav />
      </div>

      <main className="-mt-48">{children}</main>
    </div>
  );
}
