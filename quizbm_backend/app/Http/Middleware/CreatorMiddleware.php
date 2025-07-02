<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CreatorMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'creator') {
            abort(403, 'Unauthorized. Only creators can access this resource.');
        }
        return $next($request);
    }
} 