export default function finishCheck({ redirect, store }) {
    if (store.state.tools.toolList.length < 3) {
      return redirect('/pageone')
    }
}