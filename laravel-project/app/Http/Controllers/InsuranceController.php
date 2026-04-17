<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use Illuminate\Http\Request;

class InsuranceController extends Controller
{
    // Get All Insurances + Search
    public function index(Request $request)
    {
        $search = $request->search;
        $filter = $request->filter; // active, inactive, all

        $insurances = Insurance::query()
            ->when($search, function ($query) use ($search) {
                $query->where('insurance_name', 'like', "%$search%");
            })
            ->when($filter === 'active', function ($query) {
                $query->where('is_active', true);
            })
            ->when($filter === 'inactive', function ($query) {
                $query->where('is_active', false);
            })
            ->orderBy('insurance_name')
            ->paginate(10);

        return response()->json($insurances);
    }

    // Store (Create)
    public function store(Request $request)
    {
        $request->validate([
            'insurance_name' => 'required|string',
            'insurance_code' => 'required|unique:insurances,insurance_code',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $insurance = Insurance::create([
            'insurance_name' => $request->insurance_name,
            'insurance_code' => $request->insurance_code,
            'address' => $request->address,
            'phone' => $request->phone,
            'is_active' => true,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Insurance created successfully',
            'data' => $insurance,
        ]);
    }

    // Show Single
    public function show($id)
    {
        $insurance = Insurance::find($id);

        if (!$insurance) {
            return response()->json([
                'status' => false,
                'message' => 'Insurance not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $insurance,
        ]);
    }

    // //Get Active Insurances
    // public function active()
    // {
    //     $data = Insurance::where('is_active', true)->get();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Active insurances fetched successfully',
    //         'data' => $data,
    //     ]);
    // }

    // // Get Inactive Insurances
    // public function inactive()
    // {
    //     $data = Insurance::where('is_active', false)->get();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Inactive insurances fetched successfully',
    //         'data' => $data,
    //     ]);
    // }

    // Update
    public function update(Request $request, $id)
    {
        $insurance = Insurance::find($id);

        if (!$insurance) {
            return response()->json([
                'status' => false,
                'message' => 'Insurance not found',
            ], 404);
        }

        $request->validate([
            'insurance_name' => 'required|string',
            'insurance_code' => 'required|unique:insurances,insurance_code,' . $id,
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $insurance->update([
            'insurance_name' => $request->insurance_name,
            'insurance_code' => $request->insurance_code,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Insurance updated successfully',
            'data' => $insurance,
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $insurance = Insurance::find($id);

        if (!$insurance) {
            return response()->json([
                'status' => false,
                'message' => 'Insurance not found',
            ], 404);
        }

        $insurance->delete();

        return response()->json([
            'status' => true,
            'message' => 'Insurance deleted successfully',
        ]);
    }

    // Activate
    public function activate($id)
    {
        $insurance = Insurance::find($id);

        if (!$insurance) {
            return response()->json([
                'status' => false,
                'message' => 'Insurance not found',
            ], 404);
        }

        $insurance->update(['is_active' => true]);

        return response()->json([
            'status' => true,
            'message' => 'Insurance activated successfully',
        ]);
    }

    // Deactivate
    public function deactivate($id)
    {
        $insurance = Insurance::find($id);

        if (!$insurance) {
            return response()->json([
                'status' => false,
                'message' => 'Insurance not found',
            ], 404);
        }

        $insurance->update(['is_active' => false]);

        return response()->json([
            'status' => true,
            'message' => 'Insurance deactivated successfully',
        ]);
    }
}