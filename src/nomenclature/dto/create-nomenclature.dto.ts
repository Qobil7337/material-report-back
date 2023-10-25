import {IsString} from "class-validator";

export class CreateNomenclatureDto {
    @IsString()
    readonly name: string;
}
