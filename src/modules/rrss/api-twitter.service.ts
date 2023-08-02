import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable()
export class ApiTwitterService {

    constructor(private http: HttpService) {}


    async tweet(tokens, text) {

        const http_method = 'POST';
        const url = "https://api.twitter.com/2/tweets";
        const nonce = crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 32).replace(/\+/g, '0').replace(/\//g, '0');
        const timestamp = Math.floor(Date.now() / 1000);
        const oauthVersion = "1.0";
        const oauthSignatureMethod = "HMAC-SHA1";
        const oauthConsumerKey = tokens.oauthConsumerKey;
        const oauthConsumerSecret = tokens.oauthConsumerSecret;
        const oauthToken = tokens.oauthToken; 
        const oauthTokenSecret = tokens.oauthTokenSecret;

        const parameters = {
            oauth_consumer_key: this.customEncode(oauthConsumerKey),
            oauth_nonce: this.customEncode(nonce),
            oauth_signature_method: this.customEncode(oauthSignatureMethod),
            oauth_timestamp: this.customEncode(timestamp),
            oauth_token: this.customEncode(oauthToken),
            oauth_version: this.customEncode(oauthVersion)
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

        const consumer_secret = this.customEncode(oauthConsumerSecret);
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

        let authorization = '';
        for (let parameter in parameters2) {
            if (authorization === '') {
                authorization += `OAuth ${parameter}="${parameters2[parameter]}"`;
                continue;
            }
            authorization += `,${parameter}="${parameters2[parameter]}"`;
        }

        const body = { text };
        const options = { headers: {
            "Authorization": authorization
        }};
        const response = await firstValueFrom(this.http.post(url, body, options).pipe(
            map(o => o.data),
            catchError(err => of(err.response.data) )
        )); 
        return response;
    }

    private customEncode(value) {
        return encodeURIComponent(value);
    }

}
