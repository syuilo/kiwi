import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the User.'
	})
	public createdAt: Date;

	@Index({ unique: true })
	@Column('varchar', {
		length: 128, unique: true,
		comment: 'The name of the User.'
	})
	public name: string;

	@Column('varchar', {
		length: 512, array: true, default: '{}'
	})
	public permissions: string[];

	@Index({ unique: true })
	@Column('char', {
		length: 16, unique: true,
		comment: 'The native access token of the User.'
	})
	public token: string | null;

	constructor(data: Partial<User>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
