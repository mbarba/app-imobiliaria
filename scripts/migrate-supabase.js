require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function main() {
  const supabase = createClient(
    'https://pfzngbcxriuzxrtkvxok.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmem5nYmN4cml1enhydGt2eG9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzgwMzA0NSwiZXhwIjoyMDU5Mzc5MDQ1fQ.zBwquVohw4kDtBD7UKGGRT8mNP7WsqrCEr6jxbiH5Zs'
  );

  // Executar setup inicial
  console.log('Executando setup inicial...');
  const setupSQL = fs.readFileSync(
    path.join(__dirname, '..', 'supabase', 'migrations', '20250404_setup.sql'),
    'utf8'
  );
  const { error: setupError } = await supabase.rpc('exec_sql', {
    sql_query: setupSQL
  });
  if (setupError) {
    console.error('Erro ao executar setup:', setupError);
    return;
  }

  // Executar schema inicial
  console.log('Executando schema inicial...');
  const schemaSQL = fs.readFileSync(
    path.join(__dirname, '..', 'supabase', 'migrations', '20250404_initial_schema.sql'),
    'utf8'
  );
  const { error: schemaError } = await supabase.rpc('exec_sql', {
    sql_query: schemaSQL
  });
  if (schemaError) {
    console.error('Erro ao executar schema:', schemaError);
    return;
  }

  // Executar setup de storage
  console.log('Executando setup de storage...');
  const storageSQL = fs.readFileSync(
    path.join(__dirname, '..', 'supabase', 'migrations', '20250404_storage_setup.sql'),
    'utf8'
  );
  const { error: storageError } = await supabase.rpc('exec_sql', {
    sql_query: storageSQL
  });
  if (storageError) {
    console.error('Erro ao executar storage setup:', storageError);
    return;
  }

  // Executar seed
  console.log('Executando seed...');
  const seedSQL = fs.readFileSync(
    path.join(__dirname, '..', 'supabase', 'seed.sql'),
    'utf8'
  );
  const { error: seedError } = await supabase.rpc('exec_sql', {
    sql_query: seedSQL
  });
  if (seedError) {
    console.error('Erro ao executar seed:', seedError);
    return;
  }

  console.log('Migrations e seed executados com sucesso!');
}

main().catch(console.error);
