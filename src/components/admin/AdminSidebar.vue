<template>
  <!-- Parent layout controls the sidebar state -->
  <v-navigation-drawer
    v-model="drawerOpen"
    :temporary="isMobile"
    :permanent="!isMobile"
    width="268"
    class="admin-sidebar"
    aria-label="Administrator navigation"
  >
    <!-- Forward Fit branding -->
    <template #prepend>
      <div class="admin-sidebar__brand-row">
        <router-link
          to="/"
          class="admin-sidebar__brand"
          aria-label="Forward Fit home"
        >
          <span class="admin-sidebar__logo">
            <v-icon icon="mdi-dumbbell" size="25" />
          </span>

          <span class="admin-sidebar__brand-text">
            <strong>FORWARD <span>FIT</span></strong>
            <small>Administration</small>
          </span>
        </router-link>

        <!-- Mobile close button -->
        <v-btn
          v-if="isMobile"
          icon="mdi-close"
          variant="text"
          size="small"
          aria-label="Close admin navigation"
          @click="drawerOpen = false"
        />
      </div>
    </template>

    <!-- Admin navigation -->
    <nav class="admin-sidebar__navigation">
      <p class="admin-sidebar__section-label">Workspace</p>

      <v-list nav class="admin-sidebar__list" aria-label="Admin pages">
        <v-list-item
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.label"
          color="primary"
          rounded="lg"
          exact
          class="admin-sidebar__link"
          @click="closeOnMobile"
        />
      </v-list>
    </nav>

    <!-- Admin identity and logout -->
    <template #append>
      <div class="admin-sidebar__footer">
        <div class="admin-sidebar__account">
          <v-avatar color="primary" variant="tonal" size="40">
            <v-icon icon="mdi-shield-account-outline" size="23" />
          </v-avatar>

          <div class="admin-sidebar__account-text">
            <strong>{{ adminName }}</strong>
            <small>Gym Administrator</small>
          </div>
        </div>

        <v-btn
          block
          variant="text"
          prepend-icon="mdi-logout"
          class="admin-sidebar__logout"
          @click="emit('logout')"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";

// Receive values from AdminLayout.
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },

  isMobile: {
    type: Boolean,
    default: false,
  },

  adminName: {
    type: String,
    default: "Admin",
  },
});

const emit = defineEmits(["update:modelValue", "logout"]);

// Support two-way sidebar binding with the parent layout.
const drawerOpen = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit("update:modelValue", value);
  },
});

// Sidebar navigation items.
const navigationItems = [
  {
    label: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    path: "/admin/dashboard",
  },
  {
    label: "Customers",
    icon: "mdi-account-group-outline",
    path: "/admin/customers",
  },

  // Monthly payment records page.
  {
    label: "Monthly Payments",
    icon: "mdi-cash-multiple",
    path: "/admin/payments",
  },
  {
    label: "Exercise Library",
    icon: "mdi-dumbbell",
    path: "/admin/exercises",
  },
  {
    label: "Schedule Builder",
    icon: "mdi-clipboard-edit-outline",
    path: "/admin/schedules",
  },
  {
    label: "Assignments",
    icon: "mdi-calendar-check-outline",
    path: "/admin/assignments",
  },

  {
    label: "Announcements",
    icon: "mdi-bullhorn-outline",
    path: "/admin/announcements",
  },
];

// Close the temporary sidebar after selecting a mobile link.
const closeOnMobile = () => {
  if (props.isMobile) {
    drawerOpen.value = false;
  }
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/admin/admin-sidebar.scss"
></style>
