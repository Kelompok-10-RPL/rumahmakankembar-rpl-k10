import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import AppLayout, { money } from '../../Layouts/AppLayout';

export default function CateringForm({ selectedPackage }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [qty, setQty] = useState(15);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [orderResult, setOrderResult] = useState(null);

  // ADD-ONS
  const addOns = [
    { id: 1, name: "Air Mineral", price: 2000 },
    { id: 2, name: "Lalapan", price: 3000 },
    { id: 3, name: "Telur", price: 4000 },
    { id: 4, name: "Tempe", price: 3000 },
    { id: 5, name: "Kerupuk", price: 1000 },
    { id: 6, name: "Pisang", price: 5000 },
  ];

  const toggleAddOn = (item) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  };

  // FORM DATA
  const { data, setData, post, processing } = useForm({
    package_id: selectedPackage?.id || null,
    event_name: '',
    event_date: '',
    event_time: '',
    event_address: '',
  });

  // PRICE
  const basePrice = Number(selectedPackage?.price || 0);

  const addOnTotal = selectedAddOns.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const perPax = basePrice + addOnTotal;

  const boxFee = 3000;
  const shippingFee = 10000;

  const totalPrice = (perPax * qty) + boxFee + shippingFee;

  const isValid = qty >= 15;

  // SUBMIT + SIMPAN ORDER
  const handlePay = (e) => {
    e.preventDefault();

    post(route('catering.store'), {
      data: {
        ...data,
        qty,
        add_ons: selectedAddOns,
        total_price: totalPrice
      },
      onSuccess: (page) => {
        const order = page.props.order || { id: Date.now() };
        setOrderResult(order);
        setCurrentStep(4);
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Catering Form" />

      {/* padding atas bawah biar tidak mepet header/footer */}
      <div className="min-h-screen py-12 px-4 bg-zinc-100">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 sm:p-8">

          <h1 className="text-xl sm:text-3xl font-bold text-center mb-6">
            Pemesanan Catering
          </h1>

          <form onSubmit={handlePay} className="space-y-6">

            {/* STEP 1 - EVENT INFO */}
            {currentStep === 1 && (
              <div className="space-y-4">

                <input
                  className="w-full border p-3 rounded-xl"
                  placeholder="Nama Acara"
                  value={data.event_name}
                  onChange={e => setData('event_name', e.target.value)}
                />

                <input
                  className="w-full border p-3 rounded-xl"
                  type="date"
                  value={data.event_date}
                  onChange={e => setData('event_date', e.target.value)}
                />

                <input
                  className="w-full border p-3 rounded-xl"
                  type="time"
                  value={data.event_time}
                  onChange={e => setData('event_time', e.target.value)}
                />

                <textarea
                  className="w-full border p-3 rounded-xl"
                  placeholder="Alamat Acara"
                  value={data.event_address}
                  onChange={e => setData('event_address', e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl"
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 - ADD-ONS + QTY */}
            {currentStep === 2 && (
              <div className="space-y-5">

                <h2 className="font-bold">Add-ons</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {addOns.map(item => (
                    <label key={item.id} className="border p-3 rounded-xl flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.some(i => i.id === item.id)}
                        onChange={() => toggleAddOn(item)}
                      />
                      {item.name}
                    </label>
                  ))}
                </div>

                <div>
                  <label className="font-medium">Jumlah Pax (min 15)</label>
                  <input
                    type="number"
                    min={15}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full border p-3 rounded-xl"
                  />
                  {!isValid && (
                    <p className="text-red-500 text-sm">
                      Minimal 15 pax
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(1)}>
                    Kembali
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl"
                  >
                    Lanjut
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3 - SUMMARY */}
            {currentStep === 3 && (
              <div className="space-y-4">

                <div className="border rounded-xl p-4 space-y-2 text-sm">

                  <p><b>Paket:</b> {selectedPackage?.name}</p>
                  <p><b>Qty:</b> {qty}</p>

                  <p className="font-bold mt-2">Add-ons:</p>
                  {selectedAddOns.length === 0 && <p>-</p>}
                  {selectedAddOns.map(a => (
                    <p key={a.id}>
                      {a.name} (+{money(a.price)})
                    </p>
                  ))}

                  <hr />

                  <p>Per Pax: {money(perPax)}</p>
                  <p>Box: {money(boxFee)}</p>
                  <p>Ongkir: {money(shippingFee)}</p>

                  <div className="text-lg font-bold text-red-600">
                    TOTAL: {money(totalPrice)}
                  </div>

                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(2)}>
                    Ubah
                  </button>

                  <button
                    type="submit"
                    disabled={processing || !isValid}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl"
                  >
                    Bayar
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4 - QR PAYMENT */}
            {currentStep === 4 && orderResult && (
              <div className="text-center space-y-4 py-6">

                <CheckCircle className="mx-auto w-14 h-14 text-green-600" />

                <h2 className="text-xl sm:text-2xl font-bold">
                  Scan QRIS Pembayaran
                </h2>

                <img
                  className="mx-auto"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ORDER-${orderResult.id}`}
                  alt="QRIS"
                />

                <p className="font-bold text-red-600 text-lg">
                  Total: {money(totalPrice)}
                </p>

              </div>
            )}

          </form>

        </div>
      </div>
    </AppLayout>
  );
}