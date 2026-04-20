<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FirmController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\PracticeLocationController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['node.jwt'])->group(function () {

// api for appointments (for all role)
Route::prefix('appointments')->group(function () {
    // total appointments for admin dashboard
    Route::get('/total', [AppointmentController::class, 'total']);
    // Listing + filters
    Route::get('/', [AppointmentController::class, 'index']);
    // for export to csv
    Route::get('/export', [AppointmentController::class, 'export']);
    // CRUD
    Route::post('/', [AppointmentController::class, 'store']);
    Route::get('/{id}', [AppointmentController::class, 'show']);
    Route::put('/{id}', [AppointmentController::class, 'update']);
    Route::delete('/{id}', [AppointmentController::class, 'destroy']); // Admin
    // Actions
    Route::patch('/{id}/cancel', [AppointmentController::class, 'cancel']);
    Route::patch('/{id}/reschedule', [AppointmentController::class, 'reschedule']);
    // doctor can  change status to completed
    Route::patch('/{id}/updateStatus', [AppointmentController::class, 'updateStatus']);
    // History
    Route::get('/history/{patient_id}', [AppointmentController::class, 'history']);
});

// api route for visits (for all role)

Route::prefix('visits')->group(function () {
    // All roles
    Route::get('/', [VisitController::class, 'index']);
    // export to csv
    Route::get('/export', [VisitController::class, 'export']);
    Route::get('/{id}', [VisitController::class, 'show']);
    // Doctor actions
    Route::put('/{id}', [VisitController::class, 'update']);
    Route::patch('/complete/{id}', [VisitController::class, 'complete']);
    // Admin only
    Route::delete('/{id}', [VisitController::class, 'destroy']);

});

// for download csv report (visit and appointment)
// Route::get('/exports/{id}/download', [ExportController::class, 'download']);

// api route for specialties (crud)
Route::prefix('specialties')->group(function () {
    Route::get('/', [SpecialtyController::class, 'index']);
    Route::post('/', [SpecialtyController::class, 'store']);
    Route::get('/{id}', [SpecialtyController::class, 'show']); // for edit
    Route::put('/{id}', [SpecialtyController::class, 'update']);
    Route::delete('/{id}', [SpecialtyController::class, 'destroy']);
    Route::patch('/{id}/activate', [SpecialtyController::class, 'activate']);
    Route::patch('/{id}/deactivate', [SpecialtyController::class, 'deactivate']);
});

// api route for practice locations (crud)
Route::prefix('practice-locations')->group(function () {
    Route::get('/', [PracticeLocationController::class, 'index']);
    Route::post('/', [PracticeLocationController::class, 'store']);
    Route::get('/{id}', [PracticeLocationController::class, 'show']);
    Route::put('/{id}', [PracticeLocationController::class, 'update']);
    Route::delete('/{id}', [PracticeLocationController::class, 'destroy']);
    Route::patch('/activate/{id}', [PracticeLocationController::class, 'activate']);
    Route::patch('/deactivate/{id}', [PracticeLocationController::class, 'deactivate']);
});

// api route for insurances (crud)
Route::prefix('insurances')->group(function () {
    Route::get('/', [InsuranceController::class, 'index']);
    Route::post('/', [InsuranceController::class, 'store']);
    Route::get('/{id}', [InsuranceController::class, 'show']);
    Route::put('/{id}', [InsuranceController::class, 'update']);
    Route::delete('/{id}', [InsuranceController::class, 'destroy']);
    Route::patch('/activate/{id}', [InsuranceController::class, 'activate']);
    Route::patch('/deactivate/{id}', [InsuranceController::class, 'deactivate']);
});

// api route for firms (crud)
Route::prefix('firms')->group(function () {
    Route::get('/', [FirmController::class, 'index']);
    Route::post('/', [FirmController::class, 'store']);
    Route::get('/{id}', [FirmController::class, 'show']);
    Route::put('/{id}', [FirmController::class, 'update']);
    Route::delete('/{id}', [FirmController::class, 'destroy']);
    Route::patch('/activate/{id}', [FirmController::class, 'activate']);
    Route::patch('/deactivate/{id}', [FirmController::class, 'deactivate']);
});

// api route for categories
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    Route::patch('/{id}/activate', [CategoryController::class, 'activate']);
    Route::patch('/{id}/deactivate', [CategoryController::class, 'deactivate']);
});


// api route for notification
Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('/{id}/read', [NotificationController::class, 'markAsRead']);
});

// });
