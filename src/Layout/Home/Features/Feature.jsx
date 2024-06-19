import PropTypes from 'prop-types';

const Feature = ({ feature, idx }) => {
    const { title, description, image } = feature;
    return (
        <div className="card bg-base-200 hover:shadow-xl">
            <figure className='relative'>
                <img src={image} alt="Shoes" />
                <span className='absolute top-3 right-3 text-2xl text-sky-500 px-5 py-2 rounded-full bg-white'>{idx + 1}</span>
            </figure>
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
    idx: PropTypes.number,
}