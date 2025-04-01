<script lang="ts" setup>
import { onMounted } from 'vue';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

onMounted(() => {
  createChat({
    webhookUrl: process.env.VITE_WEBHOOK_URL || 'https://shubhrajgupta.app.n8n.cloud/webhook/5b248f88-f77d-46b8-913d-185bdccb2f69/chat'
  });
});
</script>

<template>
  <div id="n8n-chat-container" class="h-full w-full bg-transparent"></div>
</template>
