interface ProcessingResponse {
  success: boolean;
  result?: any;
  error?: string;
}

export const processDocumentWithN8n = async (
  file: File,
  command: string,
  webhookUrl: string
): Promise<ProcessingResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('command', command);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error('N8N Processing Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
