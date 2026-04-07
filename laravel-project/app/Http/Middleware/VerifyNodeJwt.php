<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class VerifyNodeJwt
{
    public function handle(Request $request, Closure $next)
    {
        try {

            //  Get token from header
            $authHeader = $request->header('Authorization');

            if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
                return response()->json(['error' => 'Token not provided'], 401);
            }

            $token = str_replace('Bearer ', '', $authHeader);

            //  Decode token (same secret as Node)
            $decoded = JWT::decode(
                $token,
                new Key(env('JWT_NODE_SECRET'), 'HS256')
            );

            //  user data attach kar do request me
           $request->attributes->set('auth_user', $decoded);;

        } catch (Exception $e) {

            return response()->json([
                'error' => 'Invalid token',
                'message' => $e->getMessage()
            ], 401);
        }

        return $next($request);
    }
}
