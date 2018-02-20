import pathToRegex, { Key } from "path-to-regexp";
import { parse } from "url";
import { ParsedUrlQuery } from "querystring"; // necessary to generate types from external module
import { stringify } from "query-string";

export interface RoutesMap {
  [key: string]: Route;
}

/**
 *
 * @param pattern
 */
export const route = (path: string, page?: string) =>
  new Route(path, page ? page : path);

/**
 *
 */
export class Route {
  private _path: string;
  private _page: string;
  private _regex: RegExp;
  private _keys: Key[] = [];

  constructor(path: string, page: string) {
    if (!path) {
      throw Error("You must define a path for this route");
    }
    if (!page) {
      throw Error("You must define a page for this route");
    }
    this._path = path;
    this._regex = pathToRegex(path, this._keys);
    this._page = page;
  }

  get path() {
    return this._path;
  }

  get page() {
    return this._page;
  }

  get regex() {
    return this._regex;
  }

  public match(url: string) {
    return this._regex.test(url);
  }

  public parse(url: string = "") {
    const { query, pathname = "" } = parse(url, true);
    const values = this._regex.exec(pathname);

    if (values) {
      const parameters = values.slice(1);
      const basepath = stripParams(parameters, pathname);
      const paramsAndQuery = mergeParamsAndQuery(parameters, this._keys, query);
      const href = Object.keys(paramsAndQuery).length
        ? `${this.page}?${stringify(paramsAndQuery)}`
        : this.page;

      return {
        basepath,
        paramsAndQuery,
        href
      };
    }
    return {
      pathname,
      paramsAndQuery: query,
      href: pathname
    };
  }
}

export function stripParams(params: string[], pathname: string) {
  return pathname
    .split("/")
    .filter(p => params.indexOf(p) === -1)
    .join("/");
}

export function mergeParamsAndQuery(
  params: string[],
  keys: Key[],
  query: ParsedUrlQuery
) {
  return params.reduce(
    (all, val, i) => ({
      ...all,
      [keys[i].name]: val
    }),
    { ...query }
  );
}
