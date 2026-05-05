<select class="rounded-md border border-zinc-300 px-3 py-2" name="category_id" required>
    @foreach($categories as $category)
        <option value="{{ $category->id }}" @selected(optional($menu)->category_id === $category->id)>{{ $category->name }}</option>
    @endforeach
</select>
<input class="rounded-md border border-zinc-300 px-3 py-2" name="name" placeholder="Nama menu" value="{{ old('name', optional($menu)->name) }}" required>
<input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" name="price" placeholder="Harga" value="{{ old('price', optional($menu)->price) }}" required>
<input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" name="stock" placeholder="Stok" value="{{ old('stock', optional($menu)->stock ?? 0) }}" required>
<textarea class="rounded-md border border-zinc-300 px-3 py-2 md:col-span-2" name="description" placeholder="Deskripsi">{{ old('description', optional($menu)->description) }}</textarea>
<input class="rounded-md border border-zinc-300 px-3 py-2" type="number" min="0" name="low_stock_threshold" placeholder="Batas stok rendah" value="{{ old('low_stock_threshold', optional($menu)->low_stock_threshold ?? 5) }}">
<input class="rounded-md border border-zinc-300 px-3 py-2" type="number" name="sort_order" placeholder="Urutan" value="{{ old('sort_order', optional($menu)->sort_order ?? 0) }}">
<label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_available" value="1" @checked(optional($menu)->is_available ?? true)> Tersedia</label>
<label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_for_dine_in" value="1" @checked(optional($menu)->is_for_dine_in ?? true)> Dine-in</label>
<label class="flex items-center gap-2 text-sm"><input type="checkbox" name="is_for_catering" value="1" @checked(optional($menu)->is_for_catering ?? true)> Catering</label>
