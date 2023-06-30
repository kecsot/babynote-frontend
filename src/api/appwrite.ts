import { Account, Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || '')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT || '');

const databases = new Databases(client);
const account = new Account(client);

export {
    databases,
    account
}