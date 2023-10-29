import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export class Praise {
    situation: string;
    task: string;
    action: string;
    result: string;
}
@Entity('star')
export class Star {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    who: string;
    @Column()
    to: string;
    @Column()
    content: string ;
}
