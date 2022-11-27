import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AnalysisInput {

    @Field()
    readonly score: string;
    
    @Field()
    readonly pros: string;
    
    @Field()
    readonly cons: string;

}