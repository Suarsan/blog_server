import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteRrssDiffusionInput {

    @Field()
    @IsNotEmpty()
    readonly context: string;
    
    @Field()
    @IsNotEmpty()
    readonly name: string;

}