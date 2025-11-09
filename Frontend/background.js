// Track scanning state
let isScanning = false;

// Update extension icon based on state
// function updateIcon(isActive) {
//   const iconSizes = [16, 48, 128];
//   iconSizes.forEach(size => {
//     const canvas = new OffscreenCanvas(size, size);
//     const context = canvas.getContext('2d');
    
//     // Draw background
//     context.fillStyle = isActive ? '#dc2626' : '#6b7280';
//     context.fillRect(0, 0, size, size);
    
//     // Draw flag icon
//     context.fillStyle = '#ffffff';
//     context.font = `${size * 0.6}px Arial`;
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText('🚩', size / 2, size / 2);
    
//     canvas.convertToBlob().then(blob => {
//       const imageData = `data:image/png;base64,${btoa(blob)}`;
//       chrome.action.setIcon({
//         path: { [size]: imageData }
//       });
//     });
//   });
// }

function updateIcon(isActive) {
  const iconSizes = [16, 48, 128];
  const iconPaths = {};
  
  iconSizes.forEach(size => {
    if (isActive) {
      iconPaths[size] = `icons/active_icon${size}.png`;
    } else {
      iconPaths[size] = `icons/icon${size}.png`;
    }
  });
  
  chrome.action.setIcon({ path: iconPaths });
}

// Initialize icon
updateIcon(false);

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanningStarted") {
    isScanning = true;
    updateIcon(true);
  } else if (request.action === "scanningCompleted") {
    isScanning = false;
    updateIcon(true);
  } else if (request.action === "getScanningState") {
    sendResponse({ isScanning });
  }
});