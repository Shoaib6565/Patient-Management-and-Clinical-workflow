<?php

namespace App\Http\Controllers;

use App\Models\Export;
use Illuminate\Support\Facades\Storage;

class ExportController extends Controller
{
    public function download($id)
    {
        $export = Export::findOrFail($id);

        if ($export->status !== 'completed') {
            return response()->json([
                'message' => 'File not ready'
            ], 400);
        }

        return Storage::download($export->file_path);
    }
}
