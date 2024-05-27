import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { winstonConfig } from '../logger/winston.config';
import { uuid } from '../helper';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;
    const ip = request.headers['x-forwarded-for'] || request.ip || request.socket.remoteAddress;
    const userAgent = request.get('user-agent')
    const timestamp = new Date().toISOString();

    const idRequest =  uuid()
    response.setHeader('X-Request-Id', idRequest)
    return next.handle().pipe(
      map((data) => {
        winstonConfig.error({
          id: idRequest,
          message: 'ok',
          method,
          url,
          statusCode: response.statusCode,
          responseTime: Date.now() - start,
          ip,
          userAgent,
          timestamp,
          response: url.includes('/api/v1/auth/login') ? 'login' : JSON.stringify(data)
        });
       return { ...data }
      }),
      catchError((err) => {
        winstonConfig.error({
          id: idRequest,
          message: err?.msg || 'erro',
          method,
          url,
          statusCode: err.status ? err.status : 500,
          responseTime: Date.now() - start,
          ip,
          userAgent,
          timestamp,
          response: err?.message || 'mensagem de erro',
          stack: err.stack,
        });
        return throwError(() => err);
      }),
    );
  }
}
