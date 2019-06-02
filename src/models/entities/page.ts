import { Entity, Index, JoinColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { File } from './file';
import { Category } from './category';

@Entity()
@Index(['categoryId', 'name'], { unique: true })
@Index(['categoryId', 'title'], { unique: true })
export class Page {
	@PrimaryColumn('varchar')
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the Page.'
	})
	public createdAt: Date;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The updated date of the Page.'
	})
	public updatedAt: Date;

	@Column('varchar', {
		length: 256,
	})
	public title: string;

	@Column('varchar', {
		length: 256, nullable: true
	})
	public subTitle: string | null;

	@Index()
	@Column('varchar', {
		length: 256,
	})
	public name: string;

	@Column('varchar', {
		length: 65536,
	})
	public content: string;

	@Column({
		type: 'integer',
		nullable: true,
	})
	public eyeCatchingImageId: File['id'] | null;

	@ManyToOne(type => File, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	public eyeCatchingImage: File | null;

	@Column({
		type: 'integer',
		nullable: true,
	})
	public categoryId: Category['id'] | null;

	@ManyToOne(type => Category, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	public category: Category | null;

	/**
	 * "categoryId": {
	 *   "a": "foo",
	 *   "b": "bar",
	 *   "c": "baz",
	 * }
	 */
	@Column('jsonb', {
		default: {},
	})
	public attributes: Record<string, any>;

	@Column('jsonb')
	public ast: Record<string, any>;

	constructor(data: Partial<Page>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
