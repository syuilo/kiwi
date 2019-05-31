import { Entity, Index, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column('varchar', {
		length: 256, unique: true,
	})
	public title: string;

	@Index()
	@Column('varchar', {
		length: 256, unique: true,
	})
	public name: string;

	/**
	 * [{
	 *   "title": "a",
	 * }, {
	 *   "title": "b",
	 * }, {
	 *   "title": "c",
	 * }]
	 */
	@Column('jsonb', {
		default: []
	})
	public attributes: Record<string, any>[];

	constructor(data: Partial<Category>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
