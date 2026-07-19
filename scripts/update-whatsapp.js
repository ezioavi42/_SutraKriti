const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sutrakriti';

async function updateWhatsAppNumber() {
  console.log('Connecting to database...');
  
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  try {
    console.log('Updating WhatsApp number...');
    
    const result = await db.collection('settings').updateOne(
      { type: 'site' },
      {
        $set: {
          whatsappNumber: '917777932385',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log(`✓ WhatsApp number updated (matched: ${result.matchedCount}, modified: ${result.modifiedCount})`);
    console.log('\nNew WhatsApp number: +91 77779 32385');
    console.log('WhatsApp link: https://wa.me/917777932385');
    
    // Verify the update
    const settings = await db.collection('settings').findOne({ type: 'site' });
    console.log('\nCurrent settings:');
    console.log(`- WhatsApp: ${settings.whatsappNumber}`);
    console.log(`- Instagram: @${settings.instagramHandle}`);
    console.log(`- Email: ${settings.email}`);
    
    console.log('\n✅ WhatsApp number updated successfully!');

  } catch (error) {
    console.error('❌ Error updating WhatsApp number:', error);
  } finally {
    await client.close();
  }
}

updateWhatsAppNumber();
