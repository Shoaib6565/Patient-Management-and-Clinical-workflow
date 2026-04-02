<?php

namespace App\Http\Controllers;

use App\Models\Cases;
use App\Http\Requests\StoreCasesRequest;
use App\Http\Requests\UpdateCasesRequest;

class CasesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCasesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cases $cases)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cases $cases)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCasesRequest $request, Cases $cases)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cases $cases)
    {
        //
    }
}
