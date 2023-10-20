import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity('participant')
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: 'text'})
  name: string;
  
  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  phone: string;

  @Column({type: 'text'})
  category: string

  @Column({type: 'text'})
  avatar: string;

  @ManyToMany(() => Event, event => event.participants)
  @JoinTable({
    name: 'event_participant',
    joinColumn: {
      name: 'participant_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'event_id',
      referencedColumnName: 'id'
    }
  })
  events: Event[];
}