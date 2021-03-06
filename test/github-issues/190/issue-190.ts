import "reflect-metadata";
import {createTestingConnections, closeTestingConnections, reloadTestingDatabases} from "../../utils/test-utils";
import {Connection} from "../../../src/connection/Connection";
import {Post} from "./entity/Post";

describe("github issues > #190 too many SQL variables when using setMaxResults in SQLite", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchemaOnConnection: true,
        enabledDrivers: ["sqlite"] // this issue only related to sqlite
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not fail if high max results is used", () => Promise.all(connections.map(async connection => {

        for (let i = 0; i < 1000; i++) {
            const post1 = new Post();
            post1.title = "Hello Post #1";
            await connection.entityManager.persist(post1);
        }

        const loadedPosts = await connection.entityManager
            .createQueryBuilder(Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .take(1000)
            .getMany();

        loadedPosts.length.should.be.equal(1000);
    })));

});
