import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./Participant";
import { User } from "./User";

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'text'})
  local: string;

  @Column({ type: 'text'})
  type: string;

  @Column({ type: 'text'})
  date: string;

  @Column({ type: 'text'})
  agents: string;

  @Column({ type: 'text'})
  avatar: string;

  @Column({ type: 'text'})
  url: string;

  @ManyToOne(() => User, user => user.events)
	@JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Participant, participant => participant.events)
	participants: Participant[]
}