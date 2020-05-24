# Kindle-Writer

## TODO

- Start its own wifi for the kindle to connect to
- Basic editor features (move cursor, delete characters, selections)
- Support for cursor at the end of lines
- Save the file in an easy place to get off
- Easier setup

## Setup Notes

### Tiny Core Install

- `sudo dd bs=4m if=/Users/mattb/Downloads/piCore-11/piCore-11.0beta1a.img of=/dev/disk3`
- Used a USB power pack, plugged into my monitor
- filetool.sh -b
- Enlarge second partition (see http://www.gerrelt.nl/RaspberryPi/wordpress/tutorial-unpluggable-squeezelite-player-on-tinycore/)

```
sudo fdisk -u /dev/mmcblk0
p
d
2
n
p
2
${firstSector}
# accept default
t
2
83
w
sudo reboot
```

```
sudo resize2fs /dev/mmcblk0p2
```

## Wifi setup

- Plug Into ethernet

```
$ tce-load -wi firmware-rpi-wireless
$ tce-load -wi wireless-KERNEL
$ tce-load -wi wifi
$ sudo wifi.sh // initial setup
```

Add wifi.sh -a to bootlocal.sh

## Install node

wget https://nodejs.org/dist/v14.3.0/node-v14.3.0-linux-armv7l.tar.xz
tar xf node-v14.3.0-linux-armv7l.tar.xz
add to \$PATH

## Install screen

tce-load -wi screen
add screen to onboot

## Install KindleWriter

npm install @mattb.tech/kindle-writer

## Setup to run on startup in screen

```
$ node_modules/.bin/kindle-writer-install-profile
```
