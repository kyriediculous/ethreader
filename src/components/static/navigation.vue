<template>
  <div>
    <v-navigation-drawer light absolute class="hidden-sm-and-up" v-model="sideNav">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              EthReader
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="elevation-0 transparent">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">EthReader</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          <v-badge color="red" v-if="item.badge">
            <span slot="badge">{{ item.badge }}</span>
            <span>{{ item.title }}</span>
          </v-badge>
          <span v-else>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style>
.nav-brand {
  height:30px;
  width:30px;
}
</style>
<script>
export default {
  data () {
    return {
        sideNav: false,
        menuItems: [
            {icon: 'account_circle', title: 'Register', link: '/register-author'},
            //{icon: 'person', title: 'Profile', link: '/profile'},
            {icon: 'file_upload', title: 'Add Book', link: '/upload'},
            {icon:'search', title:'By Author', link:'/byAuthor'},
            {icon:'search', title:'By Title', link:'/byTitle'}

        ]
    }
  }
}
</script>
