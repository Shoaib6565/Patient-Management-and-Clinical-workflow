<?php
namespace App\Http\Controllers;

use App\Models\Firm;
use Illuminate\Http\Request;

class FirmController extends Controller
{
    // Get All + Search + Filters
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status; // 1 or 0
        $type   = $request->type;   // Legal, Corporate, etc.

        $firms = Firm::query()
            ->when($search, function ($query) use ($search) {
                $query->where('firm_name', 'like', "%$search%");
            })

            ->when($status === 'active', function ($query) {
                $query->where('is_active', true);
            })

            ->when($status === 'inactive', function ($query) {
                $query->where('is_active', false);
            })

            ->when($type, function ($query) use ($type) {
                $query->where('firm_type', $type);
            })

            ->orderBy('firm_name')
            ->paginate(10);

        return response()->json($firms);
    }

    // Store
    public function store(Request $request)
    {
        $request->validate([
            'firm_name'      => 'required|string',
            'firm_type'      => 'required|in:Legal,Corporate,Government,Other',
            'address'        => 'nullable|string',
            'phone'          => 'nullable|string',
            'contact_person' => 'nullable|string',
        ]);

        $firm = Firm::create([
            'firm_name'      => $request->firm_name,
            'firm_type'      => $request->firm_type,
            'address'        => $request->address,
            'phone'          => $request->phone,
            'contact_person' => $request->contact_person,
            'is_active'      => true,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Firm created successfully',
            'data'    => $firm,
        ]);
    }

    // Show
    public function show($id)
    {
        $firm = Firm::find($id);

        if (! $firm) {
            return response()->json([
                'status'  => false,
                'message' => 'Firm not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data'   => $firm,
        ]);
    }

    // Update
    public function update(Request $request, $id)
    {
        $firm = Firm::find($id);

        if (! $firm) {
            return response()->json([
                'status'  => false,
                'message' => 'Firm not found',
            ], 404);
        }

        $request->validate([
            'firm_name'      => 'required|string',
            'firm_type'      => 'required|in:Legal,Corporate,Government,Other',
            'address'        => 'nullable|string',
            'phone'          => 'nullable|string',
            'contact_person' => 'nullable|string',
        ]);

        $firm->update($request->all());

        return response()->json([
            'status'  => true,
            'message' => 'Firm updated successfully',
            'data'    => $firm,
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $firm = Firm::find($id);

        if (! $firm) {
            return response()->json([
                'status'  => false,
                'message' => 'Firm not found',
            ], 404);
        }

        $firm->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Firm deleted successfully',
        ]);
    }

    // Activate
    public function activate($id)
    {
        $firm = Firm::find($id);

        if (! $firm) {
            return response()->json([
                'status'  => false,
                'message' => 'Firm not found',
            ], 404);
        }

        $firm->update(['is_active' => true]);

        return response()->json([
            'status'  => true,
            'message' => 'Firm activated successfully',
        ]);
    }

    // Deactivate
    public function deactivate($id)
    {
        $firm = Firm::find($id);

        if (! $firm) {
            return response()->json([
                'status'  => false,
                'message' => 'Firm not found',
            ], 404);
        }

        $firm->update(['is_active' => false]);

        return response()->json([
            'status'  => true,
            'message' => 'Firm deactivated successfully',
        ]);
    }
}

// $firms = Firm::query()
// ->when($search, fn($q) => $q->where('firm_name', 'like', "%$search%"))
// ->when($status !== null && $status !== 'all', fn($q) =>
// $q->where('is_active', $status))
//  ->when($type, fn($q) =>
// $q->where('firm_type', $type))
// ->orderBy('firm_name')
// ->paginate(10);
