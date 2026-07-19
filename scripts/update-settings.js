const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sutrakriti';

async function updateSettings() {
  console.log('Connecting to database...');
  
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  try {
    console.log('Updating Instagram and Email settings...');
    
    const result = await db.collection('settings').updateOne(
      { type: 'site' },
      {
        $set: {
          instagramHandle: '_sutrakriti',
          email: 'sutrakriti.help@outlook.com',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log(`✓ Settings updated (matched: ${result.matchedCount}, modified: ${result.modifiedCount})`);
    console.log('\nNew settings:');
    console.log('- Instagram: https://www.instagram.com/_sutrakriti');
    console.log('- Email: sutrakriti.help@outlook.com');
    
    console.log('\n✅ Database settings updated successfully!');

  } catch (error) {
    console.error('❌ Error updating settings:', error);
  } finally {
    await client.close();
  }
}

updateSettings();
