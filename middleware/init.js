export default async function init ({ store }) {
    await store.dispatch('accounts/load')
    await store.dispatch('leaderboard/load')
    await store.dispatch('groupchat/load')
    console.log('loaded')
}