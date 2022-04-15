export default async function groupchatLoad({ redirect, store }) {
    await store.dispatch('groupchat/load')
}