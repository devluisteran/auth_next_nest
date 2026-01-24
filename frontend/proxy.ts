
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routesProtected= ["/dashboard/:path*"];
const routesAuth= ["/auth/:path*"];

export function proxy(request: NextRequest){

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
    const isAuthRoute = routesAuth.some(route=>{ 
       return pathname.startsWith(route.replace(":path*",""));
    });

    if(token && isAuthRoute){
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/home";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*","/auth/:path*"]
}