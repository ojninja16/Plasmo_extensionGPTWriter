## Demo Video :- [Click Here](https://drive.google.com/file/d/1JWrETe7qec2EzUqhMed2sOmTbibvFW2l/view?usp=sharing)

## Getting Started
## Setting Up the Dev Environment

To run the application on your local machine, follow these steps to set up your development environment:
1. Clone the repo

    ```
    git clone https://github.com/ojninja16/Plasmo_extensionGPTWriter
    ```

3. Configure/Create a .env file in the project's root directory and add the following environment variable::

    ```
    PLASMO_PUBLIC_IPINFO_API_TOKEN=<value>
    ```

    #### You can obtain the API key by signing up at https://ipinfo.io/.

4. Install the dependencies using either of the following commands:

    ```bash
    npm install
    ```

    or

    ```bash
    pnpm install
    ```

5. Navigate to the project directory and install the required dependencies using one of the following package managers:

    ```bash
    pnpm dev
    ```

    or

    ```bash
    npm run dev
    ```

6. Open your web browser and load the appropriate development build. For example, if you are developing for the Chrome browser using manifest v3, you might load the following path: build/chrome-mv3-dev or build/firefox-mv3-dev.

7. To load the extension in your Chrome browser, follow these professional steps:

   1.Open Google Chrome and navigate to "chrome://extensions."

   2.Within the Extensions page, locate and click on the "Load Unpacked" button.

   3.A file dialog will appear. Here, navigate to the "build" folder within your project's repository.

   4.Select the "build" folder to load your extension into Chrome.

   5.You should now see your extension available in the Chrome browser's menu bar under the "Extensions" section, denoted as "DEV | [Name of Your Extension]."
 
   6.This process enables you to test and use your extension during development within the Chrome browser.

8. Start editing the popup, modify the popup.tsx file. Any changes you make here should auto-update the extension.
9. To add an options page, create an `options.tsx` file in the root directory and export a default React component. Similarly, to add a content page, create a `content.ts` file, import the necessary module, and perform the required logic. Make sure to reload the extension in your browser after making these changes.

10. #### For more reference, read the [Plasmo documentation](https://docs.plasmo.com/).

---

## Making production build

To create a production bundle for your extension, follow these steps:

1. Run either of the following commands:

    ```bash
    pnpm build
    ```

    or

    ```bash
    npm run build
    ```

2. This will generate a production bundle of your extension, which can be zipped and published to the stores.

---

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
