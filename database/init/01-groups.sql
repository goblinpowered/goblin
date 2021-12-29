CREATE TYPE resource_type AS ENUM (
  'group'
);

CREATE TABLE resources (
  resource_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type NOT NULL,
  PRIMARY KEY (resource_id),
  UNIQUE (resource_id, resource_type)
);

CREATE TABLE actor_groups (
  group_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type GENERATED ALWAYS AS ('group'::resource_type) STORED,
  group_name text NOT NULL DEFAULT '',
  FOREIGN KEY (group_id, resource_type) REFERENCES resources (resource_id, resource_type) ON DELETE CASCADE,
  PRIMARY KEY (group_id)
);

CREATE TABLE grants (
  resource_id uuid NOT NULL,
  actor_id uuid NOT NULL,
  granted_role text NOT NULL,
  PRIMARY KEY (resource_id, actor_id, granted_role),
  FOREIGN KEY (resource_id) REFERENCES resources (resource_id) ON DELETE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES resources (resource_id) ON DELETE CASCADE
);

CREATE TABLE memberships (
  parent uuid NOT NULL,
  child uuid NOT NULL,
  FOREIGN KEY (parent) REFERENCES resources (resource_id) ON DELETE CASCADE,
  FOREIGN KEY (child) REFERENCES resources (resource_id) ON DELETE CASCADE,
  PRIMARY KEY (parent, child)
);

CREATE VIEW transitive_memberships AS
WITH RECURSIVE transitive_graph AS (
  SELECT
    parent,
    ARRAY[child] AS path,
    child <> parent AS keep_going
  FROM
    memberships
  UNION ALL
  SELECT
    g.parent,
    tg.path || g.child,
    g.child <> g.parent
  FROM
    transitive_graph tg
    JOIN memberships g ON g.child = tg.parent
  WHERE
    tg.keep_going
)
SELECT
  path[1] AS child,
  path[array_upper(path, 1)] AS parent,
  path
FROM
  transitive_graph;

