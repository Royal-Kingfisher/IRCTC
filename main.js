
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const Jimp = require("jimp");
// const Tesseract = require("tesseract.js");
const { exec } = require("child_process");
const config = require("./config.json");
const path = require("path");
const fs = require("fs");

puppeteer.use(StealthPlugin());

function randomDelay(min = 300, max = 1000) {
  return new Promise((res) =>
    setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min)
  );
}

// ⏰ NEW: Wait until exact target time (e.g., "11:00:00")
function waitUntilBookingTime(targetTime) {
  return new Promise((resolve) => {
    const check = () => {
      const now = new Date();
      const [targetHour, targetMinute, targetSecond] = targetTime
        .split(":")
        .map(Number);

      const target = new Date(now);
      target.setHours(targetHour, targetMinute, targetSecond, 0);

      const delay = target - now;

      if (delay > 0) {
        console.log(
          `⏳ Waiting until ${targetTime}... (${delay / 1000}s left)`
        );
        setTimeout(check, Math.min(delay, 1000));
      } else {
        console.log("⏰ Booking time reached!");
        resolve();
      }
    };
    check();
  });
}

async function automateIRCTC() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const [page] = await browser.pages();

  console.log("🌐 Opening IRCTC...");
  await page.goto("https://www.irctc.co.in/nget/train-search", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("⏳ Waiting 5 seconds...");
  await randomDelay(5000, 5000);

  console.log("🔐 Clicking Login...");
  await page.evaluate(() => {
    const btn = document.querySelector("a.loginText");
    if (btn) btn.click();
  });

  const usernameSelector = 'input[formcontrolname="userid"]';
  await page.waitForSelector(usernameSelector, { visible: true });
  await page.click(usernameSelector);
  await page.focus(usernameSelector);
  await page.evaluate((sel) => {
    const input = document.querySelector(sel);
    if (input) input.value = "";
  }, usernameSelector);
  await page.type(usernameSelector, config.username || "your_username", {
    delay: 120,
  });

  const passwordSelector = 'input[formcontrolname="password"]';
  await page.waitForSelector(passwordSelector, { visible: true });
  await page.click(passwordSelector);
  await page.focus(passwordSelector);
  await page.evaluate((sel) => {
    const input = document.querySelector(sel);
    if (input) input.value = "";
  }, passwordSelector);
  await page.type(passwordSelector, config.password || "your_password", {
    delay: 120,
  });

async function loginWithCaptcha(page, browser) {
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`🔁 Attempt ${attempt} - Solving login CAPTCHA...`);

    const captchaPath = "./login_captcha.png";
    await downloadCaptchaImage(page, captchaPath);
    const captchaText = await getCaptchaText(captchaPath);
    console.log("🧠 CAPTCHA Text:", captchaText);

    await page.evaluate(() => {
      const input = document.querySelector('input[formcontrolname="captcha"]');
      if (input) input.value = "";
    });

    await page.type('input[formcontrolname="captcha"]', captchaText, {
      delay: 100,
    });

     const signInBtn = await page.$(
      'button.search_btn.train_Search.train_Search_custom_hover[type="submit"]'
    );
    if (signInBtn) {
      await signInBtn.click();
      console.log("🚀 Clicked SIGN IN");
    }

    await randomDelay(5000, 5000);

    const loginFailed = await page.$('input[formcontrolname="userid"]');
    if (!loginFailed) {
      console.log("✅ Login successful!");
      return;
    } else {
      console.log("❌ Login failed. Retrying...");
      await page.click("img.captcha-img");
      await randomDelay(2000, 2000);
    }
  }

  console.error("❌ Too many failed login CAPTCHA attempts.");
  await browser.close();
  process.exit(1);
}



  await loginWithCaptcha(page, browser);


  const origin = config.origin;
  await page.waitForSelector("#origin input.ui-autocomplete-input", {
    visible: true,
    timeout: 20000,
  });
  await page.type("#origin input.ui-autocomplete-input", origin, { delay: 40 });
  // Wait for the autocomplete suggestions and select the first option
  await page.waitForSelector(".ui-autocomplete-list-item", {
    visible: true,
    timeout: 20000,
  });
  await page.keyboard.press("Enter");

  const destination = config.destination;
  await page.waitForSelector("#destination input.ui-autocomplete-input", {
    visible: true,
    timeout: 20000,
  });
  await page.type("#destination input.ui-autocomplete-input", destination, {
    delay: 40,
  });


  // Wait for the autocomplete suggestions and select the first option
  await page.waitForSelector(".ui-autocomplete-list-item", {
    visible: true,
    timeout: 20000,
  });
  await page.keyboard.press("Enter");
  // Quota Selection
  //await page.waitForNetworkIdle({ idleTime: 25, timeout: 7000 });
  //await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await delay(500);
  await page.waitForSelector(
    'p-dropdown[formcontrolname="journeyQuota"] .ui-dropdown-trigger',
    { visible: true, timeout: 30000 }
  );

  // Click the inner trigger button to open the dropdown
  await page.click('p-dropdown[formcontrolname="journeyQuota"]', {
    delay: 100,
  });

  // Wait for the dropdown options to be visible
  console.log("Waiting for journey quota dropdown options...");
  await page.waitForSelector(
    'p-dropdown[formcontrolname="journeyQuota"] .ui-dropdown-item'
  );
  console.log("Journey quota dropdown options found.");
  const desiredQuota = config.quota;
  console.log(`Selecting journey quota: ${desiredQuota}`);
  await page.click(
    `p-dropdown[formcontrolname="journeyQuota"] .ui-dropdown-item[aria-label="${desiredQuota}"]`
  );

  await page.keyboard.press("Enter");

  const journeyDate = config.date;
  await page.waitForSelector("#jDate input.ui-inputtext", {
    visible: true,
    timeout: 20000,
  });
  await page.click("#jDate input.ui-inputtext");
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.up("Control");
  await page.type("#jDate input.ui-inputtext", journeyDate, { delay: 100 });
  await page.keyboard.press("Enter");

  const trainNumber = config.train_number;
  const className = config.class;
  await page.waitForSelector(
    ".form-group.no-pad.col-xs-12.bull-back.border-all",
    { visible: true, timeout: 40000 }
  );
  let trainContainers = await page.$$(
    ".form-group.no-pad.col-xs-12.bull-back.border-all"
  );
  console.log("total containers " + trainContainers.length);

  for (const container of trainContainers) {
    const trainHeading = await container.$(
      ".col-sm-5.col-xs-11.train-heading strong"
    );
    if (trainHeading) {
      const trainText = await (
        await trainHeading.getProperty("textContent")
      ).jsonValue();
      const extractedTrainNumber = trainText.match(/\((\d+)\)/);
      if (extractedTrainNumber && extractedTrainNumber[1] === trainNumber) {
        console.log(`${trainNumber} found.`);
        const classElement = await page.evaluateHandle(
          (container, className) => {
            const elements = container.querySelectorAll(`.pre-avl strong`);
            for (let element of elements) {
              if (element.textContent.includes(className)) {
                return element.closest(".pre-avl");
              }
            }
            return null;
          },
          container,
          className
        );

        if (classElement) {
          console.log(`${className} found.`);
          await (await classElement.asElement()).click();
          //await page.waitForNetworkIdle({ idleTime: 100, timeout: 9000});
          await delay(1000);
          const selectedDate = await page.$(
            ".link.ng-star-inserted .pre-avl strong"
          );
          if (selectedDate) {
            await selectedDate.click();
            console.log(
              `Clicked on the selected date: ${await page.evaluate(
                (el) => el.textContent,
                selectedDate
              )}`
            );
            await page.waitForSelector(
              "button.btnDefault.train_Search.ng-star-inserted:not(.disable-book)"
            );
            await page.click(
              "button.btnDefault.train_Search.ng-star-inserted:not(.disable-book)"
            );
            // ✅ Handle YES/NO popup after clicking Book Now
            try {
              console.log("🟡 Waiting for confirmation popup...");
              await page.waitForSelector("button.btn.btn-primary", {
                visible: true,
                timeout: 5000,
              });
              const yesButton = await page.$x("//button[contains(., 'Yes')]");
              if (yesButton.length > 0) {
                await yesButton[0].click();
                console.log("✅ Clicked YES on popup.");
              } else {
                console.log("⚠️ YES button not found in popup.");
              }
            } catch (err) {
              console.log("ℹ️ No confirmation popup appeared.");
            }
          } else {
            console.error("Selected date element not found.");
          }
        } else {
          console.error(`${className} not found.`);
        }
        break;
      }
    }
  }
  console.log("✅ Clicked YES on popup.");

  // ✅ Wait for the passenger form to appear
  console.log("⏳ Waiting for passenger form...");
  try {
    await page.waitForSelector('input[placeholder="Name"]', {
      visible: true,
      timeout: 30000,
    });
    let formAppeared = false;
    for (let i = 0; i < 3; i++) {
      try {
        console.log(`🔁 Attempt ${i + 1} to load passenger form...`);
        await page.waitForSelector('input[placeholder="Name"]', {
          visible: true,
          timeout: 10000,
        });
        formAppeared = true;
        console.log("✅ Passenger form loaded");
        break;
      } catch (err) {
        console.log("🕓 Form not found, retrying...");
        await delay(2000);
      }
    }
    if (!formAppeared) {
      console.error("❌ Passenger form still not loaded. Exiting...");
      await page.screenshot({ path: "passenger_form_error.png" });
      await browser.close();
      return;
    }

    console.log("✅ Passenger form loaded");
  } catch (err) {
    console.error("❌ Passenger form did not load. Exiting...");
    await page.screenshot({ path: "passenger_form_error.png" });
    await browser.close();
    return;
  }

  // ✅ Fill passenger name
  await page.type('input[placeholder="Name"]', config.name, {
    delay: 90,
  });

  // ✅ Fill passenger age
  await page.type('input[placeholder="Age"]', config.age, {
    delay: 90,
  });

  // ✅ Select passenger gender
  await page.select('select[formcontrolname="passengerGender"]', config.gender);

  // ✅ Select berth preference
  await page.select(
    'select[formcontrolname="passengerBerthChoice"]',
    config.berthPreference
  );

  // ✅ Optional: Select food choice if available
  const foodChoiceSelector = 'select[formcontrolname="passengerFoodChoice"]';
  if (await page.$(foodChoiceSelector)) {
    await page.select(foodChoiceSelector, config.foodChoice);
    console.log("✅ Food choice selected.");
  } else {
    console.log("⚠️ Food choice not available. Skipping...");
  }

  // ✅ Fill mobile number (clears if already filled)
  await page.waitForSelector('input[formcontrolname="mobileNumber"]', {
    visible: true,
    timeout: 10000,
  });
  await page.click('input[formcontrolname="mobileNumber"]');
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
  await page.type('input[formcontrolname="mobileNumber"]', config.phonenumber, {
    delay: 90,
  });

  console.log("✅ Passenger form filled.");

  // ✅ Safely check "Book only if confirm berths are allotted" checkbox if present
  try {
    const checkbox = await page.$("#confirmberths");
    if (checkbox) {
      const isChecked = await page.evaluate((cb) => cb.checked, checkbox);
      if (!isChecked) {
        await checkbox.click();
        console.log("✅ Checked 'Book only if confirm berths are allotted'.");
      } else {
        console.log("☑️ Checkbox already checked.");
      }
    } else {
      console.log("⚠️ Checkbox with id='confirmberths' not found. Skipping.");
    }
  } catch (err) {
    console.error(
      "❌ Error while handling confirm berth checkbox:",
      err.message
    );
  }

  console.log("Waiting for radio button...");
  try {
    await page.waitForSelector('p-radiobutton[id="2"] .ui-radiobutton-box', {
      visible: true,
      timeout: 30000,
    });
    console.log("Radio button found, clicking...");
    await page.click('p-radiobutton[id="2"] .ui-radiobutton-box');
    console.log("Radio button clicked.");
  } catch (error) {
    console.error("Radio button not found within timeout:", error);
    await page.screenshot({ path: "radio_button_error.png" });
    console.log("Screenshot taken for debugging.");
  }

  console.log("Waiting for continue button...");
  await page.waitForSelector("button.train_Search.btnDefault", {
    visible: true,
  });
  console.log("Continue button found, clicking...");
  await page.click("button.train_Search.btnDefault");
  console.log("Continue button clicked.");

  //writing captcha again

  console.log("Waiting for captcha image again...");
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await delay(2000);
  await page.waitForSelector("img.captcha-img", {
    visible: true,
    timeout: 5000,
  });
  await delay(700);
  await page.evaluate(() => {
    window.scrollBy({
      top: 380,
      behavior: "smooth",
    });
  });
  const maxAttemptsAgain = 5;
  for (let attempt = 1; attempt <= maxAttemptsAgain; attempt++) {
    console.log(`Attempt ${attempt} to solve captcha`);
    await delay(1000);

    const captchaImagePath = "./captcha2.png";
    try {
      await downloadCaptchaImage(page, captchaImagePath);
    } catch (error) {
      console.error("Failed to download captcha image:", error);
      await browser.close();
      return;
    }

    const captchaText = await getCaptchaText(captchaImagePath);

    console.log("Extracted Captcha:", captchaText);

    // Fill captcha
    await page.waitForSelector('input[formcontrolname="captcha"]');
    await page.type('input[formcontrolname="captcha"]', captchaText, {
      delay: 90,
    });

    // Submit the form
    await page.keyboard.press("Enter");
    // Wait for the form to submit
    if (await afterDetailsFilled(page)) {
      console.log("Captcha solved again.");
      break;
    } else {
      console.log("Login failed after the filling details, retrying...");
    }

    // Wait for some indication that login was successful
    // try {
    //     await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 3000 });

    //     // Check if the login was successful by looking for a specific element or URL
    //     if (await isLoggedIn(page)) {
    //         console.log("Captcha solved and login successful.");
    //         break;
    //     } else {
    //         console.log("Login failed, retrying...");
    //     }
    // } catch (error) {
    //     console.log("Captcha failed, retrying...");
    // }

    if (attempt === maxAttemptsAgain) {
      console.error("Max attempts to solve captcha reached. Exiting...");
      await browser.close();
      return;
    }
  }
  console.log("Captcha solved again and details filled successfully.");
  if (config.upi === false) {
    console.log("💳 Using IRCTC eWallet for payment...");

    try {
      await page.waitForSelector(".bank-type", {
        visible: true,
        timeout: 15000,
      });
      const eWalletOption = await page.$x(
        "//div[contains(@class, 'bank-type')]//span[contains(text(), 'eWallet')]"
      );

      if (eWalletOption.length > 0) {
        await eWalletOption[0].click();
        console.log("✅ Selected IRCTC eWallet.");

        // Wait for Pay & Book button
        const payBtn = await page.waitForXPath(
          "//button[contains(text(), 'Pay & Book')]",
          {
            visible: true,
            timeout: 10000,
          }
        );
        await payBtn.click();
        console.log("✅ Clicked Pay & Book.");

        // Optional: Wait for CONFIRM button (used for mobile or popup confirmation)
        const confirmBtn = await page
          .waitForXPath("//button[contains(text(), 'CONFIRM')]", {
            visible: true,
            timeout: 5000,
          })
          .catch(() => null);
        if (confirmBtn) {
          await confirmBtn.click();
          console.log("✅ Clicked CONFIRM.");
        } else {
          console.log("ℹ️ No CONFIRM button appeared.");
        }
      } else {
        console.error("❌ IRCTC eWallet option not found.");
        await page.screenshot({ path: "ewallet_error.png" });
      }
    } catch (err) {
      console.error("❌ Error during eWallet payment:", err.message);
      await page.screenshot({ path: "ewallet_payment_error.png" });
    }
  } else {
    console.log("💸 Using UPI for payment...");
    // Existing UPI logic starts here
    await page.waitForSelector(".bank-type:nth-child(1)", {
      visible: true,
      timeout: 60000,
    });
    await page.click(".bank-type:nth-child(1)");

    await page.waitForSelector(
      '.bank-text:has(img[src="./assets/images/payment/113.png"])',
      { visible: true, timeout: 30000 }
    );
    await page.click(
      '.bank-text:has(img[src="./assets/images/payment/113.png"])'
    );

    await page.waitForSelector(
      "button.btn.btn-primary.hidden-xs.ng-star-inserted"
    );
    await page.click("button.btn.btn-primary.hidden-xs.ng-star-inserted");

    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForSelector("#vpaCheck", { visible: true, timeout: 30000 });

    const UPIID = config.UPI;
    await page.type("#vpaCheck", UPIID, { delay: 90 });
    await page.keyboard.press("Enter");

    await page.waitForSelector("#upi-sbmt");
    await page.click("#upi-sbmt");

    await page.waitForNavigation({ waitUntil: "networkidle0" });
  }
  await delay(60000);
}

async function downloadCaptchaImage(page, dest) {
  console.log("Waiting for captcha image...");
  await delay(1000);
  const captchaImgElement = await page.waitForSelector("img.captcha-img", {
    visible: true,
  }); // Increased timeout to 60 seconds
  if (!captchaImgElement) {
    throw new Error("Captcha image not found.");
  }
  console.log("Captcha image found, downloading...");
  await captchaImgElement.screenshot({ path: dest });
  console.log("Captcha image downloaded.");
}

async function processCaptchaImage(imagePath) {
  // Optionally process captcha image with Jimp (resize, enhance, etc.)
  const image = await Jimp.read(imagePath);

  // Convert to grayscale
  image.grayscale().invert();

  // Increase contrast
  image.contrast(0.7).threshold({ max: 128 });

  // Resize for better OCR
  image.resize(300, Jimp.AUTO);

  await image.writeAsync(imagePath);
  console.log("Image processed.");
}

async function getCaptchaText(imagePath) {
  await processCaptchaImage(imagePath);

  return new Promise((resolve, reject) => {
    exec(`tesseract ${imagePath} stdout -l eng --psm 7`, (error, stdout) => {
      // Added --psm 7 option
      if (error) {
        console.error(`Error executing Tesseract: ${error}`);
        reject(error);
      } else {
        const captchaText = stdout.trim();
        resolve(captchaText);
      }
    });
  });
}

async function isLoggedIn(page) {
  // Check for the presence of the element that appears after login
  try {
    // Wait for the page to load
    await page.waitForSelector('a[href="/nget/logout"]', {
      visible: true,
      timeout: 3000,
    });
    console.log("Logout button found");
    return true;
  } catch (error) {
    return false;
  }
}
async function afterDetailsFilled(page) {
  try {
    // Wait for the page to load
    await page.waitForSelector(".payment_opt", {
      visible: true,
      timeout: 3000,
    });
    console.log("Payment heading found");
    return true;
  } catch (error) {
    return false;
  }
}
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// Example usage
automateIRCTC();
