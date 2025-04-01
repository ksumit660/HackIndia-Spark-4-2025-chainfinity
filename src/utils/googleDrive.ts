declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const GOOGLE_CLIENT_ID = '745211025943-kog0sa9ddc14k892d27qsevgq7fe45c5.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyBh4Bz07O7CR2kzEa7B6qkCbe-_PEHABig';

export const loadGoogleDriveAPI = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return;
    
    const loadGoogleAPIs = async () => {
      try {
        // Load Google API Client
        await loadScript('https://apis.google.com/js/api.js');
        await new Promise<void>((res) => window.gapi.load('client:auth2', res));
        
        // Initialize Google API Client
        await window.gapi.client.init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly'
        });

        // Load Google Picker
        await loadScript('https://apis.google.com/js/picker.js');
        resolve(true);
      } catch (error) {
        console.error('Google API Init Error:', error);
        reject(error);
      }
    };

    loadGoogleAPIs().catch(reject);
  });
};

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
};

export const pickFile = async () => {
  try {
    const auth = window.gapi.auth2.getAuthInstance();
    if (!auth.isSignedIn.get()) {
      await auth.signIn();
    }

    const authResponse = auth.currentUser.get().getAuthResponse();
    const accessToken = authResponse.access_token;

    return new Promise((resolve, reject) => {
      if (!window.google.picker) {
        reject(new Error('Google Picker not loaded'));
        return;
      }

      const picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .addView(new window.google.picker.DocsView()
          .setIncludeFolders(true)
          .setMimeTypes('application/pdf,application/vnd.google-apps.document,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        )
        .setOAuthToken(accessToken)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setCallback(async (data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const file = data.docs[0];
            try {
              // Use the Google Drive API to get the file
              const response = await window.gapi.client.drive.files.get({
                fileId: file.id,
                alt: 'media'
              });
              
              const blob = new Blob([response.body], { type: file.mimeType });
              resolve({
                id: file.id,
                name: file.name,
                mimeType: file.mimeType,
                blob: blob,
                accessToken
              });
            } catch (error) {
              console.error('File fetch error:', error);
              reject(error);
            }
          }
        })
        .build();
      picker.setVisible(true);
    });
  } catch (error) {
    console.error('Picker error:', error);
    throw new Error(`Failed to pick file: ${error.message}`);
  }
};
