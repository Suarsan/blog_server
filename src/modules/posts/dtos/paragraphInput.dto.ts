import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { HtmlTagInput } from "./htmlTagInput.dto";

@InputType()
export class ParagraphInput {

    @Field()
    readonly id: number;
    
    @Field()
    readonly content: string;
    
    @Field()
    readonly classes: string;
   
    @Field()
    readonly htmlTag: HtmlTagInput;
    
    @Field()
    @IsNotEmpty()
    readonly position: number;

}