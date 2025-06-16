# 🚄 IRCTC Auto Booking Bot (Tatkal + UPI + eWallet Support)

This bot helps you **automatically book IRCTC tickets** with full stealth, CAPTCHA solving, payment options, and even Tatkal support. Designed for **zero-tech users**, just follow the instructions step by step. No coding skills needed.

---

## 🌟 Features (Why This Script is Special)

* ✅ **Stealth mode**: Avoids IRCTC bot detection using `puppeteer-extra-plugin-stealth`.
* ✅ **Auto CAPTCHA solving**: Uses **Tesseract OCR** with image processing (via `Jimp`).
* ✅ **Supports UPI & IRCTC eWallet payments**.
* ✅ **Tatkal quota booking supported**.
* ✅ **Time-controlled booking**: Set your exact booking time for Tatkal windows.
* ✅ **Auto form filling**: From login to payment without manual input.

---

## 🧠 Tech Used

| Purpose            | Tool / Package                       |
| ------------------ | ------------------------------------ |
| Browser Automation | `puppeteer-extra` + `stealth-plugin` |
| CAPTCHA Solving    | `tesseract-ocr` (CLI) + `jimp`       |
| Config Management  | `config.json` file                   |
| Terminal Scripting | Node.js                              |

---

## 📁 Folder Structure

```
📁 IRCTC-Auto-Booking
├── main.js              # Main automation script
├── config.json          # User config for booking
├── login_captcha.png    # Captcha image (generated)
├── captcha2.png         # Final captcha image (generated)
```

---

## 🛠️ Setup Instructions (Follow Like a Recipe)

### 1. 🖥️ Create Project Folder

* Go to Desktop.
* Right-click > New Folder > Name it `IRCTC-Auto-Booking`
* Right-click inside > **Open Terminal Here** OR **Open with VS Code**

### 2. 📥 Download Required Code

Inside terminal, run:

```bash
npm init -y
npm install puppeteer-extra puppeteer-extra-plugin-stealth jimp
```

### 3. ✅ Install Node.js (If Not Installed)

* Download from: [https://nodejs.org/dist/v22.16.0/node-v22.16.0-x64.msi]
* Choose LTS Version
* Install normally (Next, Next...)

### 4. ✅ Install Tesseract OCR (Required for CAPTCHA)

* 🔗 Download: [https://github.com/tesseract-ocr/tesseract/releases/download/5.5.0/tesseract-ocr-w64-setup-5.5.0.20241111.exe]
  
* Install it
* Add to **System PATH** (important for `tesseract` command to work)

### 5. 📝 Create These Files in Your Folder

#### `main.js`

➡️ Paste full automation script here (already provided)

#### `config.json`

➡️ Paste and update with your details: check `config.txt` to see how to edit `config.json`

```json
{
  "username": "your_irctc_username",
  "password": "your_irctc_password",
  "origin": "NEW DELHI - NDLS (NEW DELHI)",
  "destination": "SHIVAJI BRIDGE - CSB",
  "date": "01/07/2025",
  "train_number": "14212",
  "class": "2S",
  "quota": "TATKAL",
  "name": "PASSENGER_NAME",
  "age": "26",
  "gender": "M",
  "berthPreference": "NA",
  "foodChoice": "",
  "phonenumber": "9999999999",
  "UPI": "yourupi@upi",
  "upi": false,
  "timedBooking": true,
  "bookingTime": "10:00:00"
}
```

> 💡 Set `upi` to `true` if using UPI; `false` for eWallet.

---

## ▶️ How to Run the Bot

In the terminal (inside your folder):

```bash
node main.js
```

* It will launch browser
* Wait until login
* Automatically solves CAPTCHA
* Fills booking form
* Completes payment (UPI/eWallet)

---

## 📷 Screenshots Saved (If Errors)

* `passenger_form_error.png` – if passenger form fails
* `ewallet_error.png` or `ewallet_payment_error.png` – if payment fails
* `radio_button_error.png` – if payment option not clickable

---

## 🧠 FAQ

### ❓ What if CAPTCHA fails?

* Script retries 5 times.

### ❓ What if IRCTC changes design?

* You’ll need to update selector paths.

### ❓ Can I run on mobile?

* ❌ No, use only on **desktop/laptop**.

### ❓ Can IRCTC detect me?

* Highly unlikely. Uses full stealth. But no system is 100% safe.

---

## 📢 Final Notes

* ✅ Fully tested on **Windows 10/11**.
* ✅ Works best with **Node.js LTS** + **Tesseract CLI**.
* ⚠️ Do not share your `config.json` with anyone!

---

## ⚠️ Disclaimer

> This project is intended for educational purposes only.  
> Use of this bot to access or automate IRCTC services is done entirely at your own risk.

- I do **not endorse or support misuse** of this script on production IRCTC systems.
- The author is **not responsible** for any account suspension, data loss, or legal issues that may arise from using this tool.
- By using this code, **you agree to take full responsibility** for how it is used.

---

## ✨ Credits

Made with ❤️ by [@Royal-Kingfisher](https://github.com/Royal-Kingfisher) – customized for beginners to auto-book IRCTC tickets like a pro 🚀

Inspired by concepts from [@Zaidkhalid44](https://github.com/Zaidkhalid44).


