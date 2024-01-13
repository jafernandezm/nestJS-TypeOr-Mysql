import { Cat } from "src/cats/entities/cat.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";


@Entity()
export class Breed {
    @Column({primary: true, type: 'int', generated: true})
    id : number;
    @Column({type: 'varchar', length: 100, nullable: false})
    name: string;

    @OneToMany(() => Cat, cat => cat.breed)
    cats: Cat[];

    @DeleteDateColumn()
    deletedAt: Date;
}
