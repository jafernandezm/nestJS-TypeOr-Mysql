import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";


@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id : number;
    @Column()
    name: string;
    @Column( {unique: true , nullable: false})
    email: string;
    @Column({nullable: false, select: false}) //select: false para que no se muestre en la respuesta de la API
    password: string;
    // Este es un enum que solo toma los valores de Role admin o user
    @Column({type: 'enum' ,default: Role.USER, enum: Role})
    role : Role;
    @DeleteDateColumn()
    deletedAt: Date;

}
