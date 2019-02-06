<template>
    <div v-if="stats">
        <chartjs :stats="stats" />
    </div>
</template>

<script>
import chartjs from '@/util/chart';
import { mapState } from 'vuex';

export default {
    name: 'chart',
    components: {
        chartjs
    },
    computed: mapState({
        stats: state => state.stats,
        isAuthenticated: state => state.signedIn,
        storedDeviceId: state => state.deviceId,
    }),
}
</script>

<style>

</style>
