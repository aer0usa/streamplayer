# streamplayer
Play audio streams on a Raspberry Pi.

## Dependencies

### Software

#### [ffplay](https://www.npmjs.com/package/ffplay)

Allows you to play audio using [FFplay](https://manpages.org/ffplay).

#### [onoff](https://www.npmjs.com/package/onoff)

GPIO access and interrupt detection with Node.js on Linux boards like the Raspberry Pi or BeagleBone.

### Hardware

#### [Adafruit MAX98357 I2S Class-D Mono Amp](https://learn.adafruit.com/adafruit-max98357-i2s-class-d-mono-amp)

### TODO

* Control volume while player is playing

    `exec("amixer set PCM -- 100%", callback)`
    
    See `man amixer` - "PCM" might not be corrrect. Maybe "Master"?
    
* Control with web server
    * expressjs server?

* Amplifier Mute/Off via software

Power Amplifier SD pin by connecting its pullup resistor to a GPIO Output.
Turn the GPIO Output **ON** to turn the amp on, **OFF** for off/mute
