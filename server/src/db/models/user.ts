import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 60 })
    name: string

    @Column("integer")
    songs: number

    @CreateDateColumn()
    registered_at: Date
}