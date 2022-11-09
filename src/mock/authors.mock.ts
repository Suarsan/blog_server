import { Author } from "src/modules/authors/entities";

export const mockedAuthors: Author[] =  [
    {
        "id": 1,
        "email": "javiersuarsan@gmail.com",
        "password": "$2b$12$bgstymRKHUGcmIWzPB1v1Oo8GwWyfuNA8ZTNPa1Z8hWBH./0.S5a2",
        "firstname": "León",
        "lastname": "XIII"
    },
    {
        "id": 24,
        "email": "asd@asd.com",
        "password": "$2a$12$5gKMFRK82VZx.jfX8ZcA6.IGEhBwIvCXM2vqW5gU61BM909LNdzd6",
        "firstname": "asd",
        "lastname": "asd"
    }
];

export const mockedSignIn = {
    "id": 24,
    "email": "asd@asd.com",
    "password": "$2a$12$5gKMFRK82VZx.jfX8ZcA6.IGEhBwIvCXM2vqW5gU61BM909LNdzd6",
    "firstname": "asd",
    "lastname": "asd"
};