import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { response } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly tokenService: TokenService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = this.extractToken(request.headers.authorization);

    if(!token){
      return false;
    }

    const isValid = this.verifyToken(token);

    if(!isValid){
      return false;
    }
    
    this.verifyTokenRefresh(token,response);
    
    return true;
  }

  private verifyToken(token: string){
    const isValid = this.tokenService.verifyToken(token);
    return isValid;
  }

  private extractToken(authorizationHeader: string){
    if(!authorizationHeader) return null;

    const [type, token] = authorizationHeader.split(' ');

    if(type !== 'Bearer') return null;

    return token;
  }

  private verifyTokenRefresh(token: string,response: any){

    const payload =this.tokenService.decodeToken(token);

    if(payload && typeof payload === 'object' && 'exp' in payload){

      const currentTime = Math.floor(Date.now() / 1000);

      const expTime = payload['exp'] as number;

      if(expTime - currentTime < 300){

        const newToken = this.tokenService.refreshToken({id:payload['id']});
        
        response.setHeader('Authorization', `Bearer ${newToken}`);
      }
    }

  }
  

}
