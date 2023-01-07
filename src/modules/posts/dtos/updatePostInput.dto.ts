import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { AnalysisInput } from "./analysisInput.dto";
import { ParagraphInput } from "./paragraphInput.dto";
import { TagInput } from "./tagInput.dto";
import { TypeInput } from "./typeInput.dto";

@InputType()
export class UpdatePostInput {

    @Field()
    @IsNotEmpty()
    readonly context: string;
    
    @Field()
    @IsNotEmpty()
    readonly slug: string;
    
    @Field()
    @IsNotEmpty()
    readonly title: string;
    
    @Field()
    readonly metaTitle: string;
    
    @Field()
    readonly metaDescription: string;
    
    @Field()
    readonly image: string;
    
    @Field()
    readonly readTime: number;
    
    @Field()
    @IsNotEmpty()
    readonly type: TypeInput;
    
    @Field()
    readonly analysis: AnalysisInput;
    
    @Field()
    readonly paragraphs: [ParagraphInput];
    
    @Field()
    readonly tags: [TagInput];
    
    @Field()
    readonly parentId: number;

}