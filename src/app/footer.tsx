

const Footer = () => {

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    <div className="container is-max-tablet">
                    <p>
                        Site by&nbsp;<a href="https://dippingsauce.net">Alex</a>.
                    </p>
                    <a href="https://github.com/j-cucuzza" className="icon mx-3">
                        <i className="fa-brands fa-github-square fa-2x"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/justin-cucuzza/" className="icon mx-3">
                        <i className="fa-brands fa-linkedin fa-2x"></i>
                    </a>
                    </div>
                </p>
                <p className=" is-size-7 ">
                    Favicon <a href="https://github.com/twitter/twemoji">Copyright 2020 Twitter, Inc and other contributors</a>. 
                    <a href="https://github.com/twitter/twemoji/blob/master/assets/svg/3299.svg"> Source</a>. Edited to fill square.
                </p>
            </div>
        </footer>
    )
}

export default Footer