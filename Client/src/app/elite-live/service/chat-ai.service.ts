import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private chat: any;

  constructor() {
    const apiKey = 'AIzaSyBjpTXCh7-zHA-kEpwg24AqTJFBwLOAwp4'; // Thay bằng API key của bạn
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async initializeChat() {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Hello' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Great to meet you. What would you like to know?' }],
        },
      ],
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      await this.initializeChat();
    }
    const result = await this.chat.sendMessageStream(message);
    let response = '';
    for await (const chunk of result.stream) {
      response += chunk.text();
    }
    return response;
  }
}
