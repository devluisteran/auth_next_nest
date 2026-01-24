
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routesProtected= ["/dashboard/:path*"];
const routesAuth= ["/auth/login","/register"];

export function middleware(request: NextRequest){

    const token = request.cookies.get("access_token")?.value || null;

    const {pathname}= request.nextUrl;

    const isProtectedRoute = routesProtected.some(route=>{
        return pathname.startsWith(route.replace(":path*",""));
    });

    if(!token && isProtectedRoute){
        const url = request.nextUrl.clone();
        url.pathname = "auth/login";
        return NextResponse.redirect(url);
    }
    console.log("Token found:", token);
    const isAuthRoute = routesAuth.some(route=>{ 
        console.log("Checking auth route:", route, "against", pathname);
       return route === pathname
    });

    if(token && isAuthRoute){
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/home";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*","/login","/register"]
}