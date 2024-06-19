import PropTypes from 'prop-types';
import { Slide } from 'react-awesome-reveal';

const Title = ({ heading, subHeading }) => {
    return (
        <div className='border-y-2 border-dashed border-sky-500 p-2 w-3/4 mx-auto mb-4'>
            <Slide>
                <h2 className="text-2xl font-bold mb-3 text-sky-500 uppercase text-center">{heading}</h2>
                <h2 className="text-lg font-semibold uppercase text-center"><i>{subHeading}</i></h2>
            </Slide>
        </div>
    );
};

export default Title;
Title.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}