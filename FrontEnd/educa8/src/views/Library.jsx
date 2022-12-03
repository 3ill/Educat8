import Testimonial from "../components/sections/Testimonial"

function Library(props) {
    return (
        <div className="library">
            <div className="library-banner">
                <h1>Library</h1>
            </div>
            <div className="library-videos">
                <Testimonial topDivider />
            </div>
        </div>
    )
}

export default Library
