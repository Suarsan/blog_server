import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddRrssDiffusionInput {

    @Field()
    @IsNotEmpty()
    readonly context: string;
    
    @Field()
    @IsNotEmpty()
    readonly name: string;
    
    @Field()
    readonly content: string;
    
    @Field()
    readonly date: Date;
    
    @Field()
    @IsNotEmpty()
    readonly rrssConnectionName: string;

}