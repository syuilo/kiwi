import { JoinColumn, ManyToOne, Entity, Index, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FileFolder {
	@PrimaryColumn('varchar')
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the FileFolder.'
	})
	public createdAt: Date;

	@Column('varchar', {
		length: 128,
		comment: 'The name of the FileFolder.'
	})
	public name: string;

	@Index()
	@Column({
		type: 'integer',
		nullable: true,
		comment: 'The parent folder ID. If null, it means the FileFolder is located in root.'
	})
	public parentId: FileFolder['id'] | null;

	@ManyToOne(type => FileFolder, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	public parent: FileFolder | null;
}
