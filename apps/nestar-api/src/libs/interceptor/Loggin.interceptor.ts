import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { now } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly Logger: Logger = new Logger();
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const recordTime = Date.now();
		const type = context.getType<GqlContextType>();

		if (type === 'http') {
			return next.handle().pipe();
		} else if (type === 'graphql') {
			const gqlContext = GqlExecutionContext.create(context);
			this.Logger.log(`${this.stringify(gqlContext.getContext().req.body)}`, 'REQUEST');
			return next.handle().pipe(
				tap((context) => {
					const responseTime = Date.now() - recordTime;
					this.Logger.log(`${this.stringify(context)}  - ${responseTime}ms \n\n`, 'RESPONSE');
				}),
			);
		}
		return next.handle();
	}
	private stringify(context: ExecutionContext): string {
		return JSON.stringify(context).slice(0, 75);
	}
}
