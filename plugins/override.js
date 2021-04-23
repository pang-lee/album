export default ({ app }) => {
    app.apolloProvider.defaultClient.defaultOptions = {
        query: {
          fetchPolicy: 'no-cache',
        }
    }
}