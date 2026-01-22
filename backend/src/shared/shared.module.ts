import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Global()
@Module({
    providers: [PasswordService,TokenService],
    exports:[PasswordService,TokenService]
})
export class SharedModule {

}