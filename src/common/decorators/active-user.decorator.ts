import { ExecutionContext, createParamDecorator } from "@nestjs/common";



// Este decorador se encarga de obtener el usuario que se encuentra en el request
export const ActiverUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
)

