declare const _LANGS_: string[];
declare const _VERSION_: string;
declare const _ENV_: string;

const address = new URL(location.href);

export const host = address.host;
export const hostname = address.hostname;
export const url = address.origin;
export const langs = _LANGS_;
export const version = _VERSION_;
export const env = _ENV_;
export const wikiName = document.head.querySelector('[property="og:site_name"][content]').content;
