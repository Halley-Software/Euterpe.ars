import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.js";
import { Playlist } from "./playlist.js";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 60 })
    name: string

    @Column("varchar", { length: 100, nullable: false, unique: true, default: "" })
    url: string

    @Column("integer")
    duration: number

    @CreateDateColumn()
    added_at: Date

    @ManyToMany(() => Artist, (artist) => artist.id)
    @JoinTable()
    artist: Artist[]

    @ManyToMany(() => Playlist, (pl) => pl.id)
    @JoinTable()
    playlist: Playlist[]
}