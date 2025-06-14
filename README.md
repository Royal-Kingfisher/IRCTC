# 🚆 IRCTC Login Automation Demo

> ⚠️ **This project is for educational purposes only.** It demonstrates Puppeteer automation with CAPTCHA solving using open-source tools. Do **not** use it to access or interact with real IRCTC systems, as doing so may violate their Terms of Service.

---

## ✅ Prerequisites

Before starting, ensure you have the following installed:

### 1. **Node.js**
- Download and install from: https://nodejs.org/
- Recommended version: **Node.js 18.x LTS** or higher
- Verify installation:
```bash
node -v
npm -v
```

---

## 🚀 Installation Steps

### 1. **Clone or Download the Repository**

If using Git:
```bash
git clone https://github.com/your-username/irctc-login-automation-demo.git
cd irctc-login-automation-demo
```

Or simply download the ZIP and extract it.

---

### 2. **Install Required Dependencies**

Run this in the root directory of the project:
```bash
npm install
```

It will install the following:
- `puppeteer-extra`
- `puppeteer-extra-plugin-stealth`
- `tesseract.js`
- `jimp`
- `fs`, `path` (built-in)

---

### 3. **Update Your Credentials**

Open the `irctc.js` file and replace these placeholders:
```js
await page.type('input[formcontrolname="userid"]', "YourUsername", { delay: 150 });
await page.type('input[formcontrolname="password"]', "YourPassword", { delay: 150 });
```

> ⚠️ Use dummy credentials if publishing the code. Never commit real credentials to GitHub.

---

### 4. **Run the Script**

```bash
node irctc.js
```

> The script will:
- Open IRCTC in a visible browser
- Click Login
- Enter credentials
- Capture and solve CAPTCHA using OCR
- Attempt login
- Keep the browser open after login

---

## 📁 Project Structure

```
irctc-login-automation-demo/
├── irctc.js                # Main automation script
├── captcha.png             # Captured CAPTCHA image (temporary)
├── captcha-processed.png   # Enhanced CAPTCHA image (temporary)
├── package.json            # Project config & dependencies
└── README.md               # Project instructions & disclaimer
```

---

## 📌 Notes

- CAPTCHA solving uses open-source OCR (Tesseract.js) and may not be perfect.
- Script includes retry logic for failed logins due to incorrect CAPTCHA.
- Browser remains open after execution for manual inspection.

---

## 📄 License

This project is licensed under the **MIT License**.

> You are free to use, modify, and distribute this software. The author is **not responsible** for any misuse.

---

## 📬 Disclaimer

> This script is provided **solely for educational and research purposes**. Do not use it to automate, scrape, or interact with live government or commercial platforms like [IRCTC](https://www.irctc.co.in) unless you have explicit permission. Misuse of automation tools may result in account bans or legal consequences.
