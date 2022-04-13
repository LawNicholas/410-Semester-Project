export default function authCheck({ redirect, store }) {
    if (store.state.accounts.user === null) {
      return redirect('/login')
    }
}