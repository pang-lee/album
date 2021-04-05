<template>
  <div>
    Logging in...
  </div>
</template>

<script>
export default {
  name: 'authredirect',
  data() {
    return {
      token_key: 'code'
    }
  },
  methods: {
    parseQuery(queryString) {
      const query = {}
      const pairs = queryString.split('&')
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
      }
      return query
    }
  },
  async created() {
    if (process.client) {
      const provider = this.$cookies.get('provider')

      console.log('this is provider', provider)

      const hash = provider === 'facebook' 
        ? this.parseQuery(this.$route.hash.replace('#', '')) 
        : this.$route.query
      
      if (hash.hasOwnProperty('access_token')) {
        this.token_key = 'access_token'
      }
      
      const token = hash[this.token_key]

      console.log('this is token', token)
      
    //   const response = await api.login({
    //     provider,
    //     code: token
    //   })
      
    //   this.$router.replace('/')
    }
  }
}
</script>