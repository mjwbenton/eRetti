#!/bin/sh

# kill dhcp client for wlan0
sleep 1
if [ -f /var/run/udhcpc.eth0.pid ]; then
  kill `cat /var/run/udhcpc.eth0.pid`
  sleep 0.1
fi

# configure interface wlan0
ifconfig wlan0 192.168.10.1 netmask 255.255.255.0 broadcast 192.168.10.255 up

# Start the DHCP Server Process once the Interface is Ready with the IP Add
sleep .1
udhcpd /home/tc/udhcpd.conf &

# Start hostapd
hostapd /home/tc/hostapd.conf &
