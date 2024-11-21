import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { I18nService } from "./localization/i18n/i18n.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = request.headers['accept-language']?.split(',')[0] || 'en';
    const exceptionResponse: any = exception.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // error from dto validation
    if (Array.isArray(exceptionResponse.message)) {
      const errors = exceptionResponse.message.reduce((acc, currVal) => {
        const errorString = this.i18nService.translate(`errors.${currVal}`, lang);
        const [property, ...rest] = errorString.split(' ');
        const errorMessage  = rest.join(' ');

        const existingErrorIndex = acc.findIndex((error) => error.key === property);

        if (existingErrorIndex !== -1) {
          acc[existingErrorIndex]['value'].push(errorMessage);
        } else {
          acc.push({
            key: property,
            value: [errorMessage]
          })
        }
        return acc;
      },[]);

      return response.status(status).json({
          statusCode: status,
          message: errors,
        });
    }
    return response
      .status(status)
      .json({
        statusCode: status,
        message: exception ? exception.message : '',
      })
  }
}
