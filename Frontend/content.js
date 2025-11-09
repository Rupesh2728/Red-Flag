console.log("🔍 Red Flag: Content script loaded");

const CONFIG = {
  // Environment: 'dev' or 'prod'
  environment: "prod",

  // Backend API URL
  backendUrl: "http://127.0.0.1:3000/",

  // Risk categories with icons and display names
  riskCategories: [
    // Personal Identifiers
    { key: "personal_name", icon: "👤", displayName: "Name Collection" },
    { key: "personal_email", icon: "📧", displayName: "Email Collection" },
    { key: "phone_number", icon: "📱", displayName: "Phone Number" },
    { key: "home_address", icon: "🏠", displayName: "Home Address" },
    { key: "date_of_birth", icon: "🎂", displayName: "Birth Date" },
    { key: "gender_identity", icon: "⚧️", displayName: "Gender Data" },
    { key: "national_id", icon: "🆔", displayName: "National ID" },

    // Location & Device
    { key: "location", icon: "📍", displayName: "Location Tracking" },
    { key: "device_id", icon: "📟", displayName: "Device ID" },
    { key: "ip_address", icon: "🌐", displayName: "IP Address" },
    { key: "biometric_data", icon: "👁️", displayName: "Biometric Data" },

    // Sensitive Data
    { key: "health_data", icon: "❤️", displayName: "Health Information" },
    { key: "political_opinions", icon: "🗳️", displayName: "Political Views" },
    { key: "religious_beliefs", icon: "🛐", displayName: "Religious Beliefs" },

    // Communications
    { key: "chat_messages", icon: "💬", displayName: "Chat Messages" },
    { key: "voice_calls", icon: "📞", displayName: "Voice Calls" },
    { key: "email_marketing", icon: "📨", displayName: "Email Marketing" },
    { key: "sms_notifications", icon: "✉️", displayName: "SMS Messages" },
    {
      key: "push_notifications",
      icon: "🔔",
      displayName: "Push Notifications",
    },
    { key: "customer_support_logs", icon: "🎧", displayName: "Support Logs" },
    { key: "contact_sharing", icon: "👥", displayName: "Contact Sharing" },

    // Financial Data
    { key: "credit_card", icon: "💳", displayName: "Credit Card Info" },
    {
      key: "transaction_history",
      icon: "📊",
      displayName: "Transaction History",
    },
    { key: "bank_account", icon: "🏦", displayName: "Bank Account" },
    { key: "payment_info_storage", icon: "💰", displayName: "Payment Storage" },
    { key: "refund_policy", icon: "🔄", displayName: "Refund Policy" },

    // Tracking & Analytics
    { key: "cookies", icon: "🍪", displayName: "Cookie Usage" },
    {
      key: "behavioral_tracking",
      icon: "🎯",
      displayName: "Behavior Tracking",
    },
    {
      key: "cross_site_tracking",
      icon: "🕸️",
      displayName: "Cross-Site Tracking",
    },
    {
      key: "ad_personalization",
      icon: "📢",
      displayName: "Ad Personalization",
    },
    {
      key: "third_party_analytics",
      icon: "📈",
      displayName: "Third-Party Analytics",
    },
    {
      key: "data_broker_sharing",
      icon: "🤝",
      displayName: "Data Broker Sharing",
    },

    // Content & Rights
    { key: "content_ownership", icon: "📄", displayName: "Content Ownership" },
    { key: "data_license", icon: "📝", displayName: "Data Licensing" },
    { key: "user_upload_rights", icon: "⬆️", displayName: "Upload Rights" },
    { key: "moderation_policy", icon: "👁️", displayName: "Content Moderation" },

    // Account & Access
    { key: "third_party_login", icon: "🔑", displayName: "Third-Party Login" },
    { key: "account_deletion", icon: "🗑️", displayName: "Account Deletion" },
    { key: "data_retention", icon: "💾", displayName: "Data Retention" },
    {
      key: "multi_device_access",
      icon: "📱💻",
      displayName: "Multi-Device Access",
    },
    { key: "password_storage", icon: "🔒", displayName: "Password Storage" },

    // AI & Automation
    { key: "ai_training_data", icon: "🤖", displayName: "AI Training Data" },
    {
      key: "automated_decision_making",
      icon: "⚙️",
      displayName: "Automated Decisions",
    },
    { key: "profiling", icon: "📋", displayName: "User Profiling" },
    { key: "synthetic_data_use", icon: "🧬", displayName: "Synthetic Data" },

    // Policy & Control
    { key: "policy_updates", icon: "🔄", displayName: "Policy Updates" },
    {
      key: "consent_withdrawal",
      icon: "✋",
      displayName: "Consent Withdrawal",
    },
    { key: "opt_out_unavailable", icon: "🚫", displayName: "No Opt-Out" },
    { key: "data_portability", icon: "📤", displayName: "Data Portability" },
    { key: "user_notification", icon: "🔔", displayName: "User Notifications" },
    { key: "privacy_settings", icon: "⚙️", displayName: "Privacy Settings" },

    // Legal & Liability
    {
      key: "liability_disclaimer",
      icon: "⚖️",
      displayName: "Liability Disclaimer",
    },
    {
      key: "arbitration_clause",
      icon: "⚔️",
      displayName: "Arbitration Clause",
    },
    {
      key: "jurisdiction_limited",
      icon: "🌍",
      displayName: "Limited Jurisdiction",
    },
    { key: "governing_law", icon: "📚", displayName: "Governing Law" },
    {
      key: "termination_rights",
      icon: "🚪",
      displayName: "Termination Rights",
    },
    { key: "indemnification", icon: "🛡️", displayName: "Indemnification" },
  ],

  // Highlight categories to show in the main card
  highlightCategories: [
    "content_ownership",
    "user_upload_rights",
    "policy_updates",
  ],

  // Timeout for API calls (in milliseconds)
  apiTimeout: 10000000000000,

  // Mock data for development
  mockData: {
    risk_score: 62,
    risk_category: "Medium",
    content_ownership:
      "Broad licenses to SoundCloud and to other users/Linked Services (including derivative works) may dilute creators' control; certain contributions (e.g., comments) are irrevocable.",
    data_license:
      "Royalty-free, worldwide licenses to host, distribute, and display content persist until deletion; copies on Linked Services and offline caches can remain beyond removal.",
    policy_updates:
      "Unilateral changes become effective after notice; continued use after two weeks counts as acceptance rather than affirmative consent.",
    liability_disclaimer:
      "Extensive 'as-is' disclaimers and a low aggregate cap (greater of €100 or fees in prior 12 months) shift significant risk to users.",
    moderation_policy:
      "Content may be blocked/removed and communications accessed for enforcement with broad discretion, impacting user speech and access.",
    termination_rights:
      "Accounts may be suspended/terminated for broad reasons; refunds typically unavailable for remaining subscription periods.",
    data_portability:
      "Provider states it cannot supply .csv or similar exports of account activity data, limiting practical portability.",
    user_upload_rights:
      "Deletion does not ensure removal from Linked Services and offline saves (up to 30 days), reducing user control over distribution.",
  },
};

class RedFlagScanner {
  constructor() {
    this.isScanning = false;
    this.debugMode = CONFIG.environment === "dev";
    this.init();
  }

  init() {
    console.log(
      "🔍 Red Flag: Initializing scanner, environment:",
      CONFIG.environment
    );
    if (this.isSignupPage()) {
      console.log("🔍 Red Flag: Signup page detected, starting auto scan");
      this.startAutoScan();
    } else {
      console.log("🔍 Red Flag: Not a signup page");
    }
  }

  isSignupPage() {
    const signupIndicators = [
      'input[type="password"]',
      'input[name*="password"]',
      'button[type="submit"]',
      'input[type="email"]',
      'button:contains("Sign Up")',
      'button:contains("Register")',
      'button:contains("Create Account")',
    ];

    for (const selector of signupIndicators) {
      if (selector.includes("contains")) {
        const buttons = document.querySelectorAll(
          'button, input[type="submit"]'
        );
        for (const button of buttons) {
          const text =
            button.textContent?.toLowerCase() ||
            button.value?.toLowerCase() ||
            "";
          if (
            text.includes("sign") ||
            text.includes("register") ||
            text.includes("create")
          ) {
            console.log("🔍 Red Flag: Found signup button via text:", text);
            return true;
          }
        }
      } else if (document.querySelector(selector)) {
        console.log(
          "🔍 Red Flag: Found signup element via selector:",
          selector
        );
        return true;
      }
    }
    return false;
  }

  async startAutoScan() {
    console.log("🔍 Red Flag: Starting auto scan");
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.scanPage());
    } else {
      setTimeout(() => this.scanPage(), 1000);
    }
  }

  async scanPage() {
    if (this.isScanning) return;

    console.log("🔍 Red Flag: Starting page scan");
    this.isScanning = true;

    try {
      chrome.runtime.sendMessage({ action: "scanningStarted" });
      await this.showModernScanningUI();

      const privacyPolicy = await this.findPrivacyPolicy();

      // Show debug info only in dev mode
      if (this.debugMode && privacyPolicy) {
        this.showDebugInfo(privacyPolicy);
      }

      // Get risk data from backend or mock
      const riskData = await this.getRiskData(privacyPolicy);
      this.displayModernRiskScore(riskData);

      chrome.runtime.sendMessage({ action: "scanningCompleted" });
    } catch (error) {
      console.error("🔍 Red Flag: Error during scan:", error);
      // Even if there's an error, show mock data in dev mode
      if (this.debugMode) {
        const riskData = CONFIG.mockData;
        this.displayModernRiskScore(riskData);
      }
    }

    this.isScanning = false;
  }

  async getRiskData(privacyPolicy) {
    if (CONFIG.environment === "dev") {
      console.log("🔍 Red Flag: Development mode - using mock data");
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return CONFIG.mockData;
    } else {
      console.log("🔍 Red Flag: Production mode - calling backend API");
      return await this.callBackendAPI(privacyPolicy);
    }
  }

  async callBackendAPI(privacyPolicy) {
    const backendData = {
      url: privacyPolicy.url,
      domain: privacyPolicy.domain,
    };

    console.log("🔍 Red Flag: Calling backend API with:", backendData);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout);

      const response = await fetch(CONFIG.backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔍 Red Flag: Backend API response:", data);
      return data;
    } catch (error) {
      console.error("🔍 Red Flag: Backend API call failed:", error);

      if (CONFIG.environment === "dev") {
        console.log("🔍 Red Flag: Dev mode - falling back to mock data");
        return CONFIG.mockData;
      } else {
        // In production, re-throw the error to be handled by the caller
        throw new Error(`Failed to analyze privacy policy: ${error.message}`);
      }
    }
  }

  async showModernScanningUI() {
    return new Promise((resolve) => {
      console.log("🔍 Red Flag: Showing scanning UI");

      const overlay = document.createElement("div");
      overlay.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          pointer-events: none;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            opacity: 0.02;
            animation: pulseBackground 2s ease-in-out infinite;
          "></div>
          <div style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            min-width: 280px;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              height: 3px;
              background: linear-gradient(90deg, #dc2626, #ef4444);
              border-radius: 16px 16px 0 0;
              animation: scanningProgress 2s ease-in-out infinite;
              width: 100%;
            "></div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="font-size: 24px; animation: bounce 1s ease-in-out infinite;">🚩</div>
              <div>
                <div style="font-weight: 600; color: #1f2937; font-size: 14px;">
                  ${
                    CONFIG.environment === "dev" ? "[DEV] " : ""
                  }Scanning Privacy Policy
                </div>
                <div style="color: #6b7280; font-size: 12px; margin-top: 2px;">
                  ${
                    CONFIG.environment === "dev"
                      ? "Using mock data"
                      : "Analyzing with AI..."
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>
          @keyframes pulseBackground {
            0%, 100% { opacity: 0.02; }
            50% { opacity: 0.05; }
          }
          @keyframes scanningProgress {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        </style>
      `;

      document.body.appendChild(overlay);
      console.log("🔍 Red Flag: Scanning UI added to page");

      setTimeout(() => {
        overlay.remove();
        console.log("🔍 Red Flag: Scanning UI removed");
        resolve();
      }, 2500);
    });
  }

  async findPrivacyPolicy() {
    console.log("🔍 Red Flag: Searching for privacy policy...");

    const privacySelectors = [
      'a[href*="privacy"]',
      'a[href*="policy"]',
      'a[href*="legal"]',
      'a[href*="terms"]',
    ];

    let privacyLink = null;
    let foundElements = [];

    for (const selector of privacySelectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent?.toLowerCase() || "";
        const href = element.href || "";

        foundElements.push({
          text: text.substring(0, 100),
          href: href,
          selector: selector,
        });

        if (
          text.includes("privacy") ||
          text.includes("policy") ||
          href.includes("privacy") ||
          href.includes("policy")
        ) {
          privacyLink = href;
          console.log("🔍 Red Flag: Found privacy policy link:", privacyLink);
          break;
        }
      }
      if (privacyLink) break;
    }

    const finalUrl = privacyLink || window.location.href;
    const domainName = this.extractDomainFromUrl(finalUrl);

    const backendData = {
      url: finalUrl,
      domain: domainName,
    };

    console.log("🔍 Red Flag: Backend data:", backendData);

    return {
      url: finalUrl,
      domain: domainName,
      backend_data: backendData,
      debug: {
        foundElements: foundElements,
        finalUrl: finalUrl,
        extractedDomain: domainName,
      },
    };
  }

  extractDomainFromUrl(url) {
    if (!url) return "";
    try {
      let domain = url.replace(/^(https?:\/\/)?(www\.)?/, "");
      domain = domain.split("/")[0];
      domain = domain.split(":")[0];
      return domain;
    } catch (error) {
      console.error("Error extracting domain:", error);
      return url;
    }
  }

  showDebugInfo(privacyPolicy) {
    console.log("🔍 Red Flag: Showing debug info");

    const debugPanel = document.createElement("div");
    debugPanel.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        background: #1f2937;
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        z-index: 10001;
        max-width: 500px;
        max-height: 400px;
        overflow: auto;
        border: 2px solid #dc2626;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <div style="color: #dc2626; font-weight: bold; margin-bottom: 10px;">
          🚩 Red Flag - Debug Info (${CONFIG.environment.toUpperCase()})
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Environment:</strong> 
          <span style="color: ${
            CONFIG.environment === "dev" ? "#f59e0b" : "#10b981"
          };">
            ${CONFIG.environment.toUpperCase()}
          </span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Backend URL:</strong> 
          <span style="color: #60a5fa;">${CONFIG.backendUrl}</span>
        </div>
        <div style="margin-bottom: 12px;">
          <strong style="color: #60a5fa;">Backend Data (JSON to be sent):</strong>
          <div style="background: #374151; padding: 8px; border-radius: 4px; margin-top: 4px; font-size: 11px; white-space: pre-wrap;">
${JSON.stringify(privacyPolicy.backend_data, null, 2)}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Full URL:</strong> 
          <span style="color: #60a5fa; word-break: break-all;">${
            privacyPolicy.url
          }</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Domain Name:</strong> 
          <span style="color: #34d399;">${privacyPolicy.domain}</span>
        </div>
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #4b5563; font-size: 10px; color: #9ca3af;">
          Close with X button - Only visible in DEV mode
        </div>
      </div>
    `;

    document.body.appendChild(debugPanel);
    console.log("🔍 Red Flag: Debug panel added");

    // Add close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeButton.onclick = () => {
      debugPanel.remove();
      console.log("🔍 Red Flag: Debug panel closed");
    };
    debugPanel.appendChild(closeButton);
  }

  displayModernRiskScore(riskData) {
    console.log("🔍 Red Flag: Displaying risk score");

    const signupButton = this.findSignupButton();
    if (!signupButton) {
      console.log("🔍 Red Flag: No signup button found, inserting at top");
      this.insertRiskCardAtFallback(riskData);
      return;
    }

    console.log("🔍 Red Flag: Inserting risk card before signup button");
    const riskCard = document.createElement("div");
    riskCard.innerHTML = this.getRiskCardHTML(riskData);

    signupButton.parentNode.insertBefore(riskCard, signupButton);

    // Add event listener for view more button
    const viewMoreBtn = riskCard.querySelector(".view-more-btn");
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener("click", () => {
        this.showDetailedAssessment(riskData);
      });
    }

    console.log("🔍 Red Flag: Risk card inserted successfully");
  }

  insertRiskCardAtFallback(riskData) {
    const riskCard = document.createElement("div");
    riskCard.innerHTML = this.getRiskCardHTML(riskData);
    document.body.insertBefore(riskCard, document.body.firstChild);

    const viewMoreBtn = riskCard.querySelector(".view-more-btn");
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener("click", () => {
        this.showDetailedAssessment(riskData);
      });
    }
  }

  getRiskCardHTML(riskData) {
    const riskColor =
      riskData.risk_score >= 70
        ? "#dc2626"
        : riskData.risk_score >= 40
        ? "#d97706"
        : "#16a34a";
    const riskLevel =
      riskData.risk_score >= 70
        ? "High Risk"
        : riskData.risk_score >= 40
        ? "Medium Risk"
        : "Low Risk";

    // Get categories from config
    const categories = CONFIG.riskCategories.slice(0, 4); // Show first 4 categories

    // Get highlights from config
    const highlights = CONFIG.highlightCategories
      .filter((key) => riskData[key])
      .map((key) => {
        const category = CONFIG.riskCategories.find((cat) => cat.key === key);
        return {
          icon: category?.icon || "⚠️",
          text: riskData[key],
        };
      });

    return `
      <div style="
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 24px;
        margin: 20px 0;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        font-family: Arial, sans-serif;
      ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 8px 16px; border-radius: 12px; font-weight: 600; font-size: 14px;">
            <span>🚩</span>
            <span>Red Flag Detected ${
              CONFIG.environment === "dev" ? "[DEV]" : ""
            }</span>
          </div>

        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
          ${categories
            .map(
              (cat) => `
            <div style="display: flex; align-items: center; gap: 6px; background: #f8fafc; padding: 8px 12px; border-radius: 10px; font-size: 12px; color: #475569; border: 1px solid #e2e8f0;">
              <span>${cat.icon}</span>
              <span>${cat.displayName}</span>
            </div>
          `
            )
            .join("")}
        </div>

        <button class="view-more-btn" style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #1f2937, #374151);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        ">
          <span>View Detailed Assessment</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }

  showDetailedAssessment(riskData) {
    console.log("🔍 Red Flag: Showing detailed assessment");

    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        padding: 20px;
      ">
        <div style="
          background: white;
          border-radius: 24px;
          padding: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="font-size: 32px;">🚩</div>
              <div>
                <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #1f2937;">
                  Detailed Risk Assessment ${
                    CONFIG.environment === "dev" ? "[DEV]" : ""
                  }
                </h2>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Comprehensive analysis of privacy policy risks</p>
              </div>
            </div>
            <button class="modal-close" style="background: none; border: none; padding: 8px; cursor: pointer; color: #6b7280; border-radius: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div style="text-align: center; margin-bottom: 24px; padding: 20px; background: #f8fafc; border-radius: 16px;">
            <div style="font-size: 32px; font-weight: 800; color: #d97706; margin-bottom: 4px;">${
              riskData.risk_score
            }% Risk Score</div>
            <div style="font-size: 16px; font-weight: 600; color: #d97706; text-transform: uppercase;">${
              riskData.risk_category
            } Risk</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${CONFIG.riskCategories
              .map((category) =>
                riskData[category.key]
                  ? `
              <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                  <div style="font-size: 18px;">${category.icon}</div>
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px;">${
                    category.displayName
                  }</div>
                </div>
                <div style="color: #6b7280; font-size: 13px; line-height: 1.5; margin-left: 30px;">${
                  riskData[category.key]
                }</div>
              </div>
            `
                  : ""
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  findSignupButton() {
    const buttons = document.querySelectorAll('button, input[type="submit"]');
    for (const button of buttons) {
      const text =
        button.textContent?.toLowerCase() || button.value?.toLowerCase() || "";
      if (
        text.includes("sign") ||
        text.includes("register") ||
        text.includes("create") ||
        text.includes("join")
      ) {
        return button;
      }
    }
    return (
      document.querySelector('button[type="submit"]') ||
      document.querySelector('input[type="submit"]')
    );
  }
}

// Load config and initialize
console.log("🔍 Red Flag: Loading configuration");
setTimeout(() => {
  console.log("🔍 Red Flag: Creating scanner instance");
  new RedFlagScanner();
}, 1000);

// Manual scan from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("🔍 Red Flag: Received message from popup:", request);
  if (request.action === "manualScan") {
    new RedFlagScanner().scanPage();
    sendResponse({ status: "scanning_started" });
  }
  return true;
});
