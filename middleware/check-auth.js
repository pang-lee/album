export default function (context) {
    if(process.server){
        return context.store.dispatch('authentication/initAuth', context)
    }
}