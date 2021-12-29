ALTER TYPE resource_type
  ADD value 'profile';

ALTER TYPE resource_type
  ADD value 'user';

CREATE TABLE users (
  user_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type GENERATED ALWAYS AS ('user'::resource_type) STORED,
  user_name text NOT NULL DEFAULT '',
  extended jsonb NOT NULL DEFAULT '{}' ::jsonb,
  FOREIGN KEY (user_id, resource_type) REFERENCES resources (resource_id, resource_type) ON DELETE CASCADE,
  PRIMARY KEY (user_id)
);

CREATE TABLE profiles (
  profile_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type GENERATED ALWAYS AS ('profile'::resource_type) STORED,
  profile_name text NOT NULL DEFAULT '',
  extended jsonb NOT NULL DEFAULT '{}' ::jsonb,
  FOREIGN KEY (profile_id, resource_type) REFERENCES resources (resource_id, resource_type) ON DELETE CASCADE,
  PRIMARY KEY (profile_id)
);

CREATE TYPE idp_authorities AS enum (
  'firebase'
);

CREATE TABLE authn (
  user_id uuid NOT NULL,
  oid text NOT NULL,
  idp idp_authorities NOT NULL
);

