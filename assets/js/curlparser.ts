<<<<<<< HEAD:assets/js/curlparser.js
import * as cookie from "cookie"
import * as URL from "url"
import * as querystring from "querystring"
=======
import * as cookie from "cookie";
import * as URL from "url";
import * as querystring from "querystring";
import yargs from "yargs-parser";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts

/**
 * given this: [ 'msg1=value1', 'msg2=value2' ]
 * output this: 'msg1=value1&msg2=value2'
 * @param dataArguments
 */
<<<<<<< HEAD:assets/js/curlparser.js
const joinDataArguments = (dataArguments) => {
  let data = ""
=======
const joinDataArguments = (dataArguments: string[]) => {
  let data = "";
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  dataArguments.forEach((argument, i) => {
    if (i === 0) {
      data += argument
    } else {
      data += `&${argument}`
    }
  })
  return data
}

<<<<<<< HEAD:assets/js/curlparser.js
const parseCurlCommand = (curlCommand) => {
  let newlineFound = /\r|\n/.exec(curlCommand)
=======
const parseCurlCommand = (curlCommand: string) => {
  let newlineFound = /\r|\n/.exec(curlCommand);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  if (newlineFound) {
    // remove newlines
    curlCommand = curlCommand.replace(/\r|\n/g, "")
  }
  // yargs parses -XPOST as separate arguments. just prescreen for it.
<<<<<<< HEAD:assets/js/curlparser.js
  curlCommand = curlCommand.replace(/ -XPOST/, " -X POST")
  curlCommand = curlCommand.replace(/ -XGET/, " -X GET")
  curlCommand = curlCommand.replace(/ -XPUT/, " -X PUT")
  curlCommand = curlCommand.replace(/ -XPATCH/, " -X PATCH")
  curlCommand = curlCommand.replace(/ -XDELETE/, " -X DELETE")
  curlCommand = curlCommand.trim()
  let parsedArguments = require("yargs-parser")(curlCommand)
  let cookieString
  let cookies
  let url = parsedArguments._[1]
=======
  curlCommand = curlCommand.replace(/ -XPOST/, " -X POST");
  curlCommand = curlCommand.replace(/ -XGET/, " -X GET");
  curlCommand = curlCommand.replace(/ -XPUT/, " -X PUT");
  curlCommand = curlCommand.replace(/ -XPATCH/, " -X PATCH");
  curlCommand = curlCommand.replace(/ -XDELETE/, " -X DELETE");
  curlCommand = curlCommand.trim();
  let parsedArguments = yargs(curlCommand);
  let cookieString;
  let cookies;
  let url = parsedArguments._[1];
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  if (!url) {
    for (let argName in parsedArguments) {
      if (typeof parsedArguments[argName] === "string") {
        if (["http", "www."].includes(parsedArguments[argName])) {
          url = parsedArguments[argName]
        }
      }
    }
  }
<<<<<<< HEAD:assets/js/curlparser.js
  let headers

  const parseHeaders = (headerFieldName) => {
=======

  let headers: {
    [key: string]: string;
  } = {};

  const parseHeaders = (headerFieldName: string) => {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
    if (parsedArguments[headerFieldName]) {
      if (!headers) {
        headers = {}
      }
      if (!Array.isArray(parsedArguments[headerFieldName])) {
        parsedArguments[headerFieldName] = [parsedArguments[headerFieldName]]
      }
<<<<<<< HEAD:assets/js/curlparser.js
      parsedArguments[headerFieldName].forEach((header) => {
=======
      parsedArguments[headerFieldName].forEach((header: string) => {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
        if (header.includes("Cookie")) {
          // stupid javascript tricks: closure
          cookieString = header
        } else {
          let colonIndex = header.indexOf(":")
          let headerName = header.substring(0, colonIndex)
          let headerValue = header.substring(colonIndex + 1).trim()
          headers[headerName] = headerValue
        }
      })
    }
  }

  parseHeaders("H")
  parseHeaders("header")
  if (parsedArguments.A) {
    if (!headers) {
<<<<<<< HEAD:assets/js/curlparser.js
      headers = []
=======
      headers = {};
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
    }
    headers["User-Agent"] = parsedArguments.A
  } else if (parsedArguments["user-agent"]) {
    if (!headers) {
<<<<<<< HEAD:assets/js/curlparser.js
      headers = []
=======
      headers = {};
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
    }
    headers["User-Agent"] = parsedArguments["user-agent"]
  }

  if (parsedArguments.b) {
    cookieString = parsedArguments.b
  }
  if (parsedArguments.cookie) {
    cookieString = parsedArguments.cookie
  }
<<<<<<< HEAD:assets/js/curlparser.js
  let multipartUploads
=======

  let multipartUploads: {
    [key: string]: string;
  } = {};
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  if (parsedArguments.F) {
    multipartUploads = {}
    if (!Array.isArray(parsedArguments.F)) {
      parsedArguments.F = [parsedArguments.F]
    }
<<<<<<< HEAD:assets/js/curlparser.js
    parsedArguments.F.forEach((multipartArgument) => {
=======
    parsedArguments.F.forEach((multipartArgument: string) => {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
      // input looks like key=value. value could be json or a file path prepended with an @
      const [key, value] = multipartArgument.split("=", 2)
      multipartUploads[key] = value
    })
  }
  if (cookieString) {
<<<<<<< HEAD:assets/js/curlparser.js
    const cookieParseOptions = {
      decode: (s) => s,
    }
=======
    const cookieParseOptions: cookie.CookieParseOptions = {
      decode: s => s
    };
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
    // separate out cookie headers into separate data structure
    // note: cookie is case insensitive
    cookies = cookie.parse(cookieString.replace(/^Cookie: /gi, ""), cookieParseOptions)
  }
  let method
  if (parsedArguments.X === "POST") {
    method = "post"
  } else if (parsedArguments.X === "PUT" || parsedArguments["T"]) {
    method = "put"
  } else if (parsedArguments.X === "PATCH") {
    method = "patch"
  } else if (parsedArguments.X === "DELETE") {
    method = "delete"
  } else if (parsedArguments.X === "OPTIONS") {
    method = "options"
  } else if (
    (parsedArguments["d"] ||
      parsedArguments["data"] ||
      parsedArguments["data-ascii"] ||
      parsedArguments["data-binary"] ||
      parsedArguments["F"] ||
      parsedArguments["form"]) &&
    !(parsedArguments["G"] || parsedArguments["get"])
  ) {
    method = "post"
  } else if (parsedArguments["I"] || parsedArguments["head"]) {
    method = "head"
  } else {
    method = "get"
  }

  let compressed = !!parsedArguments.compressed
  let urlObject = URL.parse(url) // eslint-disable-line

  // if GET request with data, convert data to query string
  // NB: the -G flag does not change the http verb. It just moves the data into the url.
  if (parsedArguments["G"] || parsedArguments["get"]) {
    urlObject.query = urlObject.query ? urlObject.query : ""
    let option = "d" in parsedArguments ? "d" : "data" in parsedArguments ? "data" : null
    if (option) {
      let urlQueryString = ""

      if (!url.includes("?")) {
        url += "?"
      } else {
        urlQueryString += "&"
      }

      if (typeof parsedArguments[option] === "object") {
        urlQueryString += parsedArguments[option].join("&")
      } else {
        urlQueryString += parsedArguments[option]
      }
      urlObject.query += urlQueryString
      url += urlQueryString
      delete parsedArguments[option]
    }
  }
<<<<<<< HEAD:assets/js/curlparser.js
  let query = querystring.parse(urlObject.query, null, null, {
    maxKeys: 10000,
  })

  urlObject.search = null // Clean out the search/query portion.
  const request = {
=======
  let query: querystring.ParsedUrlQuery | null = null;
  if (urlObject.query) {
    query = querystring.parse(urlObject.query, undefined, undefined, {
      maxKeys: 10000
    });
  }

  urlObject.search = null; // Clean out the search/query portion.
  type Request = {
    url: string;
    urlWithoutQuery: string;
    compressed?: boolean;
    query?: querystring.ParsedUrlQuery;
    headers?: typeof headers;
    method?: string;
    cookies?: typeof cookies;
    cookieString?: string;
    multipartUploads?: typeof multipartUploads;
    data?: string | string[];
    dataArray?: string[];
    isDataBinary?: boolean;
    auth?: string;
    insecure?: boolean;
  };
  const request: Request = {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
    url,
    urlWithoutQuery: URL.format(urlObject),
  }
  if (compressed) {
    request["compressed"] = true
  }

<<<<<<< HEAD:assets/js/curlparser.js
  if (Object.keys(query).length > 0) {
    request.query = query
=======
  if (!!query && Object.keys(query).length > 0) {
    request.query = query;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  }
  if (headers) {
    request.headers = headers
  }
  request["method"] = method

  if (cookies) {
    request.cookies = cookies
    request.cookieString = cookieString.replace("Cookie: ", "")
  }
  if (multipartUploads) {
    request.multipartUploads = multipartUploads
  }
  if (parsedArguments.data) {
    request.data = parsedArguments.data
  } else if (parsedArguments["data-binary"]) {
    request.data = parsedArguments["data-binary"]
    request.isDataBinary = true
  } else if (parsedArguments["d"]) {
    request.data = parsedArguments["d"]
  } else if (parsedArguments["data-ascii"]) {
    request.data = parsedArguments["data-ascii"]
  }

  if (parsedArguments["u"]) {
    request.auth = parsedArguments["u"]
  }
  if (parsedArguments["user"]) {
    request.auth = parsedArguments["user"]
  }
<<<<<<< HEAD:assets/js/curlparser.js
  if (Array.isArray(request.data)) {
    request.dataArray = request.data
    request.data = joinDataArguments(request.data)
=======
  if (typeof request.data !== "string" && !!request.data) {
    request.dataArray = request.data;
    request.data = joinDataArguments(request.data);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/curlparser.ts
  }

  if (parsedArguments["k"] || parsedArguments["insecure"]) {
    request.insecure = true
  }
  return request
}

export default parseCurlCommand
