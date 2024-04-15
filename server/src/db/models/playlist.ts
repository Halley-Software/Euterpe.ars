import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Song } from "./song.js"

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 60, unique: true, nullable: false })
    name: string

    @Column("varchar", { nullable: true })
    image_url: string

    @Column("integer")
    size: number

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Song, (song) => song.id)
    songs: Song[]
}