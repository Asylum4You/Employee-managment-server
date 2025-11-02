// Simple test script to verify chat API integration
const CHAT_API_URL = 'https://sb-4jlt6osj5vai.vercel.run';

async function testChatAPI() {
  console.log('Testing chat API connection...\n');
  
  const messages = [
    { role: 'user', content: 'Hello! Can you help me with employee management?' }
  ];

  try {
    const response = await fetch(`${CHAT_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('✓ API connection successful!');
    console.log('✓ Response status:', response.status);
    console.log('✓ Content-Type:', response.headers.get('content-type'));
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let chunkCount = 0;

    console.log('\nStreaming response:');
    console.log('-------------------');

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      chunkCount++;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('0:')) {
          const content = line.slice(3, -1);
          fullResponse += content;
          process.stdout.write(content);
        }
      }
    }

    console.log('\n-------------------');
    console.log(`\n✓ Received ${chunkCount} chunks`);
    console.log(`✓ Total response length: ${fullResponse.length} characters`);
    console.log('\n✅ Chat API integration test PASSED!');
    
  } catch (error) {
    console.error('\n❌ Test FAILED:', error.message);
    process.exit(1);
  }
}

testChatAPI();
