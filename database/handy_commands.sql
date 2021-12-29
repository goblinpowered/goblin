-- select
--   g_ed.group_name as contained,
--   g_ing.group_name as containing,
--   transitive_memberships.count as count
-- from transitive_memberships
--   join groups as g_ing on transitive_memberships.containing = g_ing.id
--   join groups as g_ed on transitive_memberships.contained = g_ed.id
-- order by g_ing.group_name asc;
-- INSERT INTO transitive_memberships(contained, containing, count)
--   SELECT all_contained.contained, all_containing.containing, all_contained.count FROM
--     transitive_memberships all_contained
--     CROSS JOIN transitive_memberships all_containing
--     WHERE all_contained.containing = '2393ed88-a5a4-4c36-a302-70fba9f385e7'
--     AND all_containing.contained = '2bb7d711-a5c0-4353-8726-6261ecab95ea'
--   FOR UPDATE
-- ON CONFLICT (contained, containing) DO UPDATE
--   SET count = EXCLUDED.count + transitive_memberships.count
-- child a11307c4-aeea-4312-907e-dfa0e2e2a932
-- parent 89c7d153-ba84-42fc-8037-d591423c7af9
WITH RECURSIVE search_graph AS (
    SELECT
        parent,
        ARRAY[child] AS path,
        child <> parent AS keep_going
    FROM
        memberships_tc
    UNION ALL
    SELECT
        g.parent,
        sg.path || g.child,
        g.child <> g.parent
    FROM
        search_graph sg
        JOIN memberships_tc g ON g.child = sg.parent
    WHERE
        sg.keep_going
),
transitive_closure AS (
    SELECT
        path[1] AS child,
        path[array_upper(path, 1)] AS parent,
        path
    FROM
        search_graph
)
SELECT
    *
FROM
    transitive_closure
WHERE
    parent = '89c7d153-ba84-42fc-8037-d591423c7af9'
    AND child = 'a11307c4-aeea-4312-907e-dfa0e2e2a932'
LIMIT 1;

WITH allocated_actor AS (
INSERT INTO actors (actor_type)
        VALUES ('profile')
    RETURNING
        actor_id
), allocated_resource AS (
INSERT INTO resources (resource_type, resource_id)
    SELECT
        'profile'::resource_type,
        actor_id resource_id
    FROM
        allocated_actor
    RETURNING
        resource_id
),
allocated_profile AS (
INSERT INTO profiles (name, profile_id)
    SELECT
        '$1' name,
        resource_id profile_id
    FROM
        allocated_resource
    RETURNING
        profile_id)
    INSERT INTO memberships (parent, child)
    SELECT
        profile_id,
        profile_id
    FROM
        allocated_profile
    RETURNING
        parent;

-- INSERT INTO
--   transitive_memberships(contained, containing, count)
-- SELECT
--   ed_ing.contained AS contained,
--   ing_ing.containing AS containing,
--   ed_ing.count AS count
-- FROM transitive_memberships AS ed_ing
-- CROSS JOIN transitive_memberships AS ing_ing
-- WHERE
--   ed_ing.contained = '5bc050da-b09a-4c3a-ab6f-b9aa598a39e6'
--   AND ing_ing.containing = 'f07fd791-1565-4977-92ea-a45bd89b2630'
-- ON CONFLICT (contained, containing) DO UPDATE
--   SET count = EXCLUDED.count + count;
-- WITH all_contained AS (
--   SELECT contained, count FROM transitive_memberships WHERE containing = '5bc050da-b09a-4c3a-ab6f-b9aa598a39e6'
-- ),
-- all_containing AS (
--   SELECT containing FROM transitive_memberships WHERE contained = 'f07fd791-1565-4977-92ea-a45bd89b2630'
-- ),
-- all_updates AS (
--   SELECT all_contained.contained, all_containing.containing, all_contained.count FROM all_contained CROSS JOIN all_containing
-- )
-- INSERT INTO transitive_memberships(contained, containing, count)
-- SELECT * from all_updates
-- ON CONFLICT (contained, containing) DO UPDATE
--   SET count = EXCLUDED.count + transitive_memberships.count;
