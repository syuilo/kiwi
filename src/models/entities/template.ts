import { Entity, Index, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Template {
	@PrimaryColumn('varchar')
	public id: string;

	@Index()
	@Column('varchar', {
		length: 256, unique: true,
	})
	public name: string;

	@Column('varchar', {
		length: 128, array: true, default: '{}'
	})
	public attributes: string[];

	constructor(data: Partial<Template>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
