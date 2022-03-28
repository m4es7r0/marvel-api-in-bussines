import ErrorMassage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

export const Page404 = () => {
    return (
        <div>
            <ErrorMassage />
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page doesn't exist</p>
            <Link style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '60px', color: '#9F0013' }} to='/'>Back to main page</Link>
        </div>
    )
}