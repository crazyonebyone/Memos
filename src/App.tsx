import * as React from 'react'
import * as ReactDOM from "react-dom"
import { hot } from 'react-hot-loader/root';
import Memos from 'components/Memos/Memos'

function App () {
	return (
		<div>
			<Memos />
		</div>
	)
}
const MainApp = hot(App)
ReactDOM.render(
	<MainApp />,
	document.getElementById('App')
)