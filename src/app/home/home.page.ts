import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeFormat, CameraPermissionState, GoogleBarcodeScannerModuleInstallProgressEvent, GoogleBarcodeScannerModuleInstallState } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAlertOpen = false;
  busy = false;
  installHandle: PluginListenerHandle | undefined = undefined;
  installing = false;

  constructor() { }

  public async onScan() {
    try {
      this.busy = true;
      if (!await this.checkSettings()) {
        this.busy = false;
        return;
      }
      await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128]
      });
    } catch (err) {

      this.setOpen(true);
    } finally {
      this.busy = false;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  private async checkSettings(): Promise<boolean> {
    if (Capacitor.getPlatform() == 'android') {
      const result = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (!result.available) {
        if (!this.installHandle) {
          this.installHandle = BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (event: GoogleBarcodeScannerModuleInstallProgressEvent) => {
            if (event.state == GoogleBarcodeScannerModuleInstallState.COMPLETED) {
              this.installing = false;
            }
          });
        }
        this.installing = true;
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        return false;
      }
    }

    const permitted = await BarcodeScanner.checkPermissions();
    console.log(`Permissions is ${permitted.camera}`);

    if (permitted.camera !== 'granted') {
      const response = await BarcodeScanner.requestPermissions();
      console.log(`Permission is ${response.camera}`);
      return (response.camera == 'granted');
    } else {
      return true;
    }
    return false;
  }

}
