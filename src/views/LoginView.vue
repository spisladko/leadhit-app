<template>
  <div>
    <h1>LeadHit</h1>
    <v-form v-model="valid"
            @submit="checkForm">
      <v-container>
        <v-text-field
            class="id-field"
            v-model="idInput"
            :rules="idRules"
            :counter="24"
            label="ID"
            required
        ></v-text-field>
        <v-btn
            type="submit"
            color="blue"
            @click="login"
            :disabled="!valid"
        >
          Login
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: false,
    idInput: '',
    idRules: [
      v => v.length > 24 || 'ID must contain 24 characters',
      v => v.length < 24 || 'ID must contain 24 characters',
    ],
  }),
  methods: {
    checkForm (e) {
      if (this.idInput.length === 24) {
        console.log('ok')
        return true
      }
      e.preventDefault()
    },
    login () {
      if (this.idInput.length === 24) {
        axios
            .get('https://track-api.leadhit.io/client/test_auth', {
              headers: {
                'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
                'Leadhit-Site-Id': '5f8475902b0be670555f1bb3'
              }
            })
            .then(response => {
              // TODO - check response message: ok
              localStorage.setItem('leadhit-site-id', '5f8475902b0be670555f1bb3')
              console.log('redirecting')
              this.$router.push('analytics')
            })
            .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style>
.id-field {
  width: 500px;
  margin: 0 auto
}
</style>
