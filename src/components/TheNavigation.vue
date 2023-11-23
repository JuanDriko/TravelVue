<template>
    <div id="nav">
        <AppLink id="logo" to="/">
            Travel
        </AppLink>

        <AppLink to="/">Inicio</AppLink>
        <AppLink to="/about">Acerca de</AppLink>
      <AppLink
        v-for="destination in destinations"
        :key="destination.id"
        :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug }}"
        exact
      >
        {{ destination.name }}
      </AppLink>
      <AppLink :to="{name:'protected'}">LogIn</AppLink>
      <AppLink to='https://vueschool.io'>Escuela de Vue</AppLink>
    </div>
  </template>
  
  <script>
  import sourceData from '@/data.json';
  import AppLink from "@/components/AppLink.vue";
  export default {
    data() {
      return {
        destinations: sourceData.destinations, 
      };
    },
  };
  </script>
  
  <style lang="css">
  #nav .travel-active-link {
    color: black;
    border-bottom: 2px solid black;
  }
  </style>  