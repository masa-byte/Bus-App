import { CacheInterceptor } from "@nestjs/cache-manager";
import { Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class CustomHttpCacheInterceptor extends CacheInterceptor {

    excludePaths = [
        "/auth/profile",
        "/ticket/total/:id", "ticket/:id/:pageIndex/:pageSize",
        "user/:id", "/user/email/:email"
    ];

    isRequestCacheable(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return (
            this.allowedMethods.includes(req.method) &&
            !this.excludePaths.includes(req.url)
        );
    }
}