-- Enable pgcrypto extension
create extension if not exists pgcrypto;

-- Enable uuid-ossp extension
create extension if not exists "uuid-ossp";

-- Create exec_sql function for migrations
create or replace function exec_sql(sql_query text)
returns void as $$
begin
  execute sql_query;
end;
$$ language plpgsql security definer;
