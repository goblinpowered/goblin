ALTER TYPE resource_type
  ADD VALUE 'character';

CREATE TABLE characters (
  character_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type GENERATED ALWAYS AS ('character'::resource_type) STORED,
  name text NOT NULL DEFAULT '',
  extended jsonb NOT NULL DEFAULT '{}' ::jsonb,
  FOREIGN KEY (character_id, resource_type) REFERENCES resources (resource_id, resource_type) ON DELETE CASCADE,
  PRIMARY KEY (character_id)
);

