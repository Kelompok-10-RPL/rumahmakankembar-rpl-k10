import { useState } from 'react';
import { User, ChefHat, Calendar, Clock, Plus } from 'lucide-react';
import React from "react";
import { Head, Link, router } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';


export default function App() {
  const [currentPage, setCurrentPage] = useState('packages'); // 'packages', 'catering'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    place: '',
    contacts: [{ name: '', phone: '', email: '' }],
    menuItems: [],
    specialRequest: ''
  });

  const packages = [
    { id: 1, name: 'Paket ayam', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop' },
    { id: 2, name: 'Paket Rendang', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=400&h=300&fit=crop' },
    { id: 3, name: 'Paket Ikan', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1580959375944-1ab5b8c7e5f0?w=400&h=300&fit=crop' },
    { id: 4, name: 'Paket Empal', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop' },
    { id: 5, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
    { id: 6, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
    { id: 7, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop' },
    { id: 8, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' }
  ];

  const menuItems = [
    { id: 1, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=200&fit=crop' },
    { id: 2, name: 'XXXXX', price: 'RpXXXXX', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop' }
  ];

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { name: '', phone: '', email: '' }]
    });
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setFormData({ ...formData, contacts: newContacts });
  };

  const addMenuItem = (item) => {
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, { ...item, quantity: 1 }]
    });
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...formData.menuItems];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + delta);
    setFormData({ ...formData, menuItems: newItems.filter(item => item.quantity > 0) });
  };

  return (
    <AppLayout>
    <div className="size-full bg-[#e5e5e5] overflow-auto">
      {/* Top Navbar */}
      
      {/* Catering Packages Page */}
      {currentPage === 'packages' && (
        <div className="p-12 max-w-7xl mx-auto">
          <h1 className="text-5xl text-center text-[#b91c1c] mb-12">Pilih Paket Catering</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 bg-[#d4b5b5]">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2">{pkg.name}</h3>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{pkg.price}</span>
                    <button
                      onClick={() => setCurrentPage('catering')}
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catering Flow */}
      {currentPage === 'catering' && (
        <div className="p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl text-center mb-8">Catering</h1>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center w-full max-w-3xl">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-red-600' : 'bg-gray-300'}`}>
                    <span className="text-white">1</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep === 1 ? 'text-red-600' : 'text-gray-400'}`}>Event Details</span>
                </div>
                <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}></div>

                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}>
                    <span className="text-white">2</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep === 2 ? 'text-red-600' : 'text-gray-400'}`}>Menu Request</span>
                </div>
                <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-300'}`}></div>

                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-300'}`}>
                    <span className="text-white">3</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep === 3 ? 'text-red-600' : 'text-gray-400'}`}>My Basket</span>
                </div>
                <div className={`h-1 flex-1 ${currentStep >= 4 ? 'bg-red-600' : 'bg-gray-300'}`}></div>

                {/* Step 4 */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-red-600' : 'bg-gray-300'}`}>
                    <span className="text-white">4</span>
                  </div>
                  <span className={`mt-2 text-sm ${currentStep === 4 ? 'text-red-600' : 'text-gray-400'}`}>Summary</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="grid grid-cols-[200px_1fr] gap-x-8 gap-y-6">
              <label className="text-left pt-3">Catering</label>
              <input
                type="text"
                placeholder="Event Name"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="p-4 border-2 border-gray-300 rounded-lg"
              />

              <div></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="text" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12" />
                  <Calendar className="absolute right-4 top-4 text-gray-600" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="p-4 border-2 border-gray-300 rounded-lg w-full pr-12" />
                  <Clock className="absolute right-4 top-4 text-gray-600" />
                </div>
              </div>

              <label className="text-left pt-3">Place of Event</label>
              <input
                type="text"
                placeholder="Place of Event"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="p-4 border-2 border-gray-300 rounded-lg"
              />

              <label className="text-left pt-3">Contact Person 1*</label>
              <div className="space-y-4">
                {formData.contacts.map((contact, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={contact.name}
                        onChange={(e) => updateContact(index, 'name', e.target.value)}
                        className="p-4 border-2 border-gray-300 rounded-lg w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Phone</label>
                      <input
                        type="text"
                        placeholder="Phone"
                        value={contact.phone}
                        onChange={(e) => updateContact(index, 'phone', e.target.value)}
                        className="p-4 border-2 border-gray-300 rounded-lg w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={contact.email}
                        onChange={(e) => updateContact(index, 'email', e.target.value)}
                        className="p-4 border-2 border-gray-300 rounded-lg w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <label className="text-left pt-3">Contact Person 2</label>
              <button
                onClick={addContact}
                className="bg-[#f59e0b] text-white px-6 py-3 rounded-full hover:bg-[#d97706] w-fit"
              >
                + Add
              </button>

              <div></div>
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-red-600 text-white py-4 rounded-full hover:bg-red-700 mt-8"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Menu Request */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl mb-6">Large Order Menus</h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-48 bg-[#d4b5b5]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl mb-2">{item.name}</h3>
                      <p className="text-lg mb-4">{item.price}</p>
                      <div className="flex items-center justify-center gap-4">
                        <button onClick={() => {}} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <Plus className="w-6 h-6" />
                        </button>
                        <div className="bg-gray-500 text-white px-8 py-2 rounded-full min-w-[100px]">0</div>
                        <button onClick={() => {}} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-lg mb-2">Special Request</label>
                <textarea
                  placeholder="e.g. xxxxxx"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className="p-4 border-2 border-gray-300 rounded-lg w-full h-32"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setCurrentStep(1)} className="flex-1 border-2 border-red-600 text-red-600 py-4 rounded-full hover:bg-red-50">
                  Prev
                </button>
                <button onClick={() => setCurrentStep(3)} className="flex-1 bg-red-600 text-white py-4 rounded-full hover:bg-red-700">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: My Basket */}
          {currentStep === 3 && (
            <div className="grid grid-cols-[200px_1fr] gap-x-8 gap-y-6">
              <label className="text-left pt-3">Catering</label>
              <input type="text" value="xxxxxxxxxx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100" />

              <div></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="text" value="xx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full pr-12" />
                  <Calendar className="absolute right-4 top-4 text-gray-600" />
                </div>
                <div className="relative">
                  <input type="text" value="xx:xx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full pr-12" />
                  <Clock className="absolute right-4 top-4 text-gray-600" />
                </div>
              </div>

              <label className="text-left pt-3">Place of Event</label>
              <input type="text" value="xxxxxxxxxxxx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100" />

              <label className="text-left pt-3">Contact Person 1</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input type="text" value="xxxxxxxxxxxx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone</label>
                  <input type="text" value="xxxxxxxxxxxx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input type="text" value="xxxxxxxxxxxx" readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full" />
                </div>
              </div>

              <div></div>
              <div className="text-right mb-4">
                <button className="text-red-600 hover:underline">Change Order</button>
              </div>

              <div></div>
              <div className="bg-gray-200 p-6 rounded-lg">
                <div className="flex justify-between mb-4 pb-4 border-b-2 border-gray-400">
                  <span>Order Item(s)</span>
                  <span>Price</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>xxxxxxxxxxx</span>
                  <span>Rp.xxxxxxxxx</span>
                </div>
                <div className="flex justify-between pt-4 border-t-2 border-gray-400">
                  <span>Subtotal</span>
                  <span>Rp.xxxxxxxxx</span>
                </div>
              </div>

              <label className="text-left pt-3">Special Request</label>
              <textarea readOnly className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 w-full h-32"></textarea>

              <div></div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setCurrentStep(2)} className="flex-1 border-2 border-red-600 text-red-600 py-4 rounded-full hover:bg-red-50">
                  Prev
                </button>
                <button onClick={() => setCurrentStep(4)} className="flex-1 bg-red-600 text-white py-4 rounded-full hover:bg-red-700">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="bg-gray-200 rounded-2xl p-16 text-center">
              <h1 className="text-4xl mb-4">THANK YOU FOR YOUR ORDER</h1>
              <p className="text-2xl mb-2">YOUR BOOKING NUMBER IS</p>
              <p className="text-3xl mb-8">XXXX</p>
              <div className="mb-8">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop"
                  alt="Twin chefs"
                  className="w-64 h-48 mx-auto object-cover rounded-lg"
                />
              </div>
              <button
                onClick={() => { setCurrentStep(1); setCurrentPage('packages'); }}
                className="bg-red-600 text-white px-16 py-4 rounded-full hover:bg-red-700"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </AppLayout>
  );
}