const redirectUri = `${window.location.origin}/`

// GENERAL HELPER FUNCTIONS
<<<<<<< HEAD:assets/js/oauth.js

/**
 * Makes a POST request and parse the response as JSON
 *
 * @param {String} url - The resource
 * @param {Object} params - Configuration options
 * @returns {Object}
 */

const sendPostRequest = async (url, params) => {
  const body = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")
=======
// Make a POST request and parse the response as JSON
const sendPostRequest = async (
  url: string,
  params: {
    grant_type: string;
    code: string;
    client_id: string;
    redirect_uri: string;
    code_verifier: string;
  }
) => {
  let body = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body,
  }
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  } catch (err) {
    console.error("Request failed", err)
    throw err
  }
<<<<<<< HEAD:assets/js/oauth.js
}

/**
 * Parse a query string into an object
 *
 * @param {String} searchQuery - The search query params
 * @returns {Object}
 */

const parseQueryString = (searchQuery) => {
  if (searchQuery === "") {
    return {}
  }
  const segments = searchQuery.split("&").map((s) => s.split("="))
  const queryString = segments.reduce((obj, el) => ({ ...obj, [el[0]]: el[1] }), {})
  return queryString
}

/**
 * Get OAuth configuration from OpenID Discovery endpoint
 *
 * @returns {Object}
 */

const getTokenConfiguration = async (endpoint) => {
=======
};
// Parse a query string into an object
const parseQueryString = (queryString: string) => {
  if (queryString === "") {
    return {};
  }
  let segments = queryString.split("&").map(s => s.split("="));
  let queries: { [key: string]: string } = {};
  segments.forEach(s => (queries[s[0]] = s[1]));
  return queries;
};

// Get OAuth configuration from OpenID Discovery endpoint
const getTokenConfiguration = async (endpoint: string) => {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }
  try {
    const response = await fetch(endpoint, options)
    const config = await response.json()
    return config
  } catch (err) {
    console.error("Request failed", err)
    throw err
  }
}

// PKCE HELPER FUNCTIONS

/**
 * Generates a secure random string using the browser crypto functions
 *
 * @returns {Object}
 */

const generateRandomString = () => {
<<<<<<< HEAD:assets/js/oauth.js
  const array = new Uint32Array(28)
  window.crypto.getRandomValues(array)
  return Array.from(array, (dec) => `0${dec.toString(16)}`.substr(-2)).join("")
}

/**
 * Calculate the SHA256 hash of the input text
 *
 * @returns {Promise<ArrayBuffer>}
 */

const sha256 = (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest("SHA-256", data)
}

/**
 * Encodes the input string into Base64 format
 *
 * @param {String} str - The string to be converted
 * @returns {Promise<ArrayBuffer>}
 */

const base64urlencode = (
  str // Converts the ArrayBuffer to string using Uint8 array to convert to what btoa accepts.
) =>
=======
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => `0${dec.toString(16)}`.substr(-2)).join("");
};
// Calculate the SHA256 hash of the input text.
// Returns a promise that resolves to an ArrayBuffer
const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
// Base64-urlencodes the input string
const base64urlencode = (
  str: ArrayBuffer // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
) => {
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
  // btoa accepts chars only within ascii 0-255 and base64 encodes them.
  // Then convert the base64 encoded to base64url encoded
  //   (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(str)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
<<<<<<< HEAD:assets/js/oauth.js
    .replace(/=+$/, "")

/**
 * Return the base64-urlencoded sha256 hash for the PKCE challenge
 *
 * @param {String} v - The randomly generated string
 * @returns {String}
 */

const pkceChallengeFromVerifier = async (v) => {
  const hashed = await sha256(v)
  return base64urlencode(hashed)
}

=======
    .replace(/=+$/, "");
};

// Return the base64-urlencoded sha256 hash for the PKCE challenge
const pkceChallengeFromVerifier = async (v: string) => {
  let hashed = await sha256(v);
  return base64urlencode(hashed);
};

//////////////////////////////////////////////////////////////////////
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
// OAUTH REQUEST

/**
 * Initiates PKCE Auth Code flow when requested
 *
 * @param {Object} - The necessary params
 * @returns {Void}
 */

const tokenRequest = async ({
  oidcDiscoveryUrl,
  grantType,
  authUrl,
  accessTokenUrl,
  clientId,
<<<<<<< HEAD:assets/js/oauth.js
  scope,
=======
  scope
}: {
  oidcDiscoveryUrl: string;
  grantType: string;
  authUrl: string;
  accessTokenUrl: string;
  clientId: string;
  scope: string;
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
}) => {
  // Check oauth configuration
  if (oidcDiscoveryUrl !== "") {
    const { authorization_endpoint, token_endpoint } = await getTokenConfiguration(oidcDiscoveryUrl)
    authUrl = authorization_endpoint
    accessTokenUrl = token_endpoint
  }

  // Store oauth information
  localStorage.setItem("token_endpoint", accessTokenUrl)
  localStorage.setItem("client_id", clientId)

  // Create and store a random state value
  const state = generateRandomString()
  localStorage.setItem("pkce_state", state)

  // Create and store a new PKCE code_verifier (the plaintext random secret)
  const code_verifier = generateRandomString()
  localStorage.setItem("pkce_code_verifier", code_verifier)

  // Hash and base64-urlencode the secret to use as the challenge
  const code_challenge = await pkceChallengeFromVerifier(code_verifier)

  // Build the authorization URL
  const buildUrl = () =>
    `${authUrl + `?response_type=${grantType}`}&client_id=${encodeURIComponent(
      clientId
    )}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge=${encodeURIComponent(
      code_challenge
    )}&code_challenge_method=S256`

  // Redirect to the authorization server
<<<<<<< HEAD:assets/js/oauth.js
  window.location = buildUrl()
}
=======
  window.location.href = buildUrl();
};
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts

// OAUTH REDIRECT HANDLING

/**
 * Handle the redirect back from the authorization server and
 * get an access token from the token endpoint
 *
 * @returns {Object}
 */

const oauthRedirect = async () => {
  let tokenResponse = ""
  let q = parseQueryString(window.location.search.substring(1))
  // Check if the server returned an error string
  if (q.error) {
    alert(`Error returned from authorization server: ${q.error}`)
  }
  // If the server returned an authorization code, attempt to exchange it for an access token
  if (q.code) {
    // Verify state matches what we set at the beginning
    if (localStorage.getItem("pkce_state") != q.state) {
      alert("Invalid state")
    } else {
      try {
        // Exchange the authorization code for an access token
<<<<<<< HEAD:assets/js/oauth.js
        tokenResponse = await sendPostRequest(localStorage.getItem("token_endpoint"), {
          grant_type: "authorization_code",
          code: q.code,
          client_id: localStorage.getItem("client_id"),
          redirect_uri: redirectUri,
          code_verifier: localStorage.getItem("pkce_code_verifier"),
        })
      } catch (err) {
        console.log(`${error.error}\n\n${error.error_description}`)
=======
        const tokenEndpoint = localStorage.getItem("token_endpoint");
        const clientId = localStorage.getItem("client_id");
        const codeVerifier = localStorage.getItem("pkce_code_verifier");
        if (
          tokenEndpoint === null ||
          clientId === null ||
          codeVerifier === null
        )
          return;
        tokenResponse = await sendPostRequest(tokenEndpoint, {
          grant_type: "authorization_code",
          code: q.code,
          client_id: clientId,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        });
      } catch (err) {
        console.log(`${err.error}\n\n${err.error_description}`);
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:assets/js/oauth.ts
      }
    }
    // Clean these up since we don't need them anymore
    localStorage.removeItem("pkce_state")
    localStorage.removeItem("pkce_code_verifier")
    localStorage.removeItem("token_endpoint")
    localStorage.removeItem("client_id")
    return tokenResponse
  }
  return tokenResponse
}

export { tokenRequest, oauthRedirect }
