import { Client, Databases } from 'appwrite';

// TODO: env
const client = new Client()
    .setEndpoint('http://localhost:8089/v1') 
    .setProject('6495f54f096521a23f40');

const databases = new Databases(client);

export {
    databases
}