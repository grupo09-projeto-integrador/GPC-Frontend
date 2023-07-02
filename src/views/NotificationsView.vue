<template>
    <div class="main-content">
      <div class="header p-3 d-flex justify-content-between align-items-center">
        <div class="rightHeader">
          <div class="title">Notificações</div>
          <div class="subtitle">Você tem {{ nbNotifications }} notificações para resolver.</div>
        </div>
        <div class="leftHeader">
          <button class="btn btn-primary" style="border-radius: 30px; padding: 6px 14px;" @click="resetNotifications">Marcar como lido</button>
        </div>
      </div>
      <div class="body p-3">
        <template v-for="(notification, index) in notifications" :key="notification.id">
          <div v-if="shouldDisplayDate(notification, index)" class="notification-date">{{ getFormattedDate(notification.date) }}</div>
          <div :class="['notification', { 'notification-read': notification.read }]" class="d-flex flex-column">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-body">{{ notification.body }}</div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        notifications: [
          {
            id: 1,
            title: "Notification 1",
            body: "This is the body of notification 1.",
            date: new Date("2023-06-30"), // Example date
            read: false, // New notification is not read
          },
          {
            id: 2,
            title: "Notification 2",
            body: "This is the body of notification 2.",
            date: new Date("2023-06-30"), // Example date
            read: true, // Already read notification
          },
          {
            id: 3,
            title: "Notification 3",
            body: "This is the body of notification 3.",
            date: new Date("2023-07-01"), // Example date
            read: false, // New notification is not read
          },
        ],
        nbNotifications: 0,
      };
    },
    mounted() {
      this.updateNotificationCount(); // Update the count when the component is mounted
    },
    methods: {
      shouldDisplayDate(notification: any, index: number) {
        if (index === 0) {
          return true;
        }
  
        const currentNotification = this.notifications[index];
        const previousNotification = this.notifications[index - 1];
  
        return !this.isSameDate(currentNotification.date, previousNotification.date);
      },
      isSameDate(date1: any, date2: any) {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      },
      getFormattedDate(date: any) {
        return date.toDateString();
      },
      updateNotificationCount() {
        this.nbNotifications = this.notifications.filter((notification) => !notification.read).length; 
      },
      resetNotifications() {
        this.notifications.forEach((notification) => {
          notification.read = true; 
        });
        this.updateNotificationCount(); 
      },
    },
  };
  </script>
  <style scoped>
  .header {
      border-bottom: 1px solid #e6e6e6;
  }
  
  .title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
  }
  
  .subtitle {
      font-size: 16px;
      color: #777;
  }
  
  .body {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }

  .notification-date {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }

  .notification {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .notification:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .notification-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .notification-body {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }

  .notification-read {
  background-color: #f1f1f1;
}
  </style>
  