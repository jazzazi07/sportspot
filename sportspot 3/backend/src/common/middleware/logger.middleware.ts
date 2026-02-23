import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    const start = Date.now();

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - start;

      this.logger.log(
        `${method} ${originalUrl} - ${statusCode} - ${contentLength} bytes - ${responseTime}ms - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
