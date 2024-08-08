<template>
    <div>
        <h1>Ejemplo de Componente Basico</h1>
        <BasicComponent />
    </div>
</template>

<script>
import BasicComponent from '../components/BasicComponent.vue';

export default {
    name: 'BasicView',
    components: {
        BasicComponent,
    },
}
</script>