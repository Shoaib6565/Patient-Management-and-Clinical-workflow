<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Exception;

class VerifyNodeJwt
{
    public function handle(Request $request, Closure $next)
    {
        // Allow preflight request
        if ($request->isMethod('OPTIONS')) {
            return response()->json([], 200);
        }

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
                new Key(config('app.jwt_node_secret'), 'HS256')
            );

            // attach user data  with request
            $request->attributes->set('auth_user', $decoded);
            ;

        } catch (ExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (SignatureInvalidException $e) {
            return response()->json(['error' => 'Invalid signature'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
