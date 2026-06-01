import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { money } from '../../Layouts/AppLayout';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const blank = { category_id: '', name: '', description: '', price: '', stock: 0, low_stock_threshold: 5, sort_order: 0, is_available: true, is_for_dine_in: true, is_for_catering: true };

// Helper to extract cropped image as Blob
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 0.9);
  });
}

export default function Menu({ menus, categories }) {
    return (
        <AdminLayout>
            <Head title="Menu" />
            <h1 className="text-2xl font-bold">Manajemen Menu</h1>
            <MenuForm categories={categories} />
            <section className="mt-5 space-y-3">
                {menus.map((menu) => <MenuForm key={menu.id} menu={menu} categories={categories} />)}
            </section>
        </AdminLayout>
    );
}

function MenuForm({ menu, categories }) {
    const isEdit = Boolean(menu);
    const { data, setData, post, processing, reset } = useForm(isEdit ? {
        category_id: menu.category_id,
        name: menu.name,
        description: menu.description || '',
        price: menu.price,
        stock: menu.stock,
        low_stock_threshold: menu.low_stock_threshold || 5,
        sort_order: menu.sort_order || 0,
        is_available: menu.is_available,
        is_for_dine_in: menu.is_for_dine_in,
        is_for_catering: menu.is_for_catering,
        image: null,
        _method: 'put',
    } : { ...blank, category_id: categories[0]?.id || '', image: null });

    // Cropper State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
            setImageSrc(imageDataUrl);
            setPreviewUrl(null); // reset preview if picking a new file
        }
    };

    const confirmCrop = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            // Convert Blob to File so Laravel recognizes it as an uploaded file
            const croppedFile = new File([croppedBlob], "menu.jpg", { type: "image/jpeg" });
            
            setData('image', croppedFile);
            setPreviewUrl(URL.createObjectURL(croppedBlob));
            setImageSrc(null); // close cropper
        } catch (e) {
            console.error(e);
            alert("Gagal memotong gambar.");
        }
    };

    function submit(e) {
        e.preventDefault();
        isEdit 
            ? post(`/admin/menu/${menu.id}`, { preserveScroll: true, forceFormData: true, onSuccess: () => setPreviewUrl(null) }) 
            : post('/admin/menu', { preserveScroll: true, forceFormData: true, onSuccess: () => { reset(); setPreviewUrl(null); } });
    }

    return (
        <form className={`rounded-md border border-zinc-200 bg-white p-4 ${isEdit ? '' : 'mt-5'}`} onSubmit={submit} encType="multipart/form-data">
            <div className="mb-3 flex justify-between gap-3">
                <h2 className="font-bold">{isEdit ? menu.name : 'Tambah menu'}</h2>
                {isEdit && <span className="text-sm font-semibold text-red-700">{money(menu.price)}</span>}
            </div>
            
            {/* Display existing or cropped preview */}
            {(previewUrl || (isEdit && menu.image)) && !imageSrc && (
                <div className="mb-4">
                    <img src={previewUrl || menu.image} alt={menu.name} className="h-48 w-full md:w-80 object-cover rounded-md shadow-sm border" />
                </div>
            )}

            {/* Cropper UI */}
            {imageSrc && (
                <div className="mb-4 p-4 border border-zinc-200 rounded-md bg-zinc-50">
                    <h3 className="text-sm font-bold mb-2">Potong Gambar (Aspek Rasio 16:9 disarankan)</h3>
                    <div className="relative h-64 w-full bg-black rounded-md overflow-hidden">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={16 / 9}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="w-full md:w-1/2"
                        />
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setImageSrc(null)} className="px-4 py-2 text-sm bg-zinc-200 rounded-md font-semibold">Batal</button>
                            <button type="button" onClick={confirmCrop} className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-md font-semibold">Konfirmasi Potongan</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-3 md:grid-cols-4">
                <select className="rounded-md border border-zinc-300 px-3 py-2" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input className="rounded-md border border-zinc-300 px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nama menu" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="Harga" required />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.stock} onChange={(e) => setData('stock', e.target.value)} placeholder="Stok" required />
                <textarea className="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Deskripsi" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" value={data.low_stock_threshold} onChange={(e) => setData('low_stock_threshold', e.target.value)} placeholder="Batas stok rendah" />
                <input className="rounded-md border border-zinc-300 px-3 py-2" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} placeholder="Urutan" />
                
                <div className="md:col-span-2">
                    <label className="block text-sm text-zinc-600 mb-1">Upload Gambar Baru (Opsional)</label>
                    <input className="w-full text-sm text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" type="file" accept="image/*" onChange={onFileChange} />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center gap-2">
                    {['is_available', 'is_for_dine_in', 'is_for_catering'].map((key) => <label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(data[key])} onChange={(e) => setData(key, e.target.checked)} /> {key.replace('is_', '').replaceAll('_', ' ')}</label>)}
                </div>
                
                <div className="flex gap-2 md:col-span-4 mt-2">
                    <button disabled={processing || imageSrc} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{isEdit ? 'Update' : 'Simpan Menu'}</button>
                    {isEdit && <button type="button" onClick={() => router.delete(`/admin/menu/${menu.id}`, { preserveScroll: true })} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">Hapus</button>}
                </div>
            </div>
        </form>
    );
}
