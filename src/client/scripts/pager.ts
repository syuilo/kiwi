export class Pager {
	private endpoint: string;
	private root: any;
	public items: any[] = [];
	public limit = 30;
	public more = false;

	constructor(root: Pager['root'], endpoint: Pager['endpoint']) {
		this.root = root;
		this.endpoint = endpoint;

		this.fetch();
	}

	public fetch() {
		this.root.api(this.endpoint, {
			untilId: this.more ? this.items[this.items.length - 1].id : undefined,
			limit: this.limit + 1
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