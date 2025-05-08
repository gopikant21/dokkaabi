// API service to handle backend interactions

interface TTSRequest {
  text: string;
  voice_id?: string;
}

interface TTSResponse {
  text: string;
  voice: string;
  audio_url: string;
  timestamp: string;
}

interface STTRequest {
  audio_file: Blob;
  language?: string;
}

interface STTResponse {
  id: string;
  transcript: string;
  ai_response: {
    text: string;
    type: string;
    timestamp: string;
  };
  tts_available: boolean;
}

class ApiService {
  private baseUrl: string = "http://localhost:2900";

  // Convert text to speech
  async textToSpeech(
    text: string,
    voiceId: string = "default"
  ): Promise<string> {
    try {
      // Generate a random ID for this request
      const id = `session-${Date.now()}`;

      const response = await fetch(`${this.baseUrl}/api/tts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log("TTS response:", response);

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      const data = (await response.json()) as TTSResponse;
      return data.audio_url;
    } catch (error) {
      console.error("TTS request failed:", error);
      throw error;
    }
  }

  // Convert speech to text (non-WebSocket)
  async speechToText(audioBlob: Blob, sessionId: string): Promise<STTResponse> {
    try {
      const formData = new FormData();
      formData.append("audio_file", audioBlob);
      formData.append("language", "en");

      const response = await fetch(
        `${this.baseUrl}/api/stt/prerecorded/${sessionId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`STT API error: ${response.status}`);
      }

      const data = (await response.json()) as STTResponse;
      return data;
    } catch (error) {
      console.error("STT request failed:", error);
      throw error;
    }
  }

  // Initialize WebSocket connection for real-time STT
  initializeSTTWebSocket(sessionId: string): WebSocket {
    try {
      // The WebSocket URL directly connects to the backend
      const socket = new WebSocket(`ws://localhost:2900/ws/stt/${sessionId}`);

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
      const mockAudioBlob = new Blob(["mock audio data"], {
        type: "audio/wav",
      });
      resolve(mockAudioBlob);
    });
  }
}

export const apiService = new ApiService();
