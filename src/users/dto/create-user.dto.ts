



export class CreateUserDto {
    email: string;
    
    //Como proteger el password en la base de datos con NestJS
    password: string;
    name?: string;
}
