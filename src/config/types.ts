/**
 * ユーザーが設定する必要のある情報
 */
export type Source = {
	url: string;
	port: number;
	https?: { [x: string]: string };
	disableHsts?: boolean;
	db: {
		host: string;
		port: number;
		db: string;
		user: string;
		pass: string;
		extra?: { [x: string]: string };
	};
	clusterLimit?: number;
};

/**
 * 自動的に(ユーザーが設定した情報から推論して)設定する情報
 */
export type Mixin = {
	host: string;
	hostname: string;
	scheme: string;
};

export type Config = Source & Mixin;
