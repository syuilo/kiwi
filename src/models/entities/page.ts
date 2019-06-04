import { Entity, Index, JoinColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { File } from './file';

@Entity()
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
		length: 256,
	})
	public subTitle: string;

	@Index()
	@Column('varchar', {
		length: 256, unique: true,
	})
	public path: string;

	@Column('varchar', {
		length: 65536,
	})
	public content: string;

	@Index()
	@Column('varchar', {
		length: 256, default: ''
	})
	public category: string;

	@Index()
	@Column('varchar', {
		length: 128, array: true, default: '{}'
	})
	public tags: string[];

	@Index()
	@Column('varchar', {
		length: 1024, array: true, default: '{}'
	})
	public links: string[];

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

	/**
	 * {
	 *   "tag.a": "foo",
	 *   "tag.b": "bar",
	 *   "tag.c": "baz",
	 * }
	 */
	@Column('jsonb', {
		default: {},
	})
	public attributes: Record<string, any>;

	@Column('varchar', {
		length: 512, nullable: true,
	})
	public commitMessage: string | null;

	@Column('jsonb')
	public ast: any[];

	@Column('jsonb')
	public defAst: any[];

	constructor(data: Partial<Page>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
