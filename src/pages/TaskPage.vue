<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bold text-primary">Vazifalar</div>
        <div class="text-subtitle2 text-grey-7">Kunlik vazifalarni shu joydan boshqarish mumkin</div>
      </div>
      <q-btn
        unelevated
        rounded
        color="primary"
        icon="add"
        label="Qo'shish"
        @click="openModal()"
      />
    </div>

    <q-table
      flat
      bordered
      :rows="taskStore.tasks"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      class="shadow-2"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn
            flat round
            color="blue-7"
            icon="edit_note"
            @click="openModal(props.row)"
          >
            <q-tooltip>Vazifani Tahrirlash</q-tooltip>
          </q-btn>
          <q-btn
            flat round
            color="red-7"
            icon="delete_outline"
            @click="confirmDelete(props.row)"
          >
            <q-tooltip>Vazifani O'chirish</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modal.show" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 400px; border-radius: 15px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ modal.isEdit ? 'Vazifani tahrirlash' : "Vazifa qo'shish" }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-input
            v-model="modal.data.name"
            label="Nima vazifa qo'shmoqchisiz?"
            outlined
            autofocus
            :rules="[val => !!val || 'Maydon bo\'sh bo\'lmasli kerak']"
            @keyup.enter="saveTask"
          >
            <template v-slot:prepend>
              <q-icon name="assignment" color="primary" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Bekor qilish" color="grey-7" v-close-popup />
          <q-btn
            unelevated
            :color="modal.isEdit ? 'blue-7' : 'primary'"
            :label="modal.isEdit ? 'Yangilash' : 'Saqlash'"
            @click="saveTask"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTaskStore } from 'src/stores/taskStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const taskStore = useTaskStore();

// UI Configuration
const columns = [
  { name: 'name', label: 'Vazifa nomlari', field: 'name', align: 'left', sortable: true },
  { name: 'actions', label: 'Tahrirlash/O\'chirish', align: 'right' }
];

const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

// Modal Logic
const modal = reactive({
  show: false,
  isEdit: false,
  data: { id: null, name: '' }
});

const openModal = (item = null) => {
  if (item) {
    modal.isEdit = true;
    modal.data = { ...item };
  } else {
    modal.isEdit = false;
    modal.data = { id: null, name: '' };
  }
  modal.show = true;
};

const saveTask = () => {
  if (!modal.data.name.trim()) return;

  if (modal.isEdit) {
    taskStore.updateTask(modal.data.id, modal.data.name);
    $q.notify({ color: 'blue-7', message: 'Vazifa muvaffaqiyatli yangilandi', icon: 'info' });
  } else {
    taskStore.addTask(modal.data.name);
    $q.notify({ color: 'positive', message: 'Vazifa qo\'shildi!', icon: 'check_circle' });
  }
  modal.show = false;
};

const confirmDelete = (item) => {
  $q.dialog({
    title: 'Vazifani o\'chirish',
    message: `"${item.name}" vazifasini o'chirmoqchimisiz?`,
    cancel: { flat: true, color: 'grey-7', label: 'Bekor qilish'},
    ok: { unelevated: true, color: 'red-7', label: 'O\'chirish' },
    persistent: true
  }).onOk(() => {
    taskStore.deleteTask(item.id);
    $q.notify({ color: 'red-5', message: 'Vazifa o\'chirildi', icon: 'delete', position: 'bottom-right' });
  });
};
</script>
