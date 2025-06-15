

---

🚄 IRCTC Ticket Booking Automation Bot

Automates IRCTC ticket booking using Puppeteer + Stealth Plugin to bypass bot detection, enhanced with Tesseract OCR to solve IRCTC CAPTCHAs. Fully configurable via a config.json file.


---

⚙️ Features

✅ Login with auto CAPTCHA solving using Tesseract.js

✅ Select source, destination, quota, date, class, and train number

✅ Auto-fills passenger details

✅ UPI payment support

✅ IRCTC bot detection evasion using puppeteer-extra-plugin-stealth

✅ Retry logic on CAPTCHA failure

✅ Uses both Tesseract.js and command-line Tesseract for robustness



---

📦 Requirements

Node.js v16+ or newer

Tesseract-OCR installed and added to system path

Google Chrome or Chromium

IRCTC user account



---

🛠️ Installation

# Clone the repo
git clone https://github.com/YOUR_USERNAME/irctc-automation-bot.git
cd irctc-automation-bot

# Install dependencies
npm install


---

🔧 Setup

1. Install Tesseract-OCR

Windows: https://github.com/UB-Mannheim/tesseract/wiki

Linux:

sudo apt install tesseract-ocr

macOS:

brew install tesseract



2. Create config.json in the root directory



{
  "userid": "YourIRCTCUserID",
  "password": "YourIRCTCPassword",
  "origin": "New Delhi",
  "destination": "Mumbai Central",
  "quota": "TATKAL",
  "date": "20-06-2025",
  "train_number": "12951",
  "class": "3A",
  "name": "xxxxx",
  "age": "xx",
  "gender": "M",
  "berthPreference": "LB",
  "foodChoice": "N",
  "phonenumber": "xxxxxxxxxx",
  "UPI": "yourupi@upi"
}

> Note: Update the fields based on your ticket booking preferences.




---

🚀 Run the Script

node irctc.js

> Script will launch a Chromium browser, perform login, fill booking details, and take you to UPI payment.




---

🧠 How CAPTCHA Solving Works

Captures CAPTCHA image

Preprocesses image using Jimp (grayscale, contrast, thresholding)

Uses Tesseract.js and CLI fallback (tesseract.js, --psm 7) to extract text

Inputs the recognized CAPTCHA automatically



---

📁 File Structure

├── irctc.js                # Main automation script
├── config.json             # User configuration file
├── captcha.png             # Raw CAPTCHA image (temporary)
├── captcha-processed.png   # Processed CAPTCHA image (temporary)
├── radio_button_error.png  # Screenshot for error debug (optional)
└── README.md               # This file


---

🛡️ Disclaimer

This script is intended for educational purposes only. Automating IRCTC bookings may violate their terms of service. Use responsibly and at your own risk.


---

📜 License

MIT © 2025 
