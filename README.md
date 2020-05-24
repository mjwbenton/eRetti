# Kindle-Writer

## TODO

- Start its own wifi for the kindle to connect to
- Basic editor features (move cursor, delete characters, selections)
- Support for cursor at the end of lines
- Save the file in an easy place to get off
- Easier setup

## Items Required

- Raspberry Pi 3 B+
- USB Power pack and cable
- MicroSD card and adapter to plug into laptop
- Ethernet cable (to get started only)
- Laptop (all instructions here for Mac OS X laptop)

TODO: Include photo here

## Setup

### Tiny Core Install

First we need to install the base Tiny Core Linux system onto the MicroSD card. When I plug the SD card into my laptop it comes in as `/dev/disk3`, but **please be aware that it may come up as something else on your system. If you blindly follow the commands below you will wipe /dev/disk3 on your system.**

For the commands below to work you need to click to "eject" the MicroSD card you've plugged in to your laptop, otherwise it will complain: `dd: /dev/disk3: Resource busy`.

```
$ cd `mktemp -d`
$ wget http://www.tinycorelinux.net/11.x/armv7/test_releases/RPi/piCore-11.0beta1a.zip
$ unzip piCore-11.0beta1a.zip
$ sudo dd bs=4m if=piCore-11.0beta1a.img of=/dev/disk3
```

### First Boot

Put the SD card in the Raspberry Pi, and boot it for the first time by connecting it to a USB power pack (or other USB power source). Connect up an Ethernet cable to get on the Internet as well.

You should be able to SSH into the machine after a few seconds. The password will be `piCore`.

```
$ ssh tc@box
```

First things first run...

```
tc@box:~$ filetool.sh -b
```

This will backup the current content of the system onto the SD card, which means the newly generated SSH keys will be the same next time you connect, avoiding grizzly security warnings.

### Setting up partitions

Then we want to enter the interactive mode of `fdisk` to fiddle around with the partitions. We are aiming to (1) expand the size of the second partition which will store the software and (2) create another partition just to store our writing.

```
tc@box:~$ sudo fdisk -u /dev/mmcblk0
```

Start by entering `p`. This will output something like this...

```
Device       Boot StartCHS    EndCHS        StartLBA     EndLBA    Sectors  Size Id Type
/dev/mmcblk0p1    43,4,3      1023,37,5         8192     195692     187501 91.5M  6 FAT16
/dev/mmcblk0p2    1023,37,5   1023,37,5       195693     351943     156251 76.2M 83 Linux
```

Note down the `StartLBA` of `/dev/mmcblk0p2` as we're going to need it later.

Next we want to delete the second partition. Enter `d` and then `2`. Then we want to create a new primary partition in its place. Enter `n`, `p` and then `2`. Then for the "First sector" enter the `StartLBA` number we noted down earlier. Enter `1024M` giving us a generous 1Gb of storage space for our application.

We use a "linux" format for this second partition by entering `t` then `2` then `83`.

Again, we'll want to enter `p` to see the work we've done so far. This time note down the `EndLBA` of `/dev/mmcblk0p2`.

We follow a similar process to create the third partition. Enter `n`, `p`, and then `3`. For the "First sector" enter the `EndLBA` we've noted down plus one. We can accept the default for the end sector to go to the end of our SD card.

To make it easy to get the writing off on multiple machines we want to make this partition easily readable. We make it FAT32 to do so. Enter `t`, `3`, `b`.

With all this done we want to enter `w` to write the changes.

Reboot before the next steps.

```
tc@box:~$ sudo reboot
```

Once you've SSH'd back in.

```
tc@box:~$ sudo resize2fs /dev/mmcblk0p2
tc@box:~$ sudo mkfs.vfat -F 32 -n KindleWriter /dev/mmcblk0p3
```

Setup our output filesystem to mount on boot

```
tc@box:~$ echo "mkdir /mnt/kindlewriter && mount -t vfat /dev/mmcblk0p3 /mnt/kindlewriter -o rw,umask=000" >> /opt/bootlocal.sh
tc@box:~$ filetool.sh -b
```

### Wifi setup

If you want, you can get setup on your wifi at this point so that you don't need to leave your Raspberry Pi by your router. Run the following and configure your wifi when requested.

```
tc@box:~$ tce-load -wi firmware-rpi-wifi
tc@box:~$ tce-load -wi wifi
tc@box:~$ sudo reboot
tc@box:~$ sudo wifi.sh
tc@box:~$ echo "wifi.sh -a" >> /opt/bootlocal.sh
tc@box:~$ filetool.sh -b
```

You can now poweroff your Pi, disconnect it from the ethernet and boot it back up again.

```
tc@box:~$ sudo poweroff
```

## Install software

Next we need screen and node to be able to run our application. Screen is available from `tce-load`, but at this time node is not.

```
tc@box:~$ tce-load -wi screen
tc@box:~$ wget https://nodejs.org/dist/v14.3.0/node-v14.3.0-linux-armv7l.tar.xz
tc@box:~$ tar xf node-v14.3.0-linux-armv7l.tar.xz
tc@box:~$ PATH=$PATH:~/node-v14.3.0-linux-armv7l/bin
```

Now that we've got those prerequisites sorted, we can install the Kindle-Writer software

```
tc@box:~$ npm install @mattb.tech/kindle-writer
tc@box:~$ node_modules/.bin/kindle-writer-install-profile
tc@box:~$ filetool.sh -b
```

After running the second command, the system will always start directly into a screen session running the Kindle-Writer server.

## Upgrading

You can grab the latest version just by reinstalling `@mattb.tech/kindle-writer`. SSH in, start a new window in screen with `Ctrl+a Ctrl+c` and then run

```
tc@box:~$ npm install @mattb.tech/kindle-writer
tc@box:~$ node_modules/.bin/kindle-writer-install-profile
tc@box:~$ filetool.sh -b
```

