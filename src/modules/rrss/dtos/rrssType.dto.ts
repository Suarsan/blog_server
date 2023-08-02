import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class RrssTypeInput {

    @Field()
    @IsNotEmpty()
    readonly context: string;
    
    @Field()
    @IsNotEmpty()
    readonly name: string;

}