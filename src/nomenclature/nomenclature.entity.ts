import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
@Unique(['name'])
export class Nomenclature {
    @PrimaryGeneratedColumn()
    id: number;


    @IsNotEmpty()
    @Column()
    name: string;

}
