import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class ApiTwitterService {

    private authClient;

    constructor(private http: HttpService) {}

    private customEncode(value) {
        return encodeURIComponent(value);
    }
    
    async createSignatureOauth1a() {

        const http_method = 'POST';
        const url = "https://api.twitter.com/1.1/statuses/update.json";
        const nonce = crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 32).replace(/\+/g, '0').replace(/\//g, '0');
        const timestamp = Math.floor(Date.now() / 1000);
        const status = "Hello";
        const include_entities = true;
        const oauthConsumerKey = "6OkNZ72lXI0QoZFG8miMIKpzf";
        const oauthSignatureMethod = "HMAC-SHA1";
        const oauthToken = "1676320791758004225-GyaOvia3giEQbu4EKzBTwL2oscaVBH";
        const oauthVersion = "1.0";
        const consumerSecret = "izTpZktlHv3NkEFkz6TtqvxfMqhwV4VUxPBsnGmSsUZRnVXCpp";
        const oauthTokenSecret = "qdM8SOyt6ucAkbuHHiCbUpzVWqmacjoesQfDvRXDRiydQ";

        const parameters = {
            include_entities: this.customEncode(include_entities),
            oauth_consumer_key: this.customEncode(oauthConsumerKey),
            oauth_nonce: this.customEncode(nonce),
            oauth_signature_method: this.customEncode(oauthSignatureMethod),
            oauth_timestamp: this.customEncode(timestamp),
            oauth_token: this.customEncode(oauthToken),
            oauth_version: this.customEncode(oauthVersion),
            status: this.customEncode(status)
        };

        let parameter_string = '';
        for (let parameter in parameters) {
            if (parameter_string === '') {
                parameter_string += `${parameter}=${parameters[parameter]}`;
                continue;
            }
            parameter_string += `&${parameter}=${parameters[parameter]}`;
        }

        const signature_base_string = `${http_method}&${this.customEncode(url)}&${this.customEncode(parameter_string)}` 

        const consumer_secret = this.customEncode(consumerSecret);
        const oauth_token_secret = this.customEncode(oauthTokenSecret);
        const signinkey = `${consumer_secret}&${oauth_token_secret}`;
        const oauth_signature = crypto.createHmac('sha1', signinkey).update(signature_base_string).digest('base64');

        const parameters2 = {
            oauth_consumer_key: this.customEncode(oauthConsumerKey),
            oauth_token: this.customEncode(oauthToken),
            oauth_signature_method: this.customEncode(oauthSignatureMethod),
            oauth_timestamp: this.customEncode(timestamp),
            oauth_nonce: this.customEncode(nonce),
            oauth_version: this.customEncode(oauthVersion),
            oauth_signature: this.customEncode(oauth_signature)
        };

        let authorization = 'OAuth ';
        for (let parameter in parameters2) {
            if (authorization === '') {
                authorization += `OAuth ${parameter}="${parameters2[parameter]}"`;
                continue;
            }
            authorization += `, ${parameter}="${parameters2[parameter]}"`;
        }

        const body = { status };
        const options = { headers: {
            "Authorization": authorization,
            "Content-Type": "application/x-www-form-urlencoded"
        }};
        return await lastValueFrom(this.http.post("https://api.twitter.com/1.1/statuses/update.json?include_entities=true", body, options).pipe(
            catchError(e => e.response?.data?.errors )
        )); 
    }

}
