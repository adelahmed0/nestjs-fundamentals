import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWFiNjI2YzdhOGMyZWI1ODk3MGE4OTMiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc3MzE3OTMxOCwiZXhwIjoxNzczMjY1NzE4fQ.3w6sNtfrpK16ALLMi-EpVvQPTN-GEjRraJxxcFMp4-k';

    const isPublic = this.reflector.get<boolean>(
      'IS_PUBLIC',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const token = req.header('authorization')?.split(' ')[1];

    // console.log(token);
    // console.log('AuthGuard is working');

    if (token !== jwt) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
