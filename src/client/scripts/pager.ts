export class Pager {
	private endpoint: string;
	private root: any;
	private params: any;
	public items: any[] = [];
	public limit = 30;
	public more = false;

	constructor(root: Pager['root'], endpoint: Pager['endpoint'], params: Pager['params'] = {}) {
		this.root = root;
		this.endpoint = endpoint;
		this.params = params;

		this.fetch();
	}

	public fetch() {
		this.root.api(this.endpoint, {
			untilId: this.more ? this.items[this.items.length - 1].id : undefined,
			limit: this.limit + 1,
			...this.params
		}).then(items => {
			if (items.length === this.limit + 1) {
				items.pop();
				this.more = true;
			} else {
				this.more = false;
			}
			this.items = items;
		});
	}
}
