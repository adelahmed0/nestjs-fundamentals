import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ message: string; data: T }> {
    console.log('Before...');

    return next.handle().pipe(
      map((data: T) => {
        console.log('After...');
        return {
          message: 'Success',
          data,
        };
      }),
    );
  }
}
