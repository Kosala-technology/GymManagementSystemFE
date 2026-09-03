// Import the layout used by public website pages
import DefaultLayout from "../../layouts/DefaultLayout.vue";

// Import the home page
import HomeView from "../../views/HomeView.vue";

// Home-related route definitions
const homeRoutes = [
  {
    path: "/",
    component: DefaultLayout,

    // Child pages are displayed inside DefaultLayout's router-view
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
    ],
  },
];

// Export routes so router/index.js can use them
export default homeRoutes;
