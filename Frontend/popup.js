document.addEventListener("DOMContentLoaded", function () {
  const scanBtn = document.getElementById("scanBtn");
  const statusDiv = document.getElementById("status");
  const envBadge = document.getElementById("envBadge");

  // Add ripple effect to button
  scanBtn.addEventListener("click", function (e) {
    if (scanBtn.disabled) return;

    const ripple = document.createElement("span");
    const rect = scanBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    scanBtn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  scanBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Update UI to scanning state
        scanBtn.disabled = true;
        scanBtn.innerHTML =
          '<span class="btn-icon">⏳</span><span>Scanning...</span>';
        scanBtn.classList.add("scanning");

        statusDiv.textContent = "Scanning page...";
        statusDiv.className = "status scanning";

        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "manualScan" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error:", chrome.runtime.lastError);
              statusDiv.textContent = "Refresh page & try again";
              statusDiv.className = "status error";
            } else {
              console.log("Popup received response:", response);
              statusDiv.textContent = "Scan completed!";
              statusDiv.className = "status success";
            }

            // Reset button after delay
            setTimeout(() => {
              scanBtn.disabled = false;
              scanBtn.innerHTML =
                '<span class="btn-icon">🔍</span><span>Scan Page</span>';
              scanBtn.classList.remove("scanning");

              statusDiv.textContent = "Ready to scan";
              statusDiv.className = "status";
            }, 2000);
          }
        );
      }
    });
  });

  // Add hover effects
  scanBtn.addEventListener("mouseenter", function () {
    if (!scanBtn.disabled) {
      scanBtn.style.transform = "translateY(-2px)";
    }
  });

  scanBtn.addEventListener("mouseleave", function () {
    if (!scanBtn.disabled) {
      scanBtn.style.transform = "translateY(0)";
    }
  });

  // Load environment badge
  chrome.storage.local.get(["environment"], (result) => {
    if (result.environment) {
      envBadge.textContent = result.environment.toUpperCase();
    }
  });
});
