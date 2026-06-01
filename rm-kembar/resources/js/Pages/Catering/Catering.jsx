import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Index() {
  const { packages } = usePage().props;

  console.log(packages);


  const getImageUrl = (image) => {
    if (!image) return '/images/default-package.jpg';

    return image.startsWith('http')
      ? image
      : `/storage/${image}`;
  };
// export default function Index({ packages }) {
  
const handleSelectPackage = (packageId) => {
  console.log(packageId);
  router.visit(`/catering/create/${packageId}`);
};

  return (
    <AppLayout>
      <Head title="Pilih Paket Catering" />
      <div className="w-full min-h-screen bg-zinc-100 overflow-auto py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-center text-red-700 mb-12">
            Pilih Paket Catering
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {packages && packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-zinc-200">
                  <img 
                    src={getImageUrl(pkg.image)} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover" 
                  />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-zinc-800 mb-2">{pkg.name}</h3>
                    <p className="text-sm text-zinc-500 line-clamp-3 mb-4">
                      {pkg.description || 'Pilihan menu hidangan lezat berkelas untuk acara spesial Anda.'}
                    </p>
                  </div>
                </div>
                
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-zinc-100">
                  <span className="text-lg font-semibold text-zinc-900">
                    {money(pkg.price)} <span className="text-xs text-zinc-400">/pax</span>
                  </span>
                  <button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition shadow"
                    title="Pilih paket ini"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}