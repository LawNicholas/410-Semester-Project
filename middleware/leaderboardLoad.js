export default async function leaderboardLoad({ redirect, store }) {
    await store.dispatch('leaderboard/load')
}