<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\CreateCommentRequest;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        dd($request->all());

        $request->user()->comments($request->commentable());

        // return redirect()->back();
    }
}
