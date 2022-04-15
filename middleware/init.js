export default async function init ({ store }) {
    await store.dispatch('accounts/load')
    await store.dispatch('tools/load')
    console.log('loaded')
}