<?php

namespace App\Http\Controllers;

use App\Models\PracticeLocation;
use Illuminate\Http\Request;

class PracticeLocationController extends Controller
{

    // Get All Practice Locations + Search
    public function index(Request $request)
    {
        $search = $request->search;

        $locations = PracticeLocation::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('location_name', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
                });
            })
            ->orderBy('location_name')
            ->paginate(10);

        return response()->json($locations);
    }

    // Store (Create)
    public function store(Request $request)
    {
        $request->validate([
            'location_name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email'
        ]);

        $location = PracticeLocation::create([
            'location_name' => $request->location_name,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'phone' => $request->phone,
            'email' => $request->email,
            'is_active' => true
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Practice location created successfully',
            'data' => $location
        ]);
    }

    // Show Single
    public function show($id)
    {
        $location = PracticeLocation::find($id);

        if (!$location) {
            return response()->json([
                'status' => false,
                'message' => 'Location not found'
            ],404);
        }

        return response()->json([
            'status' => true,
            'data' => $location
        ]);
    }

    // Get Active Locations
    public function active()
    {
        $data = PracticeLocation::where('is_active', true)->get();

        return response()->json([
            'status' => true,
            'message' => 'Active locations fetched successfully',
            'data' => $data
        ]);
    }

    // Get Inactive Locations
    public function inactive()
    {
        $data = PracticeLocation::where('is_active', false)->get();

        return response()->json([
            'status' => true,
            'message' => 'Inactive locations fetched successfully',
            'data' => $data
        ]);
    }

    // Update
    public function update(Request $request, $id)
    {
        $location = PracticeLocation::find($id);

        if (!$location) {
            return response()->json([
                'status' => false,
                'message' => 'Location not found'
            ],404);
        }

        $request->validate([
            'location_name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email'
        ]);

        $location->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Location updated successfully',
            'data' => $location
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $location = PracticeLocation::find($id);

        if (!$location) {
            return response()->json([
                'status' => false,
                'message' => 'Location not found'
            ],404);
        }

        $location->delete();

        return response()->json([
            'status' => true,
            'message' => 'Location deleted successfully'
        ]);
    }

    // Activate
    public function activate($id)
    {
        $location = PracticeLocation::find($id);

        if (!$location) {
            return response()->json([
                'status' => false,
                'message' => 'Location not found'
            ],404);
        }

        $location->update(['is_active' => true]);

        return response()->json([
            'status' => true,
            'message' => 'Location activated successfully'
        ]);
    }

    // Deactivate
    public function deactivate($id)
    {
        $location = PracticeLocation::find($id);

        if (!$location) {
            return response()->json([
                'status' => false,
                'message' => 'Location not found'
            ],404);
        }

        $location->update(['is_active' => false]);

        return response()->json([
            'status' => true,
            'message' => 'Location deactivated successfully'
        ]);
    }
}