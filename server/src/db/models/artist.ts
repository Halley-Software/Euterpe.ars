import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Song } from "./song.js"


@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 60, unique: true, nullable: false })
    name: string

    @Column("integer")
    size: number

    @CreateDateColumn()
    registered_at: Date

    @OneToMany(() => Song, song => song.artist)
    songs: Song[]
}