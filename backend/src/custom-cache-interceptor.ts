import { CacheInterceptor } from "@nestjs/cache-manager";
import { Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class CustomHttpCacheInterceptor extends CacheInterceptor {

    excludePaths = [
        "/auth/profile",
        "/ticket/user/total/\\d+",
        "/ticket/\\d+/\\d+/\\d+",
        "/user/\\d+",
        "/user/email/[^/]+"
    ];

    isRequestCacheable(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return (
            this.allowedMethods.includes(req.method) &&
            !this.excludePaths.some(path => new RegExp(path).test(req.url))
        );
    }
}