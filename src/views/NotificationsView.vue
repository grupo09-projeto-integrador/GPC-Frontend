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
import { Ativo } from '@/model/ativo';
import { Beneficiario } from '@/model/beneficiario';
import { Categoria } from '@/model/categoria';
import { Movimentacao } from '@/model/movimentacao';
import { defineComponent } from 'vue';
import { AtivoClient } from '@/client/ativo.client';
import { MovimentacoesClient } from '@/client/movimentacao.client';
import { CategoriaClient } from '@/client/categoria.client';

interface Notification {
  title: string;
  body: string;
  date: Date;
  read: boolean;
}

export default defineComponent({
  data() {
    return {
      notifications: [] as Notification[],
      movimentacoes: [] as Movimentacao[],
      beneficiarios: [] as Beneficiario[],
      ativos: [] as Ativo[],
      categories: [] as Categoria[],
      nbNotifications: 0,
    };
  },
  mounted() {
    this.updateNotificationCount();
    this.dataDeliveryAlert();
    this.qtdeAtivos();
  },
  methods: {
    shouldDisplayDate(notification: Notification, index: number) {
      if (index === 0) {
        return true;
      }
      const currentNotification = this.notifications[index];
      const previousNotification = this.notifications[index - 1];

      return !this.isSameDate(currentNotification.date, previousNotification.date);
    },
    isSameDate(date1: Date, date2: Date) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
    getFormattedDate(date: Date) {
      return date.toDateString();
    },
    async updateNotificationCount() {
      this.nbNotifications = this.notifications.filter((notification) => !notification.read).length;
    },
    async resetNotifications() {
      this.notifications.forEach((notification) => {
        notification.read = true;
      });
      this.updateNotificationCount();
    },
    async dataDeliveryAlert() {
      try {
        const move = new MovimentacoesClient();
        const today = new Date();
        const oneDayBeforeToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        console.log(oneDayBeforeToday);

        const res = await move.findAll();
        this.movimentacoes = res;

        console.log(this.movimentacoes);

        for (const movimentaco of this.movimentacoes) {
          const datadevoluco = new Date(movimentaco.dataDevolucao);
          datadevoluco.setDate(datadevoluco.getDate() + 1);
          datadevoluco.setHours(0, 0, 0, 0);

          console.log(datadevoluco);

          if (datadevoluco.getTime() === oneDayBeforeToday.getTime()) {
            const notification = {
              title: 'Aviso de Devolução Próxima',
              body: `O ativo com o ID de patrimônio ${movimentaco.ativo.idPatrimonio} atribuído ao beneficiário ${movimentaco.beneficiario.perfil.nome} tem a data de devolução prevista para amanhã.`,
              date: new Date(),
              read: false,
            };

            this.notifications.push(notification);
          }
        }

        this.updateNotificationCount();
      } catch (error) {
        console.error('Error retrieving movimentacoes:', error);
      }
    },
    async qtdeAtivos() {
      try {
        const categoria = new CategoriaClient();
        const res = await categoria.findAll();
        this.categories = res;

        this.categories.forEach((cat) => {
          if (cat.ativos && cat.ativos.length < cat.minimoAmarelo) {
            const notification = {
              title: 'Categoria com poucos Ativos',
              body: `A categoria ${cat.nomeCategoria} está com poucos ativos.`,
              date: new Date(),
              read: false,
            };

            this.notifications.push(notification);
          }
        });
      } catch (error) {
        console.error('Error retrieving categories:', error);
      }
    },
  },
});
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
