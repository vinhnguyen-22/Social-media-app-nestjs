import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { Post } from 'src/modules/v1/post/entities/post.entity';
import { Role } from 'src/modules/v1/roles/entities/role.entity';
import { EntityHelper } from 'src/modules/v1/utils/entity-helper';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
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

  // For "string | null" we need to use String type.
  @Column({ unique: true, nullable: true, type: String })
  @Expose({ groups: ['me', 'admin'] })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

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
  @BeforeUpdate()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  //   @ManyToOne(() => Role, (role) => role.users, {
  //     eager: true,
  //   })
  //   @JoinColumn()
  //   role: Role;
}
