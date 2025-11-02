import { Message } from '@/types/chat';

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'https://sb-4jlt6osj5vai.vercel.run';

export async function sendChatMessage(
  messages: Message[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
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

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let hasReceivedData = false;
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        // If we haven't received any data, show a message
        if (!hasReceivedData) {
          onChunk('The remote API is currently not responding with data. This could be a temporary issue with the Vercel deployment. Please try again later or check the API status.');
        }
        onComplete();
        break;
      }

      hasReceivedData = true;
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // Try to parse streaming data in different formats
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim()) continue;
        
        // Format 1: "0:content"
        if (line.startsWith('0:')) {
          const content = line.slice(3, -1);
          onChunk(content);
        }
        // Format 2: Plain text
        else if (!line.startsWith('data:') && !line.startsWith('{')) {
          onChunk(line);
        }
        // Format 3: Server-sent events
        else if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              onChunk(data.content);
            } else if (typeof data === 'string') {
              onChunk(data);
            }
          } catch {
            onChunk(line.slice(6));
          }
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    onError(errorMessage);
  }
}
