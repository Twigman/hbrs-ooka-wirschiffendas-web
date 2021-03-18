<template>
  <div v-show="show">
    <b-card title="Service Feedback">
      <b-card-text>
          Status: <b-badge :variant="feedbackStatusVariant">{{feedbackStatus}}</b-badge>
          <br />
          <br />
          <b-table :items="feedback['serviceFeedbackList']" :fields="fields">
            <template v-slot:cell(status)="row">
                <b-badge v-if="row.item.status === 'not started'" variant="secondary">{{row.item.status}}</b-badge>
                <b-badge v-if="row.item.status === 'running'" variant="primary">{{row.item.status}}</b-badge>
                <b-badge v-if="row.item.status === 'ready'" variant="success">{{row.item.status}}</b-badge>
                <b-badge v-if="row.item.status === 'failed'" variant="danger">{{row.item.status}}</b-badge>
            </template>
          </b-table>
          
        <div v-show="false">
            {{watchServiceFeedback}}
            {{feedback}}
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { serviceFeedbackService } from '../services/servicefeedback-service';
import { SET_WATCH_SERVICE_FEEDBACK } from '../stores/mutation-types';

export default {
  data() {
    return {
        interval: undefined,
        feedback: {
          serviceFeedbackList: [],
          allDone: undefined,
        },
        fields: [
          {
            key: 'serviceName',
            label: 'Service Name',
          },
          {
            key: 'statusCode',
            label: 'Status Code',
          },
          {
            key: 'status',
            label: 'Status',
          },
          {
            key: 'nextService',
            label: 'Next Service',
          },
          {
            key: 'description',
            label: 'Description',
          }
        ],
    }
  },
  props: {
      show: {
          type: Boolean,
          required: true,
      },
  },
  computed: {
      watchServiceFeedback() {
          if (this.$store.getters.getWatchServiceFeedback) {
              this.startWatchFeedback();
          } else {
              this.stopWatchFeedback();
          }
          return this.$store.getters.getWatchServiceFeedback;
      },
      feedbackStatus() {
        if (this.feedback.allDone) {
          return "completed";
        } else if (this.feedback.allDone === undefined) {
          return "not started";
        } else {
          return "waiting";
        }
      },
      feedbackStatusVariant() {
        if (this.feedback.allDone) {
          return "primary";
        } else if (this.feedback.allDone === undefined) {
          return "secondary";
        } else {
          return "info";
        }
      }
  },
  methods: {
      startWatchFeedback() {
        this.interval = setInterval(async () => {
            this.feedback = await serviceFeedbackService.listenForFeedback();
            console.log(this.feedback);
            
            if (this.feedback.allDone === true) {
              this.$store.commit(SET_WATCH_SERVICE_FEEDBACK, false);
            }
            /*
            if ((this.feedback[this.feedback.length-1].nextService === '') && (this.feedback[this.feedback.length-1].status === 'ready')) {
                this.$store.commit(SET_WATCH_SERVICE_FEEDBACK, false);
            }*/
        }, 1000);
      },
      stopWatchFeedback() {
          clearInterval(this.interval);
      }
  },
}
</script>

<style scoped>

</style>
