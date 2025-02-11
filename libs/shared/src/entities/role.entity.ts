<<<<<<< HEAD
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "./permission.entity";
=======
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
// import {Permission} from "./permission.entity";
>>>>>>> f745d733 (updated backend for fullstack app)

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

<<<<<<< HEAD
=======
    @OneToMany(type => User , (user) => user.role)
    user: User[];

>>>>>>> f745d733 (updated backend for fullstack app)
    // @ManyToMany(() => Permission, {cascade: true})
    // @JoinTable({
    //     name: 'role_permissions',
    //     joinColumn: {name: 'role_id', referencedColumnName: 'id'},
    //     inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
    // })
    // permissions: Permission[];
}
