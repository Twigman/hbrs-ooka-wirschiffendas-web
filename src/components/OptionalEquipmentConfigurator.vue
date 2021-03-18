<template>
  <div>
    <b-card title="Optional Equipment" sub-title="configure your systems">
      <b-card-text>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-oil-system-group"
            label="Oil system:"
            label-for="input-oil-system"
          >
            <b-form-select
              id="input-oil-system"
              v-model="config.oilSystem"
              :options="oilSystemOptions"            
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-fuel-system-group"
            label="Fuel system:"
            label-for="input-fuel-system"
          >
            <b-form-select
              id="input-fuel-system"
              v-model="config.fuelSystem"
              :options="fuelSystemOptions"            
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-cooling-system-group"
            label="Cooling system:"
            label-for="input-cooling-system"
          >
            <b-form-select
              id="input-cooling-system"
              v-model="config.coolingSystem"
              :options="coolingSystemOptions"            
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="success">Submit</b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { configurationService } from '../services/configuration-service';
import { SET_WATCH_SERVICE_FEEDBACK } from '../stores/mutation-types';

export default {
  data() {
    return {
        config: {
            id: null,
            oilSystem: null,
            fuelSystem: null,
            coolingSystem: null,
            mountingSystem: null,
        },
        oilSystemOptions: [
            { value: null, text: '- Please select an option -' },
            { value: 'Oil replenishment system', text: 'Oil replenishment system' },
            { value: 'Diverter valve for duplex filter', text: 'Diverter valve for duplex filter' },
        ],
        fuelSystemOptions: [
            { value: null, text: '- Please select an option -' },
            { value: 'Duplex fuel pre-filter', text: 'Duplex fuel pre-filter' },
            { value: 'Diverter valve for fuel filter', text: 'Diverter valve for fuel filter' },
            { value: 'Monitoring fuel leakage', text: 'Monitoring fuel leakage' },
        ],
        coolingSystemOptions: [
            { value: null, text: '- Please select an option -' },
            { value: 'Coolant preheating system freestanding', text: 'Coolant preheating system freestanding' },
            { value: 'Coolant preheating system engine mounted', text: 'Coolant preheating system engine mounted' },
            { value: 'Integr. seawater gearbox piping', text: 'Integr. seawater gearbox piping' },
        ],
    }
  },
  methods: {
        onSubmit() {
            //gernerate random id
            this.config.id = this.uuidv4();
            //this.$emit('showServiceFeedback');
            configurationService.postConfiguration(JSON.stringify(this.config));
            this.$store.commit(SET_WATCH_SERVICE_FEEDBACK, true);
        },
        uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        },
  },

}
</script>

<style scoped>

</style>
