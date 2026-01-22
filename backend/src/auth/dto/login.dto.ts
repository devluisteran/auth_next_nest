import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";


export class LoginDto{
    @ApiProperty({
            description: 'Correo electrónico del usuario',
            example: 'example@gmail.com',
        })
    @IsNotEmpty({message:"El email es requerido"})
    @IsEmail({}, {message:"El email no es válido"})
    email: string;

    @ApiProperty({
            description: "Contraseña del usuario",
            example: "Password123!",
            minLength: 8
          })
    @IsNotEmpty({message:"La contraseña es requerida"})
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { 
            message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial' 
        }
    )
    password: string;
}