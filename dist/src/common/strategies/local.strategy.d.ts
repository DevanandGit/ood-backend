import { Strategy } from 'passport-local';
import { AuthService } from '../../auth/auth.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    validate(...args: any[]): unknown;
    constructor(authService: AuthService);
}
export {};
