🔥READ "make_sure_to_read.txt" READ
---

# 🚂 IRCTC Automation Bot

Automate the IRCTC ticket booking process using **Node.js**, **Puppeteer**, and **OCR**.

---

## ✅ Requirements

- Google Chrome or Chromium
- IRCTC User Account
- Node.js and npm
- Tesseract OCR

---

## 🔧 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/irctc-automation-bot-demo.git

cd irctc-automation-bot-demo

2. Install Dependencies



npm install


---

⚙️ Setup

1. Install Tesseract-OCR

Windows:(Same Terminal where you cloned the git)

Terminal:

npm install tesseract.js

Linux:


sudo apt install tesseract-ocr

macOS:


brew install tesseract

2. Create config.json in the root directory

{
  "userid": "YourIRCTCUserID",
  "password": "YourIRCTCPassword",
  "origin": "NDLS",
  "destination": "NNO",
  "quota": "TATKAL",
  "class": "3AC",
  "date": "20/06/2025",
  "train_number": "12951",
  "name": "Your Name",
  "age": "30",
  "gender": "M",
  "berthPreference": "LB",
  "foodChoice": "N",
  "phonenumber": "xxxxxxxxxx",
  "UPI": "yourupi@upi"
}

> ⚠️ Note: Update the values based on your preferences.

---

🚀 Run the Script

node irctc.js

This will:

Launch a Chromium browser

Login to IRCTC

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

├── irctc.js               # Main automation script
├── config.json            # User configuration
├── captcha.png            # Raw CAPTCHA image (temporary)
├── captcha-processed.png  # Processed CAPTCHA image (temporary)
├── radio_button_error.png # Screenshot for debug (optional)
├── README.md              # This file


---

⚠️ Disclaimer

This script is intended for educational purposes only.
Automating IRCTC bookings may violate their terms of service.
Use responsibly and at your own risk.


---

📜 License

MIT License Royal-Kingfisher

---



