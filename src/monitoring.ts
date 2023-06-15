// monitoring.ts

import nodemailer from 'nodemailer';
import UserModel from '../models/userModel';  // Assume it's a Mongoose model for User.

// Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const alertThreshold = 100;  // Set your alert threshold.

// Function to send Email
const sendEmailAlert = async (message: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: 'your-email@example.com',
        subject: 'Alert Notification',
        text: message,
    };
    await transporter.sendMail(mailOptions);
}

// Function to send PagerDuty notification
const sendPagerDutyAlert = async (message: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: 'your-pager-duty-email-to-sms@example.com',
        subject: 'Alert Notification',
        text: message,
    };
    await transporter.sendMail(mailOptions);
}

// Function to monitor data and trigger alerts
const monitorData = async () => {
    // Here we're just checking the number of users as an example.
    // Replace this with the actual condition you need to monitor.
    const userCount = await UserModel.countDocuments({});

    if (userCount > alertThreshold) {
        const message = `User count has exceeded the threshold: ${userCount}`;
        await sendEmailAlert(message);
        await sendPagerDutyAlert(message);
    }
}

export const startMonitoring = () => {
    // Run the monitor function every minute (or adjust the interval as needed)
    setInterval(monitorData, 60000);
}

