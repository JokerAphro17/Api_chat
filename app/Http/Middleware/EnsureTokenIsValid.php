<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\PersonalAccessToken;
class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {

            return response()->json(['success' => false, 'message' => 'Token not provided',], 401);
        }
        $token = PersonalAccessToken::where('token', $token)->first();
        if (!$token) {
            return response()->json(['success' => false, 'message' => 'Token not found',], 401);
        }

        return $next($request);
    }
}
