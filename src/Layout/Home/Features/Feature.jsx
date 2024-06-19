import PropTypes from 'prop-types';

const Feature = ({ feature }) => {
    const { title, description, image } = feature;
    return (
        <div className="card bg-base-200 hover:shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Feature;
Feature.propTypes = {
    feature: PropTypes.object,
}