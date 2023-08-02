import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateRrssConnectionInput {

    @Field()
    @IsNotEmpty()
    readonly context: string;
    
    @Field()
    @IsNotEmpty()
    readonly name: string;
    
    @Field()
    readonly tokens: string;
    
    @Field()
    @IsNotEmpty()
    readonly typeId: number;

}