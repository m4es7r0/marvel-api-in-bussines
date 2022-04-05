import './singleCharPage.scss';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const SingleCharPage = ({ data }) => {

    const { name, description, thumbnail } = data;

    return (
        <div className="wrap-single">
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${name} character book`}
                    />
                    <title>{`Character: ${name}`}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__char-img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr" style={{ fontWeight: '400' }}>{description}</p>
                </div>
                <Link to=".." className="single-comic__back">Back to all</Link>
            </div>
        </div>
    )
}

export default SingleCharPage;