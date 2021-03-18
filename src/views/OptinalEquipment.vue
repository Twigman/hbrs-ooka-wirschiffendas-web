<template>
  <div>
    <OptinalEquipmentConfigurator></OptinalEquipmentConfigurator>
    <ServiceFeedback :show="showServiceFeedback"></ServiceFeedback>
  </div>
</template>

<script>
import OptinalEquipmentConfigurator from '../components/OptionalEquipmentConfigurator.vue';
import ServiceFeedback from '../components/ServiceFeedback.vue';

export default {
  data() {
    return {
      showServiceFeedback: true,
    }
  },
  components: {
    OptinalEquipmentConfigurator,
    ServiceFeedback,
  },
}
</script>

<style scoped>

</style>
