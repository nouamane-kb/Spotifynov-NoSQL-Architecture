// 1. Contrainte : Un utilisateur doit avoir un ID unique
CREATE CONSTRAINT user_id_unique IF NOT EXISTS
FOR (u:User) REQUIRE u.id IS UNIQUE;

// 2. Contrainte : Une piste doit avoir un ISRC unique
CREATE CONSTRAINT track_isrc_unique IF NOT EXISTS
FOR (t:Track) REQUIRE t.isrc IS UNIQUE;

// 3. Contrainte : Un genre doit avoir un nom unique
CREATE CONSTRAINT genre_name_unique IF NOT EXISTS
FOR (g:Genre) REQUIRE g.name IS UNIQUE;