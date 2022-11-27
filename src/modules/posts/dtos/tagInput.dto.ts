import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class TagInput {

    @Field()
    @IsNotEmpty()
    readonly id: number;
    
    @Field()
    readonly content: string;

}