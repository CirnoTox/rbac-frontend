
type RequestMethod = "GET" | "POST" | "PUT" | "Delete";
type RequestBody = object;
type UrlString = string;

class ApiFetcher {
  method: RequestMethod;
  body: RequestBody;
  url: UrlString;
  constructor(url: UrlString, method: RequestMethod, body: RequestBody) {
    this.url = url;
    this.method = method;
    this.body = body;
  }

  async fetchApi() {
    return await fetch(this.url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: this.method,
      body: JSON.stringify(this.body)
    });
  }

  safeJsonParse<T>(str: string) {
    try {
      const jsonValue: T = JSON.parse(str);
      return jsonValue;
    } catch {
      return undefined;
    }
  }
}

class ApiAuthFetcher extends ApiFetcher {
  constructor(body: RequestBody) {
    super("http://localhost:8080/api/Auth", "POST", body);
  }
}

export { ApiFetcher, ApiAuthFetcher };