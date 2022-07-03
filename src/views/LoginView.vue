<template>
  <ValidationObserver
      ref="observer"
      v-slot="{ invalid, validate }"
  >
    <form @submit.prevent="validate().then(submit)">
      <ValidationProvider
          v-slot="{ errors }"
          name="Site ID"
          rules="count:24"
      >
        <v-text-field
            class="id-field"
            v-model="idInput"
            :counter="24"
            :error-messages="errors"
            label="ID"
            required
            maxlength="24"
        ></v-text-field>
      </ValidationProvider>

      <div class="btn-container">
        <v-btn
            type="submit"
            :disabled="invalid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate'
import axios from "axios";

extend('count', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length']

})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    valid: false,
    idInput: ''
  }),

  methods: {
    submit() {
      if (this.idInput.length === 24) {
        axios
            .get('https://track-api.leadhit.io/client/test_auth', {
              headers: {
                'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
                'Leadhit-Site-Id': '5f8475902b0be670555f1bb3'
              }
            })
            .then(response => {
              if (response.data.message === 'ok') {
                localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3')
                this.$router.push('analytics')
              }
            })
            .catch(error => console.log(error))
      }
    },
    clear() {
      this.idInput = ''
    },
  },

}</script>

<style>
.id-field {
  width: 500px;
  margin: 0 auto
}

.btn-container {
  margin: 0 auto;
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
