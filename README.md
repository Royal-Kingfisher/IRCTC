Here is a complete **README**-style breakdown of **every single tool, library, and setup step** used in your IRCTC auto-login script, written professionally and clearly for anyone (especially beginners):

---

## 🚀 IRCTC Auto Login Script (For Educational Purposes Only)

This script uses **Puppeteer** and **Tesseract.js** to automate login on the [IRCTC](https://www.irctc.co.in/) website by:

* Opening the site using a stealthy browser instance
* Filling in username and password
* Capturing and solving CAPTCHA using OCR (Optical Character Recognition)
* Retrying if login fails due to incorrect CAPTCHA

⚠️ **Disclaimer:** This script is intended strictly for educational purposes. Automating login on public platforms like IRCTC may violate their [Terms of Use](https://www.irctc.co.in/nget/profile/terms-and-conditions) and can result in account suspension or legal consequences. Use responsibly.

---

### 🧰 Tools & Libraries Used

| Tool / Package                                                                                   | Purpose                                              |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| [`puppeteer-extra`](https://www.npmjs.com/package/puppeteer-extra)                               | Headless Chrome browser automation                   |
| [`puppeteer-extra-plugin-stealth`](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth) | Hides automation fingerprints to avoid bot detection |
| [`tesseract.js`](https://www.npmjs.com/package/tesseract.js)                                     | JavaScript OCR engine for solving CAPTCHA            |
| [`jimp`](https://www.npmjs.com/package/jimp)                                                     | Image processing before feeding into Tesseract       |
| `fs`, `path` (Node.js core)                                                                      | For saving/loading images locally                    |

---

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) installed (preferably version 18+)
* Basic command-line knowledge

---

### 📦 Installation

Open your terminal and run:

```bash
# Create a new folder
mkdir irctc-login && cd irctc-login

# Initialize Node.js project
npm init -y

# Install all required packages
npm install puppeteer-extra puppeteer-extra-plugin-stealth puppeteer tesseract.js jimp
```

---

### 📝 Configuration

In your script file (`irctc.js`):

* Replace `"YourUsername"` with your actual IRCTC username.
* Replace `"YourPassword"` with your actual password.

```js
await usernameInput.type("YourUsername", { delay: 200 });
await passwordInput.type("YourPassword", { delay: 200 });
```

⚠️ **Do not share your credentials in public repos.**

---

### ▶️ Running the Script

In your terminal, run:

```bash
node irctc.js
```

---

### 🔒 Important Notes

* The script **waits 5 seconds** before interacting to allow the site to fully load.
* CAPTCHA solving uses **Tesseract.js** and may fail sometimes. It retries if login fails.
* The browser **stays open** after a successful login for observation or further actions.

---

### 📁 File Structure (after running)

```bash
irctc-login/
├── irctc.js                 # The main automation script
├── captcha.png              # Captured CAPTCHA (saved during run)
├── captcha-processed.png    # Processed version for OCR
├── package.json
└── node_modules/
```

---

### ❗ Legal & Ethical Disclaimer

> This project is a proof-of-concept built for learning browser automation and CAPTCHA handling. Do not use this script against any website without explicit permission. Use of automation tools on IRCTC or similar platforms is **against their policies** and **can result in your account being blocked or legal action**.

---


