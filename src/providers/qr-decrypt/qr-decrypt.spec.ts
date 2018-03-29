import { async, TestBed, getTestBed } from '@angular/core/testing';
import {
  BaseRequestOptions
} from '@angular/http';

import { QrDecryptProvider } from './qr-decrypt';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

fdescribe('Service: QrDecryptProvider', () => {
  var service: QrDecryptProvider;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        QrDecryptProvider,
        BaseRequestOptions,
        { provide: APP_CONFIG, useValue: AppConfig }
      ]
    })
    const testbed = getTestBed();
    service = testbed.get(QrDecryptProvider);
  }));



  it('should be created', () => {
    expect(service instanceof QrDecryptProvider).toBe(true);
  })

  it('should encrypt and decrypt ', () => {
    const KEY = "1226578AB249A216C9A9A81FD69CEB0BFDFA6712396C20097537B4B77D7C74BF"
    const MESSAGE = "this test message"
    service.AES_CBC_encrypt(MESSAGE, KEY)
      .then((encrypted) => {
        console.log("encrypted ", encrypted)
        return service.AES_CBC_decrypt(encrypted, KEY)
            }).then((decrypted) => {
        console.log(decrypted)
        expect(decrypted).toBe(MESSAGE)
      }
      )
  });
  
  it('should decrypt a message encoded by USMO', () => {
    const KEY = "1226578AB249A216C9A9A81FD69CEB0BFDFA6712396C20097537B4B77D7C74BF"
    const ENCRYPTED = "33de6419dd1ae0ba3ed6ddb7bbb35afc05ece18491094033b2c0748c75ed69eb11c5f5b9722b4c70d12aefe8a701c0e3"
    const MESSAGE = "{\"text\":\"Some Text\"}"
    service.AES_CBC_decrypt(ENCRYPTED, KEY)
    .then((decrypted) => {
        console.log(decrypted)
        expect(decrypted).toBe(MESSAGE)
      });    
  });
});
