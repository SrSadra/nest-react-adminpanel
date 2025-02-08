import {Controller, Get, UseGuards} from '@nestjs/common';
import {PermissionService} from "./permission.service";
import {AuthGuard} from "../../libs/shared/src/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
    constructor(private permissionService: PermissionService) {
    }

    @Get()
    async all() {
        return this.permissionService.all();
    }
}
