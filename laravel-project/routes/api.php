<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SpecialtyController;



// api route for specialties (crud)
Route::prefix('specialties')->group(function () {
    // Route::get('/', [SpecialtyController::class, 'index']);
    Route::get('/', [SpecialtyController::class, 'index']); 
    Route::post('/', [SpecialtyController::class, 'store']);
    Route::get('/{id}', [SpecialtyController::class, 'show']); // for edit
    Route::put('/{id}', [SpecialtyController::class, 'update']);
    Route::delete('/{id}', [SpecialtyController::class, 'destroy']);
    Route::patch('/{id}/activate', [SpecialtyController::class, 'activate']);
    Route::patch('/{id}/deactivate', [SpecialtyController::class, 'deactivate']);
    // filter for active and de-active specialties
    Route::get('/active', [SpecialtyController::class, 'active']);
    Route::get('/inactive', [SpecialtyController::class, 'inactive']);
});


// api route for practice locations (crud)
Route::prefix('practice-locations')->group(function () {
    Route::get('/', [PracticeLocationController::class, 'index']);
    Route::post('/', [PracticeLocationController::class, 'store']);
    Route::get('/active', [PracticeLocationController::class, 'active']);
    Route::get('/inactive', [PracticeLocationController::class, 'inactive']);
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
    Route::get('/active', [InsuranceController::class, 'active']);
    Route::get('/inactive', [InsuranceController::class, 'inactive']);
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
