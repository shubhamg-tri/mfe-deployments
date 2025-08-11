/**
 * CloudFront Function to handle URI rewriting for microfrontend routing
 * Runtime: cloudfront-js-2.0
 * 
 * This function handles client-side routing for microfrontends built with
 * webpack module federation by rewriting URIs to serve index.html for
 * non-file requests and managing remote app asset routing
 */
async function handler(event) {
  const request = event.request;
  const uri = request.uri;
  const headers = request.headers;

  // Extract referer header (case-insensitive)
  const refererHeader = headers['referer'] || headers['Referer'] || null;
  const refererValue = refererHeader ? refererHeader.value : '';

  // Check if this is a request for remote app assets (has more than 2 path segments)
  const isRemoteAppAssets = uri.split('/').length > 2;

  // Case 1: URI ends with slash - append index.html
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // Case 2: URI has no file extension - likely a route that needs index.html
  else if (!uri.includes('.')) {
    if (isRemoteAppAssets) {
      // For remote app assets, rewrite to first segment + index.html
      request.uri = '/' + uri.split('/')[1] + '/index.html';
    } else {
      // For root-level routes, append index.html
      request.uri += '/index.html';
    }
  }
  // Case 3: URI has file extension and is remote app assets - keep as is
  else if (isRemoteAppAssets) {
    request.uri = uri;
  }
  // Case 4: URI has file extension and referer exists - handle nested routing
  else if (refererValue) {
    // Extract the app path from referer (4th segment after domain)
    // eg: For https://dibzupfv5xve3.cloudfront.net/films the appPath will be films
    const refererPathSegments = refererValue.split('/');
    const appPath = refererPathSegments[3];

    // If app path doesn't have file extension, prepend it to current URI
    if (appPath && !appPath.includes('.')) {
      request.uri = '/' + appPath + uri;
    }
  }

  return request;
}