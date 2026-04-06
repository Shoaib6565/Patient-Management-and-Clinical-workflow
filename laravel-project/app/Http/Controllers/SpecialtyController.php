<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use Illuminate\Http\Request;

class SpecialtyController extends Controller
{
    // Get All Specialties
    public function index()
    {
        $specialties = Specialty::get();

        return response()->json([
            'status' => true,
            'data' => $specialties
        ]);
    }

    //  Store (Create)
    public function store(Request $request)
    {
        $request->validate([
            'specialty_name' => 'required|unique:specialties,specialty_name',
            'description' => 'nullable|string',
        ]);

        $specialty = Specialty::create([
            'specialty_name' => $request->specialty_name,
            'description' => $request->description,
            'is_active' => true
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Specialty created successfully',
            'data' => $specialty
        ]);
    }

    // Show (Single for Edit)
    public function show($id)
    {
        $specialty = Specialty::find($id);

        if (!$specialty) {
            return response()->json([
                'status' => false,
                'message' => 'Specialty not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $specialty
        ]);
    }


    // filter active and de-active specialties
    //  Get Active Specialties
    public function active()
    {
        $data = Specialty::where('is_active', true)->get();

        return response()->json([
            'status' => true,
            'message' => 'Active specialties fetched successfully',
            'data' => $data
        ]);
    }


    // Get Inactive Specialties
    public function inactive()
    {
        $data = Specialty::where('is_active', false)->get();

        return response()->json([
            'status' => true,
            'message' => 'Inactive specialties fetched successfully',
            'data' => $data
        ]);
    }

    //  Update
    public function update(Request $request, $id)
    {
        $specialty = Specialty::find($id);

        if (!$specialty) {
            return response()->json([
                'status' => false,
                'message' => 'Specialty not found'
            ], 404);
        }

        $request->validate([
            'specialty_name' => 'required|unique:specialties,specialty_name,' . $id,
            'description' => 'nullable|string',
        ]);

        $specialty->update([
            'specialty_name' => $request->specialty_name,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Specialty updated successfully',
            'data' => $specialty
        ]);
    }

    //  Delete
    public function destroy($id)
    {
        $specialty = Specialty::find($id);

        if (!$specialty) {
            return response()->json([
                'status' => false,
                'message' => 'Specialty not found'
            ], 404);
        }

        $specialty->delete();

        return response()->json([
            'status' => true,
            'message' => 'Specialty deleted successfully'
        ]);
    }

    //  Activate Specialty
    public function activate($id)
    {
        $specialty = Specialty::find($id);

        if (!$specialty) {
            return response()->json([
                'status' => false,
                'message' => 'Specialty not found'
            ], 404);
        }

        $specialty->update(['is_active' => true]);

        return response()->json([
            'status' => true,
            'message' => 'Specialty activated successfully'
        ]);
    }

    //  Deactivate Specialty
    public function deactivate($id)
    {
        $specialty = Specialty::find($id);

        if (!$specialty) {
            return response()->json([
                'status' => false,
                'message' => 'Specialty not found'
            ], 404);
        }

        $specialty->update(['is_active' => false]);

        return response()->json([
            'status' => true,
            'message' => 'Specialty deactivated successfully'
        ]);
    }
}
