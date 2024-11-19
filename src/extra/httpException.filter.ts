import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";
import { I18nService } from "./localization/i18n/i18n.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang = request.headers['accept-language']?.split(',')[0] || 'en';
    const exceptionResponse: any = exception.getResponse();

    console.log("exception", exceptionResponse);
    console.log("exception message", exceptionResponse.message instanceof ValidationError);
    // se erro de validacao de dto
    if (Array.isArray(exceptionResponse.message)) {
      const errors = exceptionResponse.message.map((error: string) => {
        return this.i18nService.translate(`errors.${error}`, lang)
      });

      return response.status(status).json({
          statusCode: status,
          messages: errors
        });
    }
    response
      .status(status)
      .json({
        statusCode: status
      })
  }
}