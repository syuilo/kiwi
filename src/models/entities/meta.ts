import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Meta {
	@PrimaryColumn()
	public id: number;

	@Column('varchar', {
		length: 128
	})
	public name: string;

	@Column('varchar', {
		length: 1024
	})
	public description: string;

	@Column('varchar', {
		length: 512, array: true, default: '{}'
	})
	public guestPermissions: string[];
}
