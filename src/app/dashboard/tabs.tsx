
type TabsProps = {
    active: string,
    setActive: (str: string) => void
}

const Tabs = (props: TabsProps) => {
    const {active, setActive} = props
    return (
        <header className="tabs is-fullwidth">
            <ul>
                <li className={active === "recipes" ? "is-active" : ""}>
                <a onClick={() => setActive("recipes")}>
                    <span>Recipes</span>
                </a>
                </li>
                <li className={active === "reviews" ? "is-active" : ""}>
                <a onClick={() => setActive("reviews")}>
                    <span>Reviews</span>
                </a>
                </li>
                {/* <li className={active === "posts" ? "is-active" : ""}>
                <a onClick={() => setActive("posts")}>
                    <span>Posts</span>
                </a>
                </li> */}
            </ul>
        </header>
    )
}

export default Tabs