<template>
    <div>
        <h1>Saludos, {{ username }}</h1>
        <button @click="logout">Cerrar Sesión</button>
        <router-link :to="{name: 'invoices'}">
        <button>Facturas</button></router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: window.user
            }
        },
        methods: {
            logout(){
                window.user = null
                this.$router.push({name: "home"})
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>