import { defineStore } from "pinia";
import { uid } from "quasar";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    // Load from localStorage on initialization, or default to empty array
    tasks: JSON.parse(localStorage.getItem("my-tasks")) || [],
  }),
  actions: {
    addTask(name) {
      this.tasks.push({ id: uid(), name });
      this.sync();
    },
    updateTask(id, newName) {
      const index = this.tasks.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.tasks[index].name = newName;
        this.sync();
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.sync();
    },
    sync() {
      // Manual helper to ensure data is stringified and saved
      localStorage.setItem("my-tasks", JSON.stringify(this.tasks));
    },
  },
});
