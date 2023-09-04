import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Post } from 'src/v1/post/entities/post.entity';
import { EntityHelper } from 'src/v1/utils/entity-helper';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column()
  gender: boolean;

  @Column({ nullable: true })
  avatar: string | null;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  refreshToken: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  //   @ManyToOne(() => Role, (role) => role.users, {
  //     eager: true,
  //   })
  //   @JoinColumn()
  //   role: Role;
}
