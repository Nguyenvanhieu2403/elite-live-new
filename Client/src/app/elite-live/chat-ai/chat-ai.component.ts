import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat-ai.service';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.css']
})
export class ChatAiComponent implements OnInit {

  messages: { sender: string; text: string }[] = [];
  userInput: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages.push({
      sender: 'Bot',
      text: 'Hi! How can I assist you today?',
    });
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message to chat
    this.messages.push({ sender: 'You', text: this.userInput });

    // Send to API and get response
    const response = await this.chatService.sendMessage(this.userInput);

    // Add bot response to chat
    this.messages.push({ sender: 'Bot', text: response });

    // Clear input
    this.userInput = '';
  }
}
