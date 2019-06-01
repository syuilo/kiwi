export function api(endpoint: string, data: Record<string, any> = {}) {
	if (localStorage.getItem('i')) data['i'] = localStorage.getItem('i');
	return new Promise((resolve, reject) => {
		fetch(`/api/${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'omit',
			cache: 'no-cache'
		}).then(async (res) => {
			const body = res.status === 204 ? null : await res.json();

			if (res.status === 200) {
				resolve(body);
			} else if (res.status === 204) {
				resolve();
			} else {
				reject(body.error);
			}
		}).catch(reject);
	});
}
