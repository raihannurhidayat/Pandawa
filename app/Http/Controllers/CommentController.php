<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\CreateCommentRequest;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(CreateCommentRequest $request)
    {
        // dd($request->all());

        $request->user()->comment($request->commentable(), $request->validated('comment'));

        // return redirect()->back();
    }
}
