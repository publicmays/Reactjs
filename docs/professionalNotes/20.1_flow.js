// using flow to check prop types of stateless functional components
type Props = {
    posts: Array<Article>,
    dispatch: Function,
    children: ReactElement
}

const AppContainer = 
({posts, dispatch, children}: Props) => (
    <div className="main-app">
        <Header {...{posts, dispatch}}/>
        {children}
    </div>
)