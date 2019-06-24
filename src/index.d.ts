interface Options {
    enableCors?: Boolean;
    onSuccess?: Function;
    onFailure?: Function;
}
declare const contribution: (username?: string, options?: Options) => Promise<unknown>;
export = contribution;
