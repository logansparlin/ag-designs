export function post(url: string, data: any): Promise<any> {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json,text/plain"
    },
  });
}
