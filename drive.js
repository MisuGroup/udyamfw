function uploadToGoogleDrive(file) {
  // Initialize Google API Client and authenticate
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      scope: 'https://www.googleapis.com/auth/drive.file',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(() => {
      const metadata = { name: file.name, mimeType: file.type };
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      return gapi.client.request({
        path: '/upload/drive/v3/files?uploadType=multipart',
        method: 'POST',
        body: form
      });
    }).then((response) => {
      console.log('File uploaded:', response);
    }).catch((error) => {
      console.error('Upload failed:', error);
    });
  });
}

function saveWinnerToGoogleDrive(prize, uniqueCode) {
  const fileContent = `Prize: ${prize}\nCode: ${uniqueCode}\nDate: ${new Date().toISOString()}`;
  const file = new Blob([fileContent], { type: 'text/plain' });
  uploadToGoogleDrive(file);
}
