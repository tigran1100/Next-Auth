// NextAuth
import { auth } from "@/auth"

// Css
import "./styles.css"

const Header = () => {

    const session = auth()

    return (
        <>
        <div className="c_header page_content_large">
            <div className="c_header_inner">
                <div className="c_header_left">{JSON.stringify(session)}</div>
                <div className="c_header_right">Links</div>
            </div>
        </div>
        
        </>
    )
}

export default Header