const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // We set our TaskPage as the default child
      { path: "", component: () => import("pages/TaskPage.vue") },
    ],
  },

  // Capture and display 404 errors
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
