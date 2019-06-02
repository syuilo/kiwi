import { Entity, Index, JoinColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { FileFolder } from './file-folder';

@Entity()
export class File {
	@PrimaryColumn('varchar')
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the File.'
	})
	public createdAt: Date;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The updated date of the File.'
	})
	public updatedAt: Date;

	@Index()
	@Column('varchar', {
		length: 32,
		comment: 'The MD5 hash of the File.'
	})
	public md5: string;

	@Index()
	@Column('varchar', {
		length: 32,
	})
	public file: string;

	@Column('varchar', {
		length: 256,
		comment: 'The file name of the File.'
	})
	public name: string;

	@Index()
	@Column('varchar', {
		length: 128,
		comment: 'The content type (MIME) of the File.'
	})
	public type: string;

	@Column('integer', {
		comment: 'The file size (bytes) of the File.'
	})
	public size: number;

	@Column('varchar', {
		length: 512, nullable: true,
		comment: 'The comment of the File.'
	})
	public comment: string | null;

	@Column('jsonb', {
		default: {},
		comment: 'The any properties of the File. For example, it includes image width/height.'
	})
	public properties: Record<string, any>;

	@Index()
	@Column({
		type: 'integer',
		nullable: true,
		comment: 'The parent folder ID. If null, it means the File is located in root.'
	})
	public folderId: FileFolder['id'] | null;

	@ManyToOne(type => FileFolder, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	public folder: FileFolder | null;

	constructor(data: Partial<File>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
