import { useState } from 'react';
import { User, ChefHat, Calendar, Clock, Plus, Minus, Trash2 } from 'lucide-react';
import React from "react";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function Catering({ cateringMenus }) {
  const [currentPage, setCurrentPage] = useState('packages'); // 'packages', 'catering'
  const [currentStep, setCurrentStep] = useState(1);
  
  const { data, setData, post, processing, errors } = useForm({
    eventName: '',
    date: '',
    time: '',
    place: '',
    contacts: [{ name: '', phone: '', email: '' }],
    menuItems: [],
    specialRequest: ''
  });

  // Simple heuristic: if category name has 'paket', it's a package
  const packages = cateringMenus.filter(m => m.category?.name?.toLowerCase().includes('paket') || m.name.toLowerCase().includes('paket'));
  const aLaCarte = cateringMenus.filter(m => !m.category?.name?.toLowerCase().includes('paket') && !m.name.toLowerCase().includes('paket'));

  const addContact = () => {
    setData('contacts', [...data.contacts, { name: '', phone: '', email: '' }]);
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...data.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setData('contacts', newContacts);
  };

  const updateQuantity = (menu, delta) => {
    const existing = data.menuItems.find(item => item.id === menu.id);
    let newItems = [...data.menuItems];
    
    if (existing) {
      newItems = newItems.map(item => {
        if (item.id === menu.id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    } else if (delta > 0) {
      newItems.push({ ...menu, quantity: delta });
    }
    
    setData('menuItems', newItems);
  };

  const getQuantity = (menuId) => {
    const item = data.menuItems.find(item => item.id === menuId);
    return item ? item.quantity : 0;
  };

  const subtotal = data.menuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      post('/catering', {
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout>
    <Head title="Catering" />
    <div className="size-full bg-[#e5e5e5] overflow-auto min-h-screen">
      
      {/* Catering Packages Page */}
      {currentPage === 'packages' && (
        <div className="p-12 max-w-7xl mx-auto">
          <h1 className="text-5xl text-center text-[#b91c1c] mb-12 font-bold">Pilih Paket Catering</h1>

          {packages.length === 0 && (
            <div className="text-center text-gray-500">Tidak ada paket tersedia saat ini. Silakan lanjut ke custom catering.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200">
                  <img src={pkg.image || "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{pkg.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-red-600">{money(pkg.price)}</span>
                    <button
                      onClick={() => {
                        updateQuantity(pkg, 1);
                        setCurrentPage('catering');
                      }}
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setCurrentPage('catering')}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-full hover:bg-red-50 font-bold"
            >
              Custom Pesanan Lainnya
            </button>
          </div>
        </div>
      )}

      {/* Catering Flow */}
      {currentPage === 'catering' && (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">Catering</h1>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center w-full max-w-3xl">
                {/* Steps 1 to 4 */}
                {[1, 2, 3, 4].map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-colors ${currentStep >= step ? 'bg-red-600 text-white' : 'bg-white text-gray-400'}`}>
                        {step}
                      </div>
                      <span className={`mt-2 text-sm font-medium ${currentStep === step ? 'text-red-600' : 'text-gray-500'}`}>
                        {['Event Details', 'Menu Request', 'My Basket', 'Summary'][index]}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className={`h-1 flex-1 transition-colors ${currentStep > step ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Event Details */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6">
                  <label className="text-left pt-3 font-bold text-gray-700">Nama Acara</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Contoh: Acara Pernikahan / Rapat Kantor"
                      value={data.eventName}
                      onChange={(e) => setData('eventName', e.target.value)}
                      className="p-4 border-2 border-gray-300 rounded-lg w-full focus:border-red-500 focus:ring-red-500"
                      required
                      minLength="3"
                      maxLength="255"
                      pattern="^[a-zA-Z0-9\s\.\,\'\-]+$"
                      title="Nama acara hanya boleh berisi huruf, angka, dan spasi."
                    />
                    {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>}
                  </div>

                  <div className="hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="date" 
                        value={data.date} 
                        onChange={(e) => setData('date', e.target.value)} 
                        className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12 focus:border-red-500 focus:ring-red-500" 
                        required 
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div className="relative">
                      <input 
                        type="time" 
                        value={data.time} 
                        onChange={(e) => setData('time', e.target.value)} 
                        className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12 focus:border-red-500 focus:ring-red-500" 
                        required 
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  <label className="text-left pt-3 font-bold text-gray-700">Tempat Acara</label>
                  <div>
                    <textarea
                      placeholder="Alamat lengkap pengiriman catering"
                      value={data.place}
                      onChange={(e) => setData('place', e.target.value)}
                      className="p-4 border-2 border-gray-300 rounded-lg w-full focus:border-red-500 focus:ring-red-500 min-h-[100px]"
                      required
                      minLength="5"
                      maxLength="1000"
                    />
                    {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place}</p>}
                  </div>

                  <div className="col-span-1 md:col-span-2 border-t border-gray-200 my-4"></div>

                  <label className="text-left pt-3 font-bold text-gray-700">Kontak Person 1*</label>
                  <div className="space-y-6">
                    {data.contacts.map((contact, index) => (
                      <div key={index} className="space-y-4 bg-gray-50 p-4 rounded-xl relative">
                        {index > 0 && (
                          <button type="button" onClick={() => setData('contacts', data.contacts.filter((_, i) => i !== index))} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                          </button>
                        )}
                        {index > 0 && <h4 className="font-bold mb-2">Kontak Person {index + 1}</h4>}
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Nama</label>
                          <input
                            type="text"
                            placeholder="Nama PIC"
                            value={contact.name}
                            onChange={(e) => updateContact(index, 'name', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                            required
                            minLength="3"
                            maxLength="100"
                            pattern="^[a-zA-Z\s\.\,\'\-]+$"
                            title="Nama hanya boleh berisi huruf dan spasi."
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Nomor Telepon (WhatsApp)</label>
                          <input
                            type="tel"
                            placeholder="08123456789"
                            value={contact.phone}
                            onChange={(e) => updateContact(index, 'phone', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                            required
                            minLength="9"
                            maxLength="20"
                            pattern="^\+?[0-9\s\-\(\)]+$"
                            title="Nomor telepon hanya boleh berisi angka, spasi, atau karakter +-()"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1 text-gray-600">Email (Opsional)</label>
                          <input
                            type="email"
                            placeholder="email@example.com"
                            value={contact.email}
                            onChange={(e) => updateContact(index, 'email', e.target.value)}
                            className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-red-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <label className="text-left pt-3 font-bold text-gray-700">Tambah Kontak?</label>
                  <div>
                    <button
                      type="button"
                      onClick={addContact}
                      className="bg-[#f59e0b] text-white px-6 py-3 rounded-full hover:bg-[#d97706] transition font-bold"
                    >
                      + Kontak Person
                    </button>
                  </div>

                  <div className="hidden md:block"></div>
                  <button
                    type="button"
                    onClick={() => {
                        // Basic validation before next
                        if (data.eventName && data.date && data.place && data.contacts[0].name && data.contacts[0].phone) {
                            setCurrentStep(2);
                        } else {
                            alert("Harap lengkapi semua form wajib di halaman ini.");
                        }
                    }}
                    className="bg-red-600 text-white py-4 rounded-full hover:bg-red-700 mt-8 font-bold transition w-full"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Menu Request */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Pilih Menu Catering</h2>
                {errors.menuItems && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">{errors.menuItems}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {cateringMenus.map((item) => (
                    <div key={item.id} className={`bg-white rounded-2xl shadow-md overflow-hidden border-2 transition ${getQuantity(item.id) > 0 ? 'border-red-500' : 'border-transparent'}`}>
                      <div className="h-40 bg-gray-200">
                        <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5 text-center flex flex-col h-[180px]">
                        <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                        <p className="font-bold text-red-600 mb-4 mt-auto">{money(item.price)}</p>
                        
                        <div className="flex items-center justify-center gap-4">
                          <button type="button" onClick={() => updateQuantity(item, -1)} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                            <Minus className="w-5 h-5" />
                          </button>
                          <div className="font-bold text-xl w-12 text-center">{getQuantity(item.id)}</div>
                          <button type="button" onClick={() => updateQuantity(item, 1)} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm">
                  <label className="block font-bold text-gray-700 mb-3">Catatan Khusus / Special Request</label>
                  <textarea
                    placeholder="Contoh: Kurangi rasa pedas, packing khusus, dsb."
                    value={data.specialRequest}
                    onChange={(e) => setData('specialRequest', e.target.value)}
                    className="p-4 border-2 border-gray-300 rounded-lg w-full min-h-[120px] focus:border-red-500"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 border-2 border-red-600 text-red-600 font-bold py-4 rounded-full hover:bg-red-50 transition">
                    Kembali
                  </button>
                  <button type="button" onClick={() => {
                      if (data.menuItems.length === 0) {
                          alert("Pilih minimal 1 menu untuk melanjutkan.");
                          return;
                      }
                      setCurrentStep(3);
                  }} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-full hover:bg-red-700 transition">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: My Basket */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-8 border-b pb-4">Ringkasan Pesanan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6">
                  <label className="text-left font-bold text-gray-600 md:pt-3">Nama Acara</label>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">{data.eventName}</div>

                  <div className="hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between">
                      <span>{data.date}</span>
                      <Calendar className="text-gray-500" size={20} />
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between">
                      <span>{data.time || '-'}</span>
                      <Clock className="text-gray-500" size={20} />
                    </div>
                  </div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Tempat Acara</label>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 whitespace-pre-wrap">{data.place}</div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Kontak Utama</label>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="font-bold">{data.contacts[0].name}</div>
                        <div className="text-gray-600">{data.contacts[0].phone}</div>
                        <div className="text-gray-600">{data.contacts[0].email}</div>
                    </div>
                  </div>

                  <div className="hidden md:block"></div>
                  <div className="text-right">
                    <button type="button" onClick={() => setCurrentStep(1)} className="text-red-600 font-bold hover:underline">Ubah Detail</button>
                  </div>

                  <label className="text-left font-bold text-gray-600 md:pt-3">Daftar Menu</label>
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                    <div className="flex justify-between mb-4 pb-4 border-b-2 border-gray-300 font-bold">
                      <span>Item</span>
                      <span>Total</span>
                    </div>
                    {data.menuItems.map(item => (
                        <div key={item.id} className="flex justify-between mb-3 text-gray-700">
                            <div>
                                <span className="font-bold">{item.quantity}x</span> {item.name}
                                <div className="text-sm text-gray-500 ml-6">@ {money(item.price)}</div>
                            </div>
                            <span className="font-bold">{money(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 border-t-2 border-gray-300 font-bold text-lg mt-4">
                      <span>Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">*Harga belum termasuk pajak dan ongkos kirim.</p>
                  </div>
                  
                  <div className="hidden md:block"></div>
                  <div className="text-right">
                    <button type="button" onClick={() => setCurrentStep(2)} className="text-red-600 font-bold hover:underline">Ubah Menu</button>
                  </div>

                  {data.specialRequest && (
                    <>
                        <label className="text-left font-bold text-gray-600 md:pt-3">Catatan</label>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 whitespace-pre-wrap">{data.specialRequest}</div>
                    </>
                  )}

                  <div className="col-span-1 md:col-span-2 flex gap-4 mt-8">
                    <button type="button" onClick={() => setCurrentStep(2)} className="flex-1 border-2 border-red-600 text-red-600 font-bold py-4 rounded-full hover:bg-red-50 transition">
                      Kembali
                    </button>
                    <button type="submit" disabled={processing} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-full hover:bg-red-700 transition flex items-center justify-center gap-2">
                      {processing ? 'Memproses...' : 'Kirim Pesanan'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Summary (Rendered via page reload with success flash, but kept just in case) */}
            {currentStep === 4 && (
              <div className="bg-white shadow-sm rounded-2xl p-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Terima Kasih Atas Pesanan Anda</h1>
                <p className="text-xl text-gray-600 mb-8">Tim kami akan segera menghubungi Anda untuk konfirmasi pesanan catering.</p>
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <Link href="/" className="inline-block bg-red-600 text-white font-bold px-12 py-4 rounded-full hover:bg-red-700 transition">
                  Kembali ke Beranda
                </Link>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
    </AppLayout>
  );
}