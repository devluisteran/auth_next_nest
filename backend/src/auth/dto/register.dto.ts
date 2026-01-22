import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterDto{
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Luis Perez',
        minLength: 3,
        maxLength: 50
      })
    @IsNotEmpty({message:"El nombre es requerido"})
    @IsString({message:"El nombre debe ser un texto"})
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(80, { message: 'El nombre no puede exceder 80 caracteres' })
    name: string;

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