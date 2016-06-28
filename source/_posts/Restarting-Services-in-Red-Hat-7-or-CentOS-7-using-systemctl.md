title: Restarting Services in Red Hat 7 or CentOS 7 using systemctl
date: 2016-06-18 17:27:13
tags:
---
Question sent in by Nathan from Quebec.

Q: I just recently installed CentOS 7 and am so confused.  How do I restart services like sshd and crond?

A: Red Hat 7 and CentOS 7 have now moved to systemd as their default system management daemon.  Systemd is different from the old default init system in too many ways to describe here.  But let's get to the meat of your question.

The new way to control system daemons is with the systemctl command.  If you are used to the old init scripts (e.x. /etc/init.d/sshd) the new syntax can be slightly confusing.  For example, this is how we used to restart SSHD with the old upstart init scripts:

    /etc/init.d/sshd restart

or

    service sshd restart

In systemd (Fedora 18 or above, RHEL 7, and CentOS 7) we need to use the systemctl command, like so:


    systemctl restart sshd.service

To stop the sshd service, you would use:


    systemctl stop sshd.service

To start the sshd service, you would use:


    systemctl start sshd.service

To see the status of the sshd service, you would use:


    systemctl status sshd.service

The old /etc/init.d/ scripts are still available for some services for legacy support and backward compatibility.  But you should get into the habit of using the new systemctl command because they can be removed in future updates or releases.

For information on how to make sure your service starts at boot see Start Services on Boot in Red Hat 7 or CentOS 7.

NOTE: You will have to be root to perform all of the commands listed on this page.  If you prefer you can prepend sudo in front of the commands to use sudo instead of directly accessing the root account. This works in Fedora 18 and above, Red Hat 7 and CentOS 7.