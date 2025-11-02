// Debug script to see actual response format
const CHAT_API_URL = 'https://sb-4jlt6osj5vai.vercel.run';

async function debugChatAPI() {
  console.log('Debugging chat API response format...\n');
  
  const messages = [
    { role: 'user', content: 'Hi' }
  ];

  try {
    const response = await fetch(`${CHAT_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunkNum = 0;

    console.log('\nRaw chunks:');
    console.log('===========');

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('\n===========');
        console.log('Stream ended');
        break;
      }

      chunkNum++;
      const chunk = decoder.decode(value, { stream: true });
      console.log(`\nChunk ${chunkNum}:`);
      console.log('Length:', chunk.length);
      console.log('Raw:', JSON.stringify(chunk));
      console.log('Display:', chunk);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugChatAPI();
