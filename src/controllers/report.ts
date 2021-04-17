import { Handler } from "../models/route";
import puppeteer from "puppeteer";
import fs from "fs";

export const generateReport: Handler = async (req, res, _next) => {
  var fullUrl = req.protocol + "://" + req.get("host");
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fullUrl + "/public/templates/test.html");

    await page.addScriptTag({
      url: fullUrl + "/public/highchartjs/highcharts.js",
    });
    await page.addScriptTag({
      url: fullUrl + "/public/highchartjs/modules/exporting.js",
    });
    await page.addScriptTag({
      url: fullUrl + "/public/highchartjs/modules/export-data.js",
    });
    await page.addScriptTag({
      url: fullUrl + "/public/highchartjs/modules/accessibility.js",
    });
    await page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.2.1.min.js",
    });
    await page.waitForFunction("window.jQuery", {});

    for (let i = 1; i <= 2; i++) {
      var result = createModel();
      var ss = JSON.stringify(result);
      // Logger.debug(ss);
      await page.waitForFunction(`render(${ss})`, {});

      await page.waitForSelector(".highcharts-series-group");

      const imageBase64 = await page.evaluate(() => {
        if (!window.chart || typeof window.chart.getImageURI === "undefined") {
          return null;
        }
        return window.chart.getImageURI();
      });

      let buf;
      if (imageBase64) {
        // Exported the chart via Google Charts API.
        buf = Buffer.from(
          imageBase64.slice("data:image/png;base64,".length),
          "base64"
        );
      } else {
        const elt = await page.$("#container");
        // Chart doesn't support export, take a screenshot

        buf = elt && (await elt.screenshot());
      }

      if (buf)
        fs.writeFile(`./src/content/reports/test-${i}.png`, buf, () => {});

      await page.pdf({
        path: `./src/content/reports/test-${i}.pdf`,
        format: "a4",
        margin: {
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
        },
      });
    }

    await browser.close();
    return res.send("Report Created");
  } catch (error) {
    return res.status(400).send("Invalid email or password.");
  }
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createModel() {
  const array1: Array<number> = [];
  const array2: Array<number> = [];
  const array3: Array<number> = [];

  for (let i = 0; i < 12; i++) {
    array1.push(getRandomInt(50));
  }
  for (let i = 0; i < 12; i++) {
    array2.push(getRandomInt(50));
  }
  for (let i = 0; i < 12; i++) {
    array3.push(getRandomInt(50));
  }

  return [array1, array2, array3];
}

declare global {
  interface Window {
    chart: any;
  }
}
