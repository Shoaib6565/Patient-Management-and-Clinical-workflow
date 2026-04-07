<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    //  Get All + Search + Pagination
    public function index(Request $request)
    {
        $search = $request->search;

        $categories = Category::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%$search%");
            })
            ->orderBy('name')
            ->paginate(10);

        return response()->json($categories);
    }

    //  Store
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'is_active' => true,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ]);
    }

    //  Show (for edit)
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $category,
        ]);
    }

    //  Active Categories
    public function active()
    {
        $data = Category::where('is_active', true)->get();

        return response()->json([
            'status' => true,
            'message' => 'Active categories fetched successfully',
            'data' => $data,
        ]);
    }

    //  Inactive Categories
    public function inactive()
    {
        $data = Category::where('is_active', false)->get();

        return response()->json([
            'status' => true,
            'message' => 'Inactive categories fetched successfully',
            'data' => $data,
        ]);
    }

    //  Update
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $request->validate([
            'name' => 'required|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ]);
    }

    //  Delete
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    //  Activate
    public function activate($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->update(['is_active' => true]);

        return response()->json([
            'status' => true,
            'message' => 'Category activated successfully',
        ]);
    }

    // Deactivate
    public function deactivate($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->update(['is_active' => false]);

        return response()->json([
            'status' => true,
            'message' => 'Category deactivated successfully',
        ]);
    }
}
