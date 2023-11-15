# @capacitor-mlkit/barcode-scanning example

This sample Capacitor application uses the `@capacitor-mlkit/barcode-scanning` plugin.

This application does the following:
- If on Android checks `isGoogleBarcodeScannerModuleAvailable` if the module is installed
- If not installed calls `installGoogleBarcodeScannerModule` to install it
- Calls `checkPermissions` to verify if the app has permissions to access the camera
- Calls `requestPermissions` to request permissions if needed
- Calls `scan` to scan a barcode