import { Entity, Index, JoinColumn, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Commit {
	@PrimaryGeneratedColumn()
	public id: number;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the Commit.'
	})
	public createdAt: Date;

	@Index()
	@Column('varchar', {
		length: 128,
	})
	public type: string;

	@Index()
	@Column('varchar', {
		length: 16,
	})
	public action: string;

	@Index()
	@Column('varchar', {
		length: 32,
	})
	public key: string;

	@Column('varchar', {
		length: 512, nullable: true,
		comment: 'The comment of the Commit.'
	})
	public message: string | null;

	@Column('jsonb', {
		default: {},
	})
	public data: Record<string, any>;

	@Index()
	@Column('integer')
	public userId: User['id'];

	@ManyToOne(type => User, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	public user: User | null;

	constructor(data: Partial<Commit>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
