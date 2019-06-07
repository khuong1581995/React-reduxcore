/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // console.log(response.json());
  // response.json().then(result => {
  //   // if(result.data.error_cod)
  // });
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response);
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

/* eslint no-param-reassign: ["error", { "props": false }] */

export default function request(url, options) {
  const newHeaders = Object.assign(
    // {
    //   'Content-Type': 'application/json',
    // },
    options.headers,
  );
  options.headers = newHeaders;
  // options.credentials = 'include';

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function requestFile(url, options) {
  const newHeaders = Object.assign(options.headers);
  options.headers = newHeaders;
  options.credentials = 'include';

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function requestUploadImage(url, options) {
  const newHeaders = Object.assign(options.headers);
  options.headers = newHeaders;

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
