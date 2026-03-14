import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;

        let errorResponse = {
            status: "error",
            errors: ["Unexpected error"]
        };

        if (exception instanceof HttpException) {
            const responseObj = exception.getResponse();
            if (typeof responseObj === "object" && responseObj.hasOwnProperty("message")) {
                errorResponse.errors = Array.isArray(responseObj["message"])
                    ? responseObj["message"]
                    : [responseObj["message"]];
            } else if (typeof responseObj === "string") {
                errorResponse.errors = [responseObj];
            }
        }

        if (exception instanceof Error && (!errorResponse.errors || errorResponse.errors.length === 0)) {
            errorResponse.errors = [exception.message];
        }

        response.status(status).json(errorResponse);
    }
}