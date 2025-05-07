
// API service to handle backend interactions

interface TTSRequest {
  text: string;
  voice_id?: string;
}

interface TTSResponse {
  audio_url: string;
}

interface STTRequest {
  audio_blob: Blob;
}

interface STTResponse {
  transcript: string;
}

class ApiService {
  private baseUrl: string = "http://localhost:2900";
  
  // Convert text to speech
  async textToSpeech(text: string, voiceId: string = "default"): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voice_id: voiceId } as TTSRequest),
      });
      
      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }
      
      const data = await response.json() as TTSResponse;
      return data.audio_url;
    } catch (error) {
      console.error("TTS request failed:", error);
      throw error;
    }
  }
  
  // Convert speech to text (non-WebSocket)
  async speechToText(audioBlob: Blob, sessionId: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      
      const response = await fetch(`${this.baseUrl}/api/stt/${sessionId}`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`STT API error: ${response.status}`);
      }
      
      const data = await response.json() as STTResponse;
      return data.transcript;
    } catch (error) {
      console.error("STT request failed:", error);
      throw error;
    }
  }
  
  // Initialize WebSocket connection for real-time STT
  initializeSTTWebSocket(sessionId: string): WebSocket {
    try {
      const socket = new WebSocket(`ws://${this.baseUrl.replace("http://", "")}/ws/stt/${sessionId}`);
      
      socket.onopen = () => {
        console.log("STT WebSocket connection established");
      };
      
      socket.onerror = (error) => {
        console.error("STT WebSocket error:", error);
      };
      
      return socket;
    } catch (error) {
      console.error("Failed to initialize STT WebSocket:", error);
      throw error;
    }
  }
  
  // Mock function to get dummy audio for testing
  getMockAudioBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      // This would normally be audio data from the microphone
      const mockAudioBlob = new Blob(["mock audio data"], { type: "audio/wav" });
      resolve(mockAudioBlob);
    });
  }
}

export const apiService = new ApiService();
