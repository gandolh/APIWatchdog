export default interface iUser {
    username: string;
    email: string;
    password: string;
    apps?: [string];
};