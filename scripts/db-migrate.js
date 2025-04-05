const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Você precisará adicionar esta env var na Vercel

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function readSqlFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

async function executeSql(sql) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) throw error;
    console.log('SQL executado com sucesso:', sql.substring(0, 50) + '...');
    return data;
  } catch (error) {
    console.error('Erro ao executar SQL:', error);
    throw error;
  }
}

async function runMigrations() {
  try {
    console.log('Iniciando migrations...');

    // Schema inicial
    const schemaSQL = await readSqlFile(
      path.join(__dirname, '../supabase/migrations/20250405_initial_schema.sql')
    );
    await executeSql(schemaSQL);

    // Storage
    const storageSQL = await readSqlFile(
      path.join(__dirname, '../supabase/storage/20250405_storage.sql')
    );
    await executeSql(storageSQL);

    // Auth seed
    const authSeedSQL = await readSqlFile(
      path.join(__dirname, '../supabase/auth_seed.sql')
    );
    await executeSql(authSeedSQL);

    // Data seed
    const seedSQL = await readSqlFile(
      path.join(__dirname, '../supabase/seed.sql')
    );
    await executeSql(seedSQL);

    console.log('Migrations e seeds concluídos com sucesso!');
  } catch (error) {
    console.error('Erro durante as migrations:', error);
    process.exit(1);
  }
}

// Executa as migrations
runMigrations();
