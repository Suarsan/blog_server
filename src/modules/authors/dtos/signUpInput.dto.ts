import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SignUpInput {

    @Field()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @Field()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @Field()
    @IsNotEmpty()
    readonly firstname: string;

    @Field()
    @IsNotEmpty()
    readonly lastname: string;

}