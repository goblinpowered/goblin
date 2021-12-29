ALTER TYPE resource_type
  ADD VALUE 'campaign';

CREATE TABLE campaigns (
  campaign_id uuid NOT NULL DEFAULT gen_random_uuid (),
  resource_type resource_type GENERATED ALWAYS AS ('campaign'::resource_type) STORED,
  name text NOT NULL DEFAULT '',
  extended jsonb NOT NULL DEFAULT '{}' ::jsonb,
  FOREIGN KEY (campaign_id, resource_type) REFERENCES resources (resource_id, resource_type) ON DELETE CASCADE,
  PRIMARY KEY (campaign_id)
);

