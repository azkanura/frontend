Place the downloaded kits in C:/dws folder. The folder should look like this on Windows:
    C:/dws/assets
          /g23

** Now, close your browser and double click opengame.bat to start chrome and the application.
** YOU MUST CLOSE your browser before double clicking opengame.bat

To start Chrome from Windows just click opengame.bat or type this in command line:
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" file:///C:/dws/g23/index.html --allow-file-access-from-files --allow-file-access --allow-cross-origin-auth-prompt

To start Chrome from MAC OSX from command line:
If you have downloaded the development kit onto your desktop. The folder would look like this on Mac:
    /users/yourusername/desktop/dws/assets
                                   /g23

1. Quit any running instance of chrome.
2. Launch terminal: /Applications/Utilities/Terminal.app
3. Go to the folder (under g23) containing index.html (use cd command) and copy and paste
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome index.html --allow-file-access-from-files --allow-file-access --allow-cross-origin-auth-prompt

You can also try this on any directory:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome /users/$USER/desktop/dws/g23/index.html --allow-file-access-from-files --allow-file-access --allow-cross-origin-auth-prompt
