import {Entity} from "../../../../../../src/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "../../../../../../src/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "../../../../../../src/decorator/columns/Column";
import {ManyToOne} from "../../../../../../src/decorator/relations/ManyToOne";
import {Tag} from "./Tag";
import {JoinColumn} from "../../../../../../src/decorator/relations/JoinColumn";
import {RelationId} from "../../../../../../src/decorator/relations/RelationId";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @ManyToOne(type => Tag)
    @JoinColumn()
    tag: Tag;

    @RelationId((post: Post) => post.tag)
    tagId: number;

}