// Import the layout used by public website pages
import DefaultLayout from "../../layouts/DefaultLayout.vue";

// Import the home page
import HomeView from "../../views/HomeView.vue";

// Import the programs page
import ProgramsView from "../../views/ProgramsView.vue";

// Import the about page
import AboutView from "../../views/AboutView.vue";

// Import the contact page
import ContactView from "../../views/ContactView.vue";

// Public website route definitions
const homeRoutes = [
  {
    path: "/",
    component: DefaultLayout,

    // Child pages use the same website layout
    children: [
      // Home Page
      {
        path: "",
        name: "home",
        component: HomeView,

        meta: {
          title: "Home | FORWARD FIT",
        },
      },

      // Programs Page
      {
        path: "programs",
        name: "programs",
        component: ProgramsView,

        meta: {
          title: "Programs | FORWARD FIT",
        },
      },

      // About Us Page
      {
        path: "about",
        name: "about",
        component: AboutView,

        meta: {
          title: "About Us | FORWARD FIT",
        },
      },

      // Contact Us Page
      {
        path: "contact",
        name: "contact",
        component: ContactView,

        meta: {
          title: "Contact Us | FORWARD FIT",
        },
      },
    ],
  },
];

// Export routes
export default homeRoutes;
