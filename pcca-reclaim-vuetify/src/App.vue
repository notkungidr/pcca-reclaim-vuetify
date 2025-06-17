<template>
  <v-app class="seagate-inspired">
    <!-- Sidebar -->
    <v-navigation-drawer app permanent width="280" color="#212121" dark elevation="10" class="sidebar">
      <div class="sidebar-header">
        <v-list-item>
          <v-list-item-content>
            <div class="logo-container">
              <div class="logo-circle">
                <v-icon large color="white">mdi-harddisk</v-icon>
              </div>
            </div>
            <v-list-item-title class="text-h5 white--text font-weight-bold mt-4">
              PCCA Reclaim
            </v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-2 mt-1 grey--text text--lighten-1">
              Salvage Management System
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-divider class="mx-3 my-2"></v-divider>

      <!-- Menu -->
      <v-list nav class="menu-list px-2">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          link
          class="menu-item rounded-lg mb-2"
          active-class="menu-item-active"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text font-weight-medium">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-4 text-center">
          <v-btn text small block class="white--text">
            <v-icon left small>mdi-help-circle-outline</v-icon>
            ช่วยเหลือ
          </v-btn>
          <div class="version-info grey--text text--lighten-1 mt-2">
            <small>Version 1.0.0</small>
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="main-content">
      <v-container fluid class="py-5 px-6">
        <!-- router-view จะแสดง Component ของแต่ละหน้าตาม URL -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuItems: [
      { title: "จัดการ Master Data", icon: "mdi-database-cog", to: "/master" },
      { title: "100% scan PCCA Reclaim", icon: "mdi-barcode-scan", to: "/scan" },
      { title: "ค้นหาข้อมูล & Export", icon: "mdi-file-export", to: "/search" },
    ],
  }),
};
</script>

<style>
/* Seagate-inspired color palette */
:root {
  --seagate-green: #467c2d;
  --seagate-dark: #212121;
  --seagate-white: #ffffff;
  --seagate-light-gray: #f5f5f5;
  --seagate-medium-gray: #e0e0e0;
  --seagate-hover-green: #559637;
}

/* Global styles */
.seagate-inspired {
  font-family: 'Inter', Helvetica, Arial, sans-serif !important; /* เปลี่ยนเป็น Inter หรือ font ที่คุณเลือก */
  background-color: #f5f5f5;
}

/* Sidebar styling */
.sidebar {
  border-right: none !important;
}

.sidebar-header {
  padding: 24px 16px 8px;
  text-align: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.logo-circle {
  background-color: var(--seagate-green);
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.menu-list {
  padding-top: 16px;
}

.menu-item {
  margin-bottom: 4px;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(70, 124, 45, 0.2);
}

.menu-item-active {
  background-color: var(--seagate-green) !important;
}

.menu-item-active::before {
  opacity: 0;
}

/* Main content area styling */
.main-content {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* Typography enhancements */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', Helvetica, Arial, sans-serif !important; /* เปลี่ยนเป็น Inter หรือ font ที่คุณเลือก */
}

.v-application .primary--text {
  color: var(--seagate-green) !important;
  caret-color: var(--seagate-green) !important;
}


</style>