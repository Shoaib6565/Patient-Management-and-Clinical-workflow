<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SpecialtyController;



// api route for specialties (crud)
Route::prefix('specialties')->group(function () {
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
