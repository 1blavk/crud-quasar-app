<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          CRUD App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>Menyu</q-item-label>

        <q-item clickable v-underline to="/" exact>
          <q-item-section avatar>
            <q-icon name="list_alt" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Vazifalar</q-item-label>
            <q-item-label caption>Vazifalarni shu joydan boshqarish mumkin</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-underline href="https://github.com/1blavk/crud-quasar-app" exact>
          <q-item-section avatar>
            <q-icon name="source" color="dark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>Github repositoriyasi</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
