const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const { error } = await supabase.from('_migrations').select('*').eq('name', path.basename(filePath));
    
    if (error) {
      console.error('Error checking migration:', error);
      return;
    }
    
    console.log(`Executing ${path.basename(filePath)}...`);
    const { error: sqlError } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (sqlError) {
      console.error(`Error executing ${path.basename(filePath)}:`, sqlError);
      return;
    }

    await supabase.from('_migrations').insert([{ 
      name: path.basename(filePath),
      executed_at: new Date().toISOString()
    }]);
    
    console.log(`Successfully executed ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error processing ${path.basename(filePath)}:`, error);
  }
}

async function runMigrations() {
  try {
    // Criar tabela de migrations se não existir
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS _migrations (
          name TEXT PRIMARY KEY,
          executed_at TIMESTAMP WITH TIME ZONE NOT NULL
        );
      `
    });

    if (createTableError) {
      console.error('Error creating migrations table:', createTableError);
      return;
    }

    // Executar migrations em ordem
    const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      await executeSQLFile(path.join(migrationsDir, file));
    }

    // Executar seed após as migrations
    const seedFile = path.join(__dirname, '..', 'supabase', 'seed.sql');
    if (fs.existsSync(seedFile)) {
      await executeSQLFile(seedFile);
    }

    console.log('All migrations and seeds completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
