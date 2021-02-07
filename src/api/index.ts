export default function apiCall({ url, method, body, headers }: any) {
  return fetch(url, {
    method,
    body,
    headers,
  });
}
