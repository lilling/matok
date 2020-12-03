<template>
  <v-app>
    <v-main>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" dark>
            Dropdown
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Choice 1</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Choice 1</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn color="secondary">Click me!</v-btn>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
