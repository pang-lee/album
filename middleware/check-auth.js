export default function (context) {
    if(process.server){
        context.store.dispatch('authentication/initAuth', context.req)
    }
}