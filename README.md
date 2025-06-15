

---

🚄 IRCTC Automation Bot

Automate the IRCTC ticket booking process using Node.js, Puppeteer, and OCR.


---

✅ Requirements

Google Chrome or Chromium

IRCTC User Account

Node.js and npm

Tesseract OCR



---

🔧 Installation

1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/irctc-automation-bot.git
cd irctc-automation-bot

2. Install Dependencies

npm install


---

⚙️ Setup

1. Install Tesseract-OCR

Windows:

Download from: https://github.com/UB-Mannheim/tesseract/wiki

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

> 📝 Note: Update the fields based on your ticket preferences.




---

🚀 Run the Script

node irctc.js

The script will:

Launch a Chromium browser

Login

Fill booking details

Proceed to UPI payment



---

🤖 How CAPTCHA Solving Works

Captures CAPTCHA image

Uses Jimp to preprocess (grayscale, contrast, threshold)

Uses Tesseract.js & CLI fallback (--psm 7) to extract text

Automatically inputs CAPTCHA



---

📁 File Structure

├── irctc.js                  # Main automation script
├── config.json               # User configuration
├── captcha.png               # Raw CAPTCHA image (temporary)
├── captcha-processed.png     # Processed CAPTCHA image (temporary)
├── radio_button_error.png    # Screenshot for error debug (optional)
└── README.md                 # This file


---

⚠️ Disclaimer

This script is for educational purposes only. Automating IRCTC bookings may violate their terms of service. Use at your own risk.


---

📄 License

MIT License


---


