<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenuController as AdminMenuController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TableController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Customer\AccountController;
use App\Http\Controllers\Customer\CheckoutController;
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\MenuController;
use App\Http\Controllers\Customer\OrderConfirmationController;
use App\Http\Controllers\Customer\ReservationController;
use App\Http\Controllers\KitchenController;
use App\Http\Controllers\Customer\CateringController;
use App\Http\Controllers\PaymentCallbackController;
use App\Http\Controllers\Info\AboutController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/debug', [\App\Http\Controllers\DebugController::class, 'index'])->name('debug.index');
Route::post('/debug/wa', [\App\Http\Controllers\DebugController::class, 'testWhatsApp'])->name('debug.wa');
Route::post('/debug/reservation', [\App\Http\Controllers\DebugController::class, 'seedReservation'])->name('debug.reservation');
Route::post('/debug/order', [\App\Http\Controllers\DebugController::class, 'seedOrder'])->name('debug.order');

Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
Route::post('/cart/items', [MenuController::class, 'addToCart'])->name('cart.add');
Route::delete('/cart/items/{menu}', [MenuController::class, 'removeFromCart'])->name('cart.remove');

Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order/confirm/{code}', OrderConfirmationController::class)->name('orders.confirm');

Route::get('/reservasi', [ReservationController::class, 'create'])->name('reservations.create');
Route::post('/reservasi', [ReservationController::class, 'store'])->name('reservations.store');

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/akun/riwayat', [AccountController::class, 'history'])->name('account.history');
    Route::post('/akun/pesanan/{order}/cancel', [AccountController::class, 'cancelOrder'])->name('account.orders.cancel');
});

Route::middleware(['auth', 'role:admin,owner'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/pesanan', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::post('/pesanan/{order}/{action}', [AdminOrderController::class, 'transition'])->name('orders.transition');
    Route::get('/kategori', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('categories.index');
    Route::post('/kategori', [\App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('categories.store');
    Route::put('/kategori/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/kategori/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('/reservasi', [\App\Http\Controllers\Admin\ReservationController::class, 'index'])->name('reservations.index');
    Route::put('/reservasi/{reservation}', [\App\Http\Controllers\Admin\ReservationController::class, 'update'])->name('reservations.update');
    Route::get('/menu', [AdminMenuController::class, 'index'])->name('menu.index');
    Route::post('/menu', [AdminMenuController::class, 'store'])->name('menu.store');
    Route::put('/menu/{menu}', [AdminMenuController::class, 'update'])->name('menu.update');
    Route::delete('/menu/{menu}', [AdminMenuController::class, 'destroy'])->name('menu.destroy');
    Route::get('/stok-meja', [TableController::class, 'index'])->name('tables.index');
    Route::post('/stok-meja', [TableController::class, 'store'])->name('tables.store');
    Route::put('/stok-meja/{table}', [TableController::class, 'update'])->name('tables.update');
    Route::get('/pengguna', [UserController::class, 'index'])->name('users.index');
    Route::post('/pengguna', [UserController::class, 'store'])->name('users.store');
    Route::put('/pengguna/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/pengguna/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/pengaturan', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/pengaturan', [SettingController::class, 'update'])->name('settings.update');
    Route::get('/laporan', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/laporan/export', [ReportController::class, 'export'])->name('reports.export');
});

Route::get('/kitchen', KitchenController::class)->middleware(['auth', 'role:kitchen,admin,owner'])->name('kitchen.index');
Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/catering', [CateringController::class, 'index'])->name('catering');
Route::post('/catering', [CateringController::class, 'store'])->name('catering.store');

Route::post('/payment/midtrans-callback', [PaymentCallbackController::class, 'handleMidtrans']);
